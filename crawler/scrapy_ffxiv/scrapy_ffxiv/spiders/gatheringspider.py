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
		page = response.url.split("/")[-2]
        filename = f'downloads/gathering-{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)