import scrapy


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

    def parse(self, response):
        ts = response.selector.xpath("//table").getall()
        breakpoint()
        # response.selector.xpath("//table[contains(@class, 'gathering-role')]/tbody")
        pass
