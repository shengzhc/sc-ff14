import scrapy
import requests
import js2py


class CarbuncleplushySpider(scrapy.Spider):
    _carbuncleplushy_base_url = 'https://ff14fish.carbuncleplushy.com'
    name = 'carbuncleplushy-spider'
    start_urls = [
        _carbuncleplushy_base_url
    ]

    def parse(self, response):
        src_list = response.selector.xpath("//head/script[contains(@src, 'data.js') and not(contains(@src, 'fish_info_data'))]/@src").getall()
        for src in src_list:
            data_url = requests.compat.urljoin(self._carbuncleplushy_base_url, src)
            yield scrapy.Request(data_url, self.parse_fishing_data)

    def parse_fishing_data(self, response):
        # next diff to parse the js file
        ret = js2py.eval_js(response.text).to_dict()
        breakpoint()
