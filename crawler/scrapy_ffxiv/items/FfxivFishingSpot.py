# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from dataclasses import dataclass


@dataclass
class FfxivFishingSpot:
    id: int
    map_coords: tuple
    name: str
    territory_id: int
