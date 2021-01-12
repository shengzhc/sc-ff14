import datetime
import math

__E_TIME = 20.5714285714


def __utc_timestamp():
    dt = datetime.datetime.now()
    utc_time = dt.replace(tzinfo=datetime.timezone.utc)
    return utc_time.timestamp()


def __eorzea_timestamp():
    return math.floor(__utc_timestamp() * __E_TIME)


def eorzea_format_time():
    eo_timestamp = __eorzea_timestamp()
    dt = datetime.datetime.fromtimestamp(eo_timestamp)
    t = dt.utctimetuple()
    am_pm = "PM" if t.tm_hour > 11 else "AM"
    hour = t.tm_hour if t.tm_hour <= 12 else t.tm_hour - 12
    return "{:02d}:{:02d} {} EORZEA Time".format(hour, t.tm_min, am_pm)
