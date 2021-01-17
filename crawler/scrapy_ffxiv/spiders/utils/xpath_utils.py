from scrapy import Selector


def xpath_nodeset_intersection(ns1, ns2):
    return f"{ns1}[count(.|{ns2})=count({ns2})]"
