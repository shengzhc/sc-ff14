import scrapy

"""

Spider to gather info from `www.ffxiv-gathering.com`

"""

class GatheringSpider(scrapy.Spider):
	name = 'ffxiv-gathering'
	allowed_domain = 'ffxiv-gathering.com'
	start_urls = [
		'https://www.ffxiv-gathering.com/all.php',
	]

	def parse(self, response):
		nodes = response.selector.xpath("//table[contains(@id, 'myTable')]/tbody/tr")
		for node in nodes:
			yield {
				'item': node.xpath(".//td[1]/text()").get(),
				'level': node.xpath(".//td[2]/text()").get(),
				'location': node.xpath(".//td[4]/text()").get(),
				'time': node.xpath(".//td[6]/text()").get(),
				'class': node.xpath(".//td[7]/text()").get(),
			}