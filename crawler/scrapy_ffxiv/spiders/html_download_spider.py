import scrapy


class HtmlDownloadSpider(scrapy.Spider):
    name = 'html_download_spider'
    start_urls = [
        'https://ffxiv.consolegameswiki.com/wiki/Lominsan_Anchovy',
    ]

    def parse(self, response):
        page = response.url.split("/")[-2]
        breakpoint()
        filename = f'temp/{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
