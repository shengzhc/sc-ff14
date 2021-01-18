# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json


class FfxivGatheringNodeJSONPipeline:
    def __init__(self):
        self.gathering_nodes = []

    def close_spider(self, spider):
        with open('temp/gathering_nodes.json', 'w') as f:
            json.dump(self.gathering_nodes, f)

    def process_item(self, item, spider):
        self.gathering_nodes.append(ItemAdapter(item).asdict())
        return item
