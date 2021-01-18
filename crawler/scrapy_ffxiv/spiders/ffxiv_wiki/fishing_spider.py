from functools import reduce
import scrapy
import requests
from scrapy import Selector
from scrapy_ffxiv.items.ffxiv_wiki_fish import FfxivWikiFish, FfxivWikiFishDropDetails, FfxivWikiFishPurchaseFromVendor
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
    custom_settings = {
        'ITEM_PIPELINES': {
            'scrapy_ffxiv.pipelines.ffxiv_wiki.FfxivWikiFishDedupPipeline': 100,
        },
    }

    site_base = "https://ffxiv.consolegameswiki.com/"

    # url-based lookup config map. Each value is (key_table_class_name, fish_column_index)
    url_fish_lookup = {
        "https://ffxiv.consolegameswiki.com/wiki/Fishing_Locations": ('gathering-role', 6),
        "https://ffxiv.consolegameswiki.com/wiki/Heavensward_Fishing_Locations": ('gathering-role', 4),
        "https://ffxiv.consolegameswiki.com/wiki/Stormblood_Fishing_Locations": ('wikitable', 4),
        "https://ffxiv.consolegameswiki.com/wiki/Shadowbringers_Fishing_Locations": ('wikitable', 4),
    }

    def __init__(self, *args, **kwargs):
        super(scrapy.Spider, self).__init__(*args, **kwargs)
        self.__unhandled_fishes__ = []

    def close(self, reason):
        with open('data/unhandled_fishes.data', 'w') as f:
            if len(self.__unhandled_fishes__) > 0:
                f.write(reduce(lambda x, y: f"{x},{y}", self.__unhandled_fishes__))

    def parse(self, response):
        rows = response.selector.xpath(f"//table[contains(@class, '{self.url_fish_lookup[response.url][0]}')]//tr[position()>1]//td/..").getall()
        col = self.url_fish_lookup[response.url][1]
        for row in rows:
            sel = Selector(text=row)
            names = sel.xpath(f"//td[{col}]/a/text()").getall()
            for idx, name in enumerate(names):
                follow_url = requests.compat.urljoin(self.site_base, sel.xpath(f"//td[{col}]/a[{idx+1}]/@href").get())
                yield response.follow(follow_url, self.__parse_fish_page__, cb_kwargs=dict(name=name, parent_url=response.url))

    def __parse_fish_page__(self, response, name, parent_url):
        basic_info = self.__parse_fish_basic_info__(response)
        vendors = self.__parse_fish_purchased_from_vendors__(response)
        drops = self.__parse_fish_drops_info__(response)

        if basic_info is not None:
            yield FfxivWikiFish(name=name,
                                recommend_level=basic_info["recommend_level"],
                                fish_type=basic_info["fish_type"],
                                aquarium_type=basic_info["aquarium_type"],
                                size_range=basic_info["size_range"],
                                purchase_from_vendors=vendors if vendors is not None else [],
                                drops=drops if drops is not None else [])
        else:
            self.__unhandled_fishes__.append(name)

    def __parse_fish_basic_info__(self, response):
        xpath = xpath_nodeset_intersection(
            "//div[@id='mw-content-text']/h2[span[@id='Basic_Information']]/following-sibling::ul",
            "//div[@id='mw-content-text']/h2[span[@id='Obtained_By' or @id='Acquisition']]/preceding-sibling::ul"
        )
        try:
            sel = Selector(text=response.selector.xpath(xpath).get())
            recommend_level_lookup = sel.xpath("//li[1]/text()").re(r"\d+$")
            return {
                "recommend_level": int(recommend_level_lookup[0]) if len(recommend_level_lookup) > 0 else 0,
                "fish_type": sel.xpath("//li[2]/a[1]/text()").get(),
                "aquarium_type": sel.xpath("//li[3]/a[1]/text()").get(),
                "size_range": sel.xpath("//li[4]/text()").re("[a-zA-Z].+$"),
            }
        except Exception as ex:
            self.logger.error(f"""
                __parse_fish_basic_info__ exception: {ex}\n
                sel:{response.selector.xpath(xpath).get()}\n
                url: {response.url}\n
                exception_type: {type(ex)}\n
                cb_kwargs: {response.cb_kwargs}\n
                """)
            return None

    def __parse_fish_purchased_from_vendors__(self, response):
        xpath = xpath_nodeset_intersection(
            "//div[@id='mw-content-text']/h3[span[@id='Purchased_From']]/following-sibling::ul",
            "//div[@id='mw-content-text']/h3[span[@id='Dropped_By']]/preceding-sibling::ul"
        )
        try:
            sel = Selector(text=response.selector.xpath(xpath).get())
            cnt = int(float(sel.xpath("count(//ul/li)").get()))
            return list(map(lambda idx: FfxivWikiFishPurchaseFromVendor(name=sel.xpath(f"//ul/li[{idx+1}]/a[1]/text()").get(),
                                                                        area=sel.xpath(f"//ul/li[{idx+1}]/a[2]/text()").get(),
                                                                        coordinates=tuple(map(lambda x: float(x), sel.xpath(f"//ul/li[{idx+1}]/text()").re(r"[0-9.]+")))),
                            range(cnt)))
        except ValueError:
            return None
        except Exception as ex:
            self.logger.error(f"""
                __parse_fish_purchased_from_vendors__ exception: {ex}\n
                sel:{response.selector.xpath(xpath).get()}\n
                url: {response.url}\n
                exception_type: {type(ex)}\n
                """)
            return None

    def __parse_fish_drops_info__(self, response):
        xpath = "//div[@id='mw-content-text']/h3[span[contains(@id, 'Fishing_Log')]]/following-sibling::ul[1]"
        drops = []
        for idx, drop_info in enumerate(response.selector.xpath(xpath).getall()):
            try:
                sel = Selector(text=drop_info)
                hole_level_lookup = sel.xpath("//li[2]/text()").re(r"[0-9.]+")
                drops.append(
                    FfxivWikiFishDropDetails(location=sel.xpath("//a[@title='Location']/../following-sibling::a[1]/text()").get(),
                                             coordinates=tuple(map(lambda x: float(x), sel.xpath("//li[1]/text()").re(r"[0-9.]+"))),
                                             baits=sel.xpath("//li[3]//a[not(@title='Baits')]/text()").getall(),
                                             fish_log=response.selector.xpath(f"//div[@id='mw-content-text']/h3[span[contains(@id, 'Fishing_Log')]][{idx+1}]/span[1]/text()").re(r": (.*)")[0],
                                             hole_level=int(hole_level_lookup[0]) if len(hole_level_lookup) > 0 else 0))
            except Exception as ex:
                self.logger.error(f"""
                    __parse_fish_drops_info__ exception: {ex}\n
                    sel:{drop_info}\n
                    url: {response.url}\n
                    exception_type: {type(ex)}\n
                    """)
        return drops
