import scrapy
import requests
from scrapy_ffxiv.items.ffxiv_wiki_fish import FfxivWikiFish, FfxivWikiFishDropDetails
from scrapy import Selector
from scrapy_ffxiv.spiders.utils.xpath_utils import xpath_nodeset_intersection


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
            yield response.follow(follow_url, self.__parse_fish_page__, cb_kwargs=dict(name=name))

    def __parse_fish_page__(self, response, name):
        basic_info = self.__parse_fish_basic_info__(response)
        purchased_from = self.__parse_fish_purchased_from_info__(response)
        drops = self.__parse_fish_drops_info__(response)

    def __parse_fish_basic_info__(self, response):
        xpath = xpath_nodeset_intersection(
            "//div[@id='mw-content-text']/h2[span[@id='Basic_Information']]/following-sibling::ul",
            "//div[@id='mw-content-text']/h2[span[@id='Obtained_By']]/preceding-sibling::ul"
        )
        sel = Selector(text=response.selector.xpath(xpath).get())
        return {
            "recommend_level": sel.xpath("//li[1]/text()").re(r"\d+$")[0],
            "fish_type": sel.xpath("//li[2]/a[1]/text()").get(),
            "aquarium_type": sel.xpath("//li[3]/a[1]/text()").get(),
            "size_range_str": sel.xpath("//li[4]/text()").re("[a-zA-Z].+$"),
        }

    def __parse_fish_purchased_from_info__(self, response):
        xpath = xpath_nodeset_intersection(
            "//div[@id='mw-content-text']/h3[span[@id='Purchased_From']]/following-sibling::ul",
            "//div[@id='mw-content-text']/h3[span[@id='Dropped_By']]/preceding-sibling::ul"
        )
        sel = Selector(text=response.selector.xpath(xpath).get())
        cnt = int(float(sel.xpath("count(//ul/li)").get()))
        return list(map(lambda idx: {
            "vendor": sel.xpath(f"//ul/li[{idx+1}]/a[1]/text()").get(),
            "area": sel.xpath(f"//ul/li[{idx+1}]/a[2]/text()").get(),
            "coordinates": tuple(map(lambda x: float(x), sel.xpath(f"//ul/li[{idx+1}]/text()").re(r"[0-9.]+"))),
        }, range(cnt)))

    def __parse_fish_drops_info__(self, response):
        xpath = xpath_nodeset_intersection(
            "//div[@id='mw-content-text']/h3[span[contains(@id, 'Fishing_Log')]]/following-sibling::ul",
            "//div[@id='mw-content-text']/h2[span[@id='Used_For']]/preceding-sibling::ul",
        )
        drops = []
        for idx, drop_info in enumerate(response.selector.xpath(xpath).getall()):
            sel = Selector(text=drop_info)
            drops.append({
                "location": sel.xpath("//a[@title='Location']/following-sibling::a[1]/text()").get(),
                "coordinates": sel.xpath("//li[1]/b/text()").re(r"[0-9.]+"),
                "hole_level": sel.xpath("//li[2]/text()").re(r"[0-9.]+"),
                "baits": sel.xpath("//li[3]//a[not(@title='Baits')]/text()").getall(),
                "fishing_log": response.selector.xpath(f"//div[@id='mw-content-text']/h3[span[contains(@id, 'Fishing_Log')]][{idx+1}]/span[1]/text()").re(r": (.*)")
            })
            breakpoint()
        return drops
