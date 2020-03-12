import requests
import pickle
import sys
from bs4 import BeautifulSoup
from collections import OrderedDict
from multiprocessing.dummy import Pool as ThreadPool

# This script runs every night at 4am to update

# TODO: could probably just use a counter in the env or something rather than this hilarious threading


BASE_URL = 'https://www.datacamp.com'
COURSES_URL = 'https://www.datacamp.com/courses/all'
PICKLE_FILEPATH = './data.pk'

def _get_html(url):
    return requests.get(url).text


def _get_soup(url):
    html = _get_html(url)
    return BeautifulSoup(html, 'html.parser')


def _get_course_links(courses_url):
    soup = _get_soup(courses_url)
    links = []
    for course in soup.find_all('div', {'class': 'course-block'}):
        link = course.find('a')
        links.append(link['href'])
    return links


def _has_datasets(soup):
    if soup.find('div', {'class': 'course__datasets-wrapper'}):
        return True
    return False


def _get_datasets_links_and_names(soup):
    datasets_block = soup.find('div', {'class': 'course__datasets-wrapper'})
    blocks = datasets_block.find_all('a')
    links = [link['href'] for link in blocks]
    names = [link.contents[0].strip() for link in blocks]

    _ = []
    for l, n in zip(links, names):
        _.append({n: l})

    return _


def _get_course_title(soup):
    return soup.title.string


def _get_data(soup):
    title = _get_course_title(soup)
    data = _get_datasets_links_and_names(soup)
    return title, data


def _scrape_data():
    pool = ThreadPool(16)
    courses = _get_course_links(COURSES_URL)
    results = { }

    for course_url in courses:
        print('Checking: ')
        print(BASE_URL + course_url)
        html = _get_html(BASE_URL + course_url)
        soup = BeautifulSoup(html, 'html.parser')
        if _has_datasets(soup):
            print("Getting dataset...")
            d = _get_data(soup)
            title = d[0].replace(" | DataCamp", "")
            data = d[1]
            url = BASE_URL + course_url

            results[url] = {
                title: data
            }
        else:
            print("No datasets!")

    return results


def save_data():
    data = _scrape_data()
    print('saving data to file..')
    sys.setrecursionlimit(50000)
    with open(PICKLE_FILEPATH, 'wb') as f:
        pickle.dump(data, f)
    print('saved!')      


def load_data():
    f = open(PICKLE_FILEPATH, 'rb')
    return pickle.load(f)


if __name__ == '__main__':
     save_data()
