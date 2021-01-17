# This package will contain the spiders of your Scrapy project
#
# Please refer to the documentation for information on how to create and manage
# your spiders.


import os
from inspect import isclass
from pkgutil import iter_modules
from pathlib import Path
from importlib import import_module

# iterate through the modules in the current package
package_dir = Path(__file__).resolve().parent
for (_, module_name, _) in iter_modules([package_dir]):

    # import the module and iterate through its attributes
    module = import_module(f"{__name__}.{module_name}")
    for attribute_name in dir(module):
        attribute = getattr(module, attribute_name)

        if isclass(attribute):
            # Add the class to this package's variables
            globals()[attribute_name] = attribute

# Remove the log files if exists
log_files = [
    "log/error.log",
    "log/latest.log",
]

for log_file in log_files:
    if os.path.exists(log_file):
        os.remove(log_file)
