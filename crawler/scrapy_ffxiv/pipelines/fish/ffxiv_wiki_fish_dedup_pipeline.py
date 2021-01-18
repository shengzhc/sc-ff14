from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem


class FfxivWikiFishDedupPipeline:
    def __init__(self):
        self.fish_seen = set()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        if adapter['name'] in self.fish_seen:
            raise DropItem(f"Duplicate item found: {item}.")
        else:
            self.fish_seen.add(adapter['name'])
            return item
