import scrapy
from scrapy_splash import SplashRequest


class SplashSpider(scrapy.Spider):
    name = 'splash_spider'

    def start_requests(self):
        urls = [
            "http://ff14fish.carbuncleplushy.com/",
        ]
        for url in urls:
            yield SplashRequest(url, self.parse_result, args={'wait': 10, 'render_all': 1, 'html': 1})

    def parse_result(self, response):
        page = response.url.split("/")[-2]
        with open(f"temp/{page}.html", "wb") as f:
            f.write(response.body)
