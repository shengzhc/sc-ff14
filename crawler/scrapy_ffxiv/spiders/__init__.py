# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.


# Remove the last log file if exists
import os
if os.path.exists("latest.log"):
	os.remove("latest.log")