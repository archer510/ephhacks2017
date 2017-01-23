#!/bin/python
'''
A program that takes a file with urls, pulls all of the
images from the web pages of the urls, and puts the url
each image in a new file, image_urls.
'''

import requests
import os
from bs4 import BeautifulSoup

RESULTS_PER_PAGE = 20

def parse_urls(file_path):
    # open file with urls in it
    file_name = open(file_path)
    # parse each line as item in list
    lines = [i for i in file_name.readlines()]
    return(lines)


def get_images(search_url):
    """Returns a list of images found for the search_query."""
    number_of_images = 20
    results_list = []
    for start_image in range(0, number_of_images, RESULTS_PER_PAGE):
        results = RESULTS_PER_PAGE
        remaining_image = number_of_images - start_image
        if remaining_image < RESULTS_PER_PAGE:
            results = remaining_image

        #download webpage from url
        page = requests.get(search_url)

        success = False
        
        #use beautiful soup to take picture URLS       
        html = BeautifulSoup(page.content, "lxml")
        for img in html.findAll('img',{"src":True}):
            results_list.append(img['src'])
            success = True


        if not success:
            break
    return results_list

def write_urls():
    # get list of urls from file containing urls
    urls = parse_urls("urllist_short")
    all_images = []
    # find all images at every url, add images to list of all images
    for u in urls:
        images = get_images(u)
        all_images = all_images + images
    return all_images

def main():
    print "debug 1"
    image_urls_list = write_urls()
    print "debug 2"
    image_urls_file = open("image_urls", 'w')
    for url in image_urls_list:
        image_urls_file.write("%s\n" % url)

if __name__ == "__main__": main()
