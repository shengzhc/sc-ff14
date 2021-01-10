# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field
from typing import Optional

class FfxivGatheringNode(Item):
	name = Field()
	location = Field()
	time = Field()
	gclass = Field()