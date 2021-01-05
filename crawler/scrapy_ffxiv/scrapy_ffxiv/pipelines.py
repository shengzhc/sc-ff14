# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import logging, json, mysql.connector, yaml


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
		logging.info(f"AAAAAA:{self._dbname}{self._hostname}{self._username}{self._password}")

	def close_spider(self, spider):
		pass

	def process_item(self, item, spider):
		return  item
