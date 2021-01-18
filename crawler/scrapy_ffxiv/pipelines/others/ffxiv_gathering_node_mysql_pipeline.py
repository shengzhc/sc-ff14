# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import logging
import json
import mysql.connector
import yaml

_DB_TABLES = {}
_DB_TABLES['ff14_gathering_nodes'] = """
CREATE TABLE IF NOT EXISTS `ff14_gathering_nodes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(256) NOT NULL,
    `location` varchar(256) NOT NULL,
    `time` varchar(256) NOT NULL,
    `gclass` varchar(256) NOT NULL,
    PRIMARY KEY (`id`)) ENGINE=InnoDB;
"""


class FfxivGatheringNodeMysqlPipeline:
    add_gathering_node = """
        INSERT INTO `ff14_gathering_nodes`
        (`name`, `location`, `time`, `gclass`)
        VALUES (%s, %s, %s, %s)
    """

    def __init__(self):
        self.dbconnection = None
        with open('db/dbconfig.yml', 'r') as f:
            dbconfig = yaml.load(f, yaml.FullLoader)
        try:
            self._dbname = dbconfig['database']['name']
            self._hostname = dbconfig['database']['hostname']
            self._username = dbconfig['database']['username']
            self._password = dbconfig['database']['password']
        except Exception as ex:
            logging.error(f"Failed to read db config: {ex}")

    def open_spider(self, spider):
        try:
            self.dbconnection = mysql.connector.connect(host=self._hostname, user=self._username, password=self._password, database=self._dbname)
            self.cursor = self.dbconnection.cursor()
            self.cursor.execute(_DB_TABLES['ff14_gathering_nodes'])
        except mysql.connector.Error as err:
            logging.error(f"Something went wrong: {err}")
            self.cursor.close()
            self.dbconnection.close()
            self.cursor = None
            self.dbconnection = None

    def close_spider(self, spider):
        if self.cursor is not None:
            self.cursor.close()
        if self.dbconnection is not None:
            self.dbconnection.commit()
            self.dbconnection.close()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        if self.cursor and self.dbconnection:
            self.cursor.execute(self.__class__.add_gathering_node,
                                (adapter['name'], adapter['location'], adapter['time'], adapter['gclass']))
        return item
