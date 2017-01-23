from urllib import urlretrieve
import urlparse
from bs4 import BeautifulSoup
import urllib2

url = "http://www.williams.edu/"
soup = BeautifulSoup(urllib2.urlopen(url))
for img in soup.select('a.image > img'):
    img_url = urlparse.urljoin(url, img['src'])
    file_name = img['src'].split('/')[-1]
    urlretrieve(img_url, file_name)
