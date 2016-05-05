import requests

BASE_URL             = "http://localhost:4000/api"
POPULATE_SONGS_URL   = "/populate/songs"
POPULATE_ARTISTS_URL = "/artists"

requests.delete(BASE_URL + POPULATE_SONGS_URL);