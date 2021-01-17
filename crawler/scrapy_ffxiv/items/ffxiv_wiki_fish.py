# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from dataclasses import dataclass


@dataclass
class FfxivWikiFishDropDetails:
    location: str
    coordinates: tuple
    baits: list
    fish_log: str
    hole_level: int


@dataclass
class FfxivWikiFishPurchaseFromVendor:
    name: str
    area: str
    coordinates: tuple


@dataclass
class FfxivWikiFish:
    name: str
    recommend_level: int
    fish_type: str
    aquarium_type: str
    size_range: str
    purchase_from_vendors: list
    drops: list
