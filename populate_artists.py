import os, requests, random

ARTISTS = ["50 Cent",
           "Common",
           "Dr. Dre",
           "E 40",
           "Eazy E",
           "Eminem",
           "Gang Starr",
           "Ice Cube",
           "Jay-Z",
           "Johnny Chang",
           "2Changz",
           "Ludacris",
           "Lupe Fiasco",
           "Kanye West",
           "Snoop Dogg"]

DESCRIPTIONS = ["Rapper",
                "Programmer",
                "Singer",
                "Controversial figure",
                "Producer",
                "Someone",
                "Presidential candidate"]

DESCRIPTORS = [" who likes to talk.",
               " who doesn't smile.",
               " who married five times and divorced twice.",
               " who worked for Facebook as a chef.",
               " who dated Rihanna before and after Breezy.",
               " who doesn't rap.",
               " who hates hip hop."]

BASE_URL             = "http://localhost:4000/api"
POPULATE_SONGS_URL   = "/populate/songs"
POPULATE_ARTISTS_URL = "/artists"

for artist in ARTISTS:
    r = requests.post(BASE_URL + POPULATE_ARTISTS_URL,
                      data={"name": artist,
                            "description": random.choice(DESCRIPTIONS) +
                                         random.choice(DESCRIPTORS)})
