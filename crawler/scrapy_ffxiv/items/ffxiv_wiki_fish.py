# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from dataclasses import dataclass


@dataclass
class FfxivWikiFishDropDetails:
    location: str
    location_coordinates: tuple
    baits: list
    mooched_from: list
    condition: list
    weather: list


@dataclass
class FfxivWikiFish:
    name: str
    recommend_level: int
    fish_type: str
    drops: list
