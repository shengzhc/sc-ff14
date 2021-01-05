# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import logging, json, mysql.connector, yaml

_DB_TABLES = {}
_DB_TABLES['ff14-gathering-nodes'] = """
CREATE TABLE IF NOT EXISTS `ff14-gathering-nodes` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(256) NOT NULL,
	`location` varchar(256) NOT NULL,
	`time` varchar(256) NOT NULL,
	`gclass` varchar(256) NOT NULL,
	PRIMARY KEY (`id`)) ENGINE=InnoDB;
"""


class FfxivGatheringNodeValidationPipeline:
	def process_item(self, item, spider):
		adapter = ItemAdapter(item)
		if adapter['name'] is None or not isinstance(adapter['name'], str):
			return DropItem(f"name field invalid...")
		elif adapter['gclass'] is None or not isinstance(adapter['gclass'], str):
			return DropItem(f"gclass field invalid")
		else:
			return item


class FfxivGatheringNodeDedupPipeline:
	def __init__(self):
		self.gathering_nodes_seen = set()

	def process_item(self, item, spider):
		adapter = ItemAdapter(item)
		if adapter['name'] in self.gathering_nodes_seen:
			raise DropItem(f"Duplicate item found: {item}.")
		else:
			self.gathering_nodes_seen.add(adapter['name'])
			return item


class FfxivGatheringNodeJSONPipeline:
	def __init__(self):
		self.gathering_nodes = []

	def close_spider(self, spider):
		with open('data.json', 'w') as f:
			json.dump(self.gathering_nodes, f)

	def process_item(self, item, spider):
		self.gathering_nodes.append(ItemAdapter(item).asdict())


class FfxivGatheringNodeMysqlPipeline:
	def __init__(self):
		self.dbconnection = None
		with open('dbconfig.yml', 'r') as f:
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
			cursor = self.dbconnection.cursor()
			cursor.execute(_DB_TABLES['ff14-gathering-nodes'])
		except mysql.connector.Error as err:
			logging.error(f"Something went wrong: {err}")
		cursor.close()

	def close_spider(self, spider):
		if self.dbconnection is not None:
			self.dbconnection.close()

	def process_item(self, item, spider):
		return  item
