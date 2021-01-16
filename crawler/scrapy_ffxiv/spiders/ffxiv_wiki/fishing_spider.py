import scrapy
import requests


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
        breakpoint()
