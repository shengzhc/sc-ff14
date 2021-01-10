import scrapy

from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy_ffxiv.items import FfxivGatheringNode

"""

Spider to gather info from `www.ffxiv-gathering.com`

"""


class GatheringSpider(CrawlSpider):
    name = 'ff14-gathering'
    allowed_domains = [
        'ffxiv-gathering.com',
        'ff14fish.carbuncleplushy.com'
    ]
    start_urls = [
        'https://www.ffxiv-gathering.com/all.php',
    ]

    rules = (
        Rule(LinkExtractor(allow=('ff14fish.carbuncleplushy.com/index.html')), callback='parse_fishing_nodes'),
    )

    def parse_start_url(self, response):
        nodes = response.selector.xpath("//table[contains(@id, 'myTable')]/tbody/tr")
        for node in nodes:
            yield FfxivGatheringNode(name=node.xpath(".//td[1]/text()").get(),
                                     location=node.xpath(".//td[4]/text()").get(),
                                     time=node.xpath(".//td[6]/text()").get(),
                                     gclass=node.xpath(".//td[7]/text()").get())

    def parse_fishing_node(self, response):
        nodes = response.selector.xpath("//table[@id='fishes/tbody/tr[contains(@class, 'fish-entry')]")
        for node in nodes:
            yield {
                'item': node.xpath(".//td//a[@class='fish-name']/text()").get(),
                'level': '1',
                'location': node.xpath(".//td//a[@class='location-name']/text()").get() + ' - ' + node.xpath(".//td//span[@class='zone-name']/text()").get(),
                'time': 'Anytime',
                'class': 'Fishing',
            }
