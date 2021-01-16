import scrapy
import requests
from scrapy_ffxiv.items.ffxiv_wiki_fish import FfxivWikiFish, FfxivWikiFishDropDetails
from scrapy import Selector


class fishing_spider(scrapy.Spider):

    """
    This spider scraps on 4 main fishing locations page and further
    scraps the fish page.
    """

    name = "ffxiv_wiki_fishing_spider"
    allowed_domains = [
        "ffxiv.consolegameswiki.com",
    ]
    start_urls = [
        "https://ffxiv.consolegameswiki.com/wiki/Fishing_Locations",
        "https://ffxiv.consolegameswiki.com/wiki/Heavensward_Fishing_Locations",
        "https://ffxiv.consolegameswiki.com/wiki/Stormblood_Fishing_Locations",
        "https://ffxiv.consolegameswiki.com/wiki/Shadowbringers_Fishing_Locations",
    ]

    site_base = "https://ffxiv.consolegameswiki.com/"
    fish_column = {
        "https://ffxiv.consolegameswiki.com/wiki/Fishing_Locations": 6,
        "https://ffxiv.consolegameswiki.com/wiki/Heavensward_Fishing_Locations": 4,
        "https://ffxiv.consolegameswiki.com/wiki/Stormblood_Fishing_Locations": 4,
        "https://ffxiv.consolegameswiki.com/wiki/Shadowbringers_Fishing_Locations": 4,
    }

    def parse(self, response):
        rows = response.selector.xpath("//table[contains(@class, 'gathering-role')]//tr[position()>1]//td/..")
        for row in rows:
            col = self.fish_column[response.url]
            name = row.xpath(f"td[{col}]/a/text()").get()
            follow_url = requests.compat.urljoin(self.site_base, row.xpath(f"td[{col}]/a/@href").get())
            yield response.follow(follow_url, self.parse_fish_page, cb_kwargs=dict(name=name))

    def parse_fish_page(self, response, name):
        basic_info = self.__parse_fish_basic_info__(response.selector.xpath("//div[@id='mw-content-text']//span[@id='Basic_Information']/../following-sibling::*[1]").get())

    def __parse_fish_basic_info__(self, basic_info_str):
        sel = Selector(text=basic_info_str)
        return {
            "recommend_level": sel.xpath("//li[1]/text()").re(r"\d+$"),
            "fish_type": sel.xpath("//li[3]/a[1]/text()").get(),
            "aquarium_type": sel.xpath("//li[3]/a[1]/text()").get()
            "size_range_str": sel.xpath("//li[4]/text()").re("[a-zA-Z].+$")
        }
