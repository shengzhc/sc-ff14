from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import logging
import json
import mysql.connector
import yaml


class FfxivWikiMysqlPipeline:
    __DB_SETUP__ = [
        """
        CREATE TABLE IF NOT EXISTS `fishes` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(256) NOT NULL,
            `recommend_level` int(8) NOT NULL,
            `fish_type` varchar(256) NOT NULL,
            `aquarium_type` varchar(256) NOT NULL,
            `size_range` varchar(256) NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """,

        """
        CREATE TABLE IF NOT EXISTS `vendors` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(256) NOT NULL,
            `area` varchar(256) NOT NULL,
            `coordinate_x` float NOT NULL,
            `coordinate_y` float NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """,

        """
        CREATE TABLE IF NOT EXISTS `fish_drops` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `location` varchar(256) NOT NULL,
            `coordinate_x` float NOT NULL,
            `coordinate_y` float NOT NULL,
            `fish_log` varchar(256) NOT NULL,
            `hole_level` int(8) NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """,

        """
        CREATE TABLE IF NOT EXISTS `baits` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(256) NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """,

        """
        CREATE TABLE IF NOT EXISTS `fish_to_vendor` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `fish_id` int(11) NOT NULL,
            `vendor_id` int(11) NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """

        """
        CREATE TABLE IF NOT EXISTS `fish_to_fish_drop` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `fish_id` int(11) NOT NULL,
            `fish_drop_id` int(11) NOT NULL,
        PRIMARY KEY(`id`)) ENGINE = InnoDB
        """
    ]

    __DB_QUERIES__ = [
        """
        """
    ]

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
            for stmt in self.__DB_SETUP__:
                self.cursor.execute(stmt)
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
        fish = ItemAdapter(item)
        if self.cursor and self.dbconnection:
            self.cursor.execute(self.__class__.add_gathering_node,
                                (adapter['name'], adapter['location'], adapter['time'], adapter['gclass']))
        return item
