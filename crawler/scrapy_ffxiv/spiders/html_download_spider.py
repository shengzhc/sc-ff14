import scrapy


class HtmlDownloadSpider(scrapy.Spider):
    name = 'html_download_spider'
    start_urls = [
        'https://ffxiv.consolegameswiki.com/wiki/Fishing_Locations',
    ]

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f'temp/{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
