import scrapy

"""
Spider to gather info from `www.ffxiv-gathering.com`
"""

class GatheringSpider(scrapy.Spider):
	name = "ffxiv-gathering"