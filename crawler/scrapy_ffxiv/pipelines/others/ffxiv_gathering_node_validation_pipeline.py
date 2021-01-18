# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem


class FfxivGatheringNodeValidationPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        if adapter['name'] is None or not isinstance(adapter['name'], str):
            return DropItem(f"name field invalid...")
        elif adapter['gclass'] is None or not isinstance(adapter['gclass'], str):
            return DropItem(f"gclass field invalid")
        else:
            return item
