import yaml as yml
import logging

logging.basicConfig(filename="./logs/latest.log", filemode="w", level=logging.DEBUG)
app = {}	

with open("env.yml", "r") as env_file:
	env = yml.load(env_file, yml.FullLoader)

try:
	app["seeds"] = env["app"]["seeds"]
	logging.info("Loaded env variables: {}".format(app))
except Exception as ex:
	logging.error("Failed initializing env variables with exception: {}".format(ex))