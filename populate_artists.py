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
           
URLS = ['https://pbs.twimg.com/profile_images/672924174822805505/vN6tunM9.jpg',
'http://alwaysalist.com/wp-content/uploads/2012/06/Common-1.jpeg',
'http://music.mxdwn.com/wp-content/uploads/2015/08/dr-dre-banner-600x600.jpg',
'http://s1.evcdn.com/images/edpborder500/I0-001/004/533/196-4.jpeg_/e40-96.jpeg',
'http://www.jplimeproductions.com/wordpress/wp-content/uploads/2012/03/Eazy-E-RIP.jpg',
'http://imd.ulximg.com/image/300x300/artist/1346353449_4159240d68a922ee4ecdfd8e85d179c6.jpg/555c0322f2473d4eb65681916621c196/1346353449_eminem.jpg',
'https://images.rapgenius.com/7814428cb6826768469418d6a8807e00.712x712x1.jpg',
'http://pixel.nymag.com/imgs/daily/vulture/2015/09/16/16-ice-cube-scrooge.w529.h529.jpg',
'http://imd.ulximg.com/image/300x300/artist/1260292105_48cba66d232fa68f122c8b64394f5fb0.png/5daf1d341d0259ccab4fedbea0d77ae1/1260292105_jayz.png',
'https://pbs.twimg.com/profile_images/451007105391022080/iu1f7brY_400x400.png',
'http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2015/01/2chainz.png',
'http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2014/01/ludacris-2.jpg',
'https://pbs.twimg.com/profile_images/667070426502316032/IOUwjuSg.jpg',
'https://consequenceofsound.files.wordpress.com/2016/01/screen-shot-2016-01-26-at-10-52-24-am.png?w=350&h=350&crop=1',
'http://www.alternet.org/files/images/managed/media_snoop.jpg',
]

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
POPULATE_ARTISTS_URL = "/populate/artists"

def populate_artists():
  for i in range(len(ARTISTS)):
      artist = ARTISTS[i]
      url = URLS[i]
      r = requests.post(BASE_URL + POPULATE_ARTISTS_URL,
                        data={"name": artist,
                              "url": url,
                              "description": random.choice(DESCRIPTIONS) +
                                           random.choice(DESCRIPTORS)})
