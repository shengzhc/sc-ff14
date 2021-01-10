import scrapy

class DownloadSpider(scrapy.Spider):
	name = 'download_spider'
	start_urls = [
		'https://ff14fish.carbuncleplushy.com/index.html',
	]

	def parse(self, response):
		page = response.url.split("/")[-2]
		filename = f'downloads/{page}.html'
		with open(filename, 'wb') as f:
			f.write(response.body)
