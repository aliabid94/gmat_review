import requests
import json
import urllib.request
from time import sleep

count: int = 0
after: str = ""

links = []
titles = []

while count < 200:
    data = {}
    while "data" not in data:
        req = requests.get('http://reddit.com/r/awwducational/top/.json?limit=100&t=all&after='+after)
        data = json.loads(req.text)
        sleep(1)
    after = data["data"]["after"]
    for post in data["data"]["children"]:
        url: str = post["data"]["url"]
        title: str = post["data"]["title"]
        # print(url)
        if url.endswith(".gif") or url.endswith(".gifv") and url not in links and "imgur" in url:
            count += 1
            links.append(url)
            titles.append(title)
            print(count, ": ", url, " ", title)

output = open("cuteness.yaml", "w")
for counter in range(len(links)):
    output.write(str(counter) + ":\n")
    link = links[counter]
    title = titles[counter]
    output.write("  title: " + title + "\n")
    output.write("  link: " + link + "\n")
    output.write("")

