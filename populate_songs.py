import os, requests, random, json

BASE_URL           = "http://localhost:4000/api"
POPULATE_SONGS_URL = "/populate/songs"
ARTISTS_URL        = "/artists"

def populate_songs():
  song_count = 0
  for root, dirs, files in os.walk("data", followlinks=True):
      song_count += len(files)

  # Generate ranks and scores for the songs.
  sorted_score = sorted([random.triangular(20, 100, 82) for x in xrange(song_count)])
  rank_score = [(x, sorted_score[x]) for x in xrange(len(sorted_score))]

  # Get artist IDs.
  r = requests.get(BASE_URL + ARTISTS_URL)
  artists = json.loads(r.content)["data"]
  ids = [x["_id"] for x in artists]

  i = 0
  for root, dirs, files in os.walk("data", followlinks=True):
      for file in files:
          file_path = os.path.join(root, file)
          with open(file_path) as f:
              lyrics = [x for x in f]
              rank, score = rank_score[i]
              r = requests.post(BASE_URL + POPULATE_SONGS_URL,
                               data={"title": file,
                                     "lyrics": lyrics,
                                     "rank": rank,
                                     "score": score,
                                     "rapDensity": random.randint(0, 100),
                                     "rhymesPerVerse": random.randrange(0, 50),
                                     "vocabLevel": random.randint(0, 12),
                                     "artistIds": [random.choice(ids)]
                                     })
              i += 1



