// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');

var Artist = require('./models/artist');
var Song = require('./models/song');
var User = require('./models/user');

var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://pablo:picasso@ds041150.mlab.com:41150/death-of-pablo');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.json({ message: 'death-of-pablo-api' });
});

function parse(objString) {
  return eval('('+objString+')');
}

function setQuery(mongoQuery, urlQuery) {
  mongoQuery.find(parse(urlQuery.where));
  mongoQuery.sort(parse(urlQuery.sort));
  mongoQuery.select(parse(urlQuery.select));
  mongoQuery.skip(urlQuery.skip);
  mongoQuery.limit(urlQuery.limit);
  if(parse(urlQuery.count) === true)
    mongoQuery.count(parse(urlQuery.count));
}

//Routes
var userRoute = router.route('/user/');
var userIDRoute = router.route('/user/:userid');
var songRoute = router.route('/songs');
var populateSongsRoute = router.route('/populate/songs');
var populateArtistsRoute = router.route('/populate/artists');
var artistRoute = router.route('/artists');
var artistIdRoute = router.route('/artists/:id');

function calculateRank(lyrics) {
  return Math.floor((Math.random() * 100) + 1);
}

function calculateScore(lyrics) {
  return Math.floor((Math.random() * 100) + 1);
}

function calculateRhymesPerVerse(lyrics) {
  return Math.floor((Math.random() * 20) + 1);
}

function calculateVocabLevel(lyrics) {
  return Math.floor((Math.random() * 12) + 1);
}

function hash(value) {
  return value;
}

function assembleSong(songParams) {
  var lyrics = songParams.lyrics;

  return {
    "title": songParams.title,
    "lyrics": lyrics,
    "artistIds": songParams.artistIds.split(","),
    "rank": calculateRank(lyrics),
    "score": calculateScore(lyrics),
    "rhymesPerVerse": calculateRhymesPerVerse(lyrics),
    "vocabLevel": calculateVocabLevel(lyrics)
  };
}

function assembleArtist(artistParams) {
  console.log(artistParams);

  return {
    "name": artistParams.name,
    "description": artistParams.description,
    "songIds": typeof(artistParams.songIds) !== "undefined" ? artistParams.songIds.split(",") : [] 
  };
}

//Route methods
populateSongsRoute.post(function(req, res) {
  var tempSong = req.body;

  Song.create(tempSong, function(err, song) {
    if(err) {
      res.status(500);
      res.json({ message:'Error creating song.' });
    } else {
      // Have to update artist once song is added because a song belongs to an artist.
      var songId = song._id;
      console.log(songId);
      var artistIds = req.body.artistIds.split(",");

      Artist.update({ _id: { $in: artistIds } },
        { $addToSet: { "songIds": songId } },
        { multi: true },
        function(err, artist) {
          if (err) {
            res.status(500);
            res.json({ message: "Error updating artist." });
          }
      });

      res.status(201);
      res.json({message: "OK", data: [song]});
    }
  });
});
populateSongsRoute.delete(function(req, res) {
  Song.remove({}, function(err) {
    if(err) {
      res.status(500);
      res.json({ message: 'Error deleting songs' });
    }
    else
      res.json({ message: 'OK' });
  });
});
populateArtistsRoute.post(function(req, res) {
  var tempArtist = assembleArtist(req.body);

  Artist.create(tempArtist, function(err, artist) {
    if (err) {
      res.status(500);
      res.json({ message: "Error creating artist." });
    } else {
      res.status(200);
      res.json({ message: "Successful artist creation.", data: [artist] });
    }
  });
});
populateArtistsRoute.delete(function(req, res) {
  Artist.remove({}, function(err) {
    if(err) {
      res.status(500);
      res.json({ message: 'Error deleting artists' });
    }
    else
      res.json({ message: 'OK' });
  });
});


songRoute.get(function(req, res) {
  var query = Song.find();
  setQuery(query, req.query);
  query.exec(function(err, songs) {
    if(err) {
      res.status(500);
      res.json({ message:'Error retrieving songs' });
    }
    else
      res.json({ message:'OK', data:songs });
  });
});

songRoute.post(function(req, res) {
  var tempSong = assembleSong(req.body);

  Song.create(tempSong, function(err, song) {
    if(err) {
      res.status(500);
      res.json({ message:'Error creating song.' });
    } else {
      // Have to update artist once song is added because a song belongs to an artist.
      var songId = song._id;
      console.log(songId);
      var artistIds = req.body.artistIds.split(",");

      Artist.update({ _id: { $in: artistIds } },
        { $addToSet: { "songIds": songId } },
        { multi: true },
        function(err, artist) {
          if (err) {
            res.status(500);
            res.json({ message: "Error updating artist." });
          }
      });

      res.status(201);
      res.json({message: "OK", data: [song]});
    }
  });
});

songRoute.delete(function(req, res) {
  Song.findByIdAndRemove(req.params.userid, req.body,
    function(err, song) {
      if (err) {
        res.status(500);
        res.json({ message: "Error removing song." });
      } else {
        res.status(200);
        res.json({ message: "Successful delete." });
      }
    })
})

artistRoute.get(function(req, res) {
  var query = Artist.find();
  setQuery(query, req.query);
  query.exec(function(err, artists) {
    if(err) {
      res.status(500);
      res.json({ message:'Error retrieving artists' });
    }
    else
      res.json({ message:'OK', data:artists });
  });
});

artistIdRoute.get(function(req, res) {
  var artistId = req.params.id;

  Artist.findById(artistId, function(err, artist) {
    if (err) {
      res.status(500);
      res.json({ message: "Error finding artist." });
    } else {
      res.status(200);
      res.json({ message: "Success finding artist.", data: [artist] });
    }
  });
});

artistIdRoute.put(function(req, res) {
  var artistId = req.params.id;
  var songIds = req.body.songIds.split(",");

  Artist.findByIdAndUpdate(artistId,
    {$addToSet: {"songIds": {$each: songIds}}}, function(err, artist) {
      if (err) {
        res.status(500);
        res.json({message: "Error updating artist."});
      } else {
        res.status(200);
        res.json({message: "Successful updating of artist.", data: []});
      }
    });
});

userRoute.post(function(req, res) {
  var newUser = {
    username: req.body.username,
    passwordHash: hash(req.body.password),
    favSongIds: [],
    favArtistIds: [],
    aboutMe: '',
    thumbnailUrl: req.body.thumbnailUrl != undefined ? req.body.thumbnailUrl : ''
  };
  User.create(
    newUser,
    function(err, user) {
    if(err) {
      res.status(500);
      res.json({ message:err });
    }
    else {
      res.status(201);
      res.json({ message:'OK', data:user });
    }
  });
});
userRoute.get(function(req, res) {
  //console.log(req.query);
  User.findOne({username: req.query.username},
    function(err, user) {
      if(err) {
        res.status(500);
        res.json({ message:'Error' });
      }
      else if(user != null) {
        if(hash(req.query.password) != user.passwordHash) {
          res.status(404);
          res.json({ message:'Username or password incorrect' });
        }
        else
          res.json({ message: 'OK', data:user});
      }
      else {
        res.status(404);
        res.json({ message:'Username or password incorrect' });
      }
    }
  );
});
userIDRoute.get(function(req, res) {
  User.findById(req.params.userid,
    function(err, user){
      if(err) {
        res.status(500);
        res.json({ message:'Error retrieving user' });
      }
      else if(user == null) {
        res.status(404);
        res.json({ message:'User does not exist' });
      }
      else
        res.json({ message:'OK', data:user });
    });
});
userIDRoute.put(function(req, res) {
  User.findByIdAndUpdate(req.params.userid, req.body,
    function(err, user) {
      if(err) {
        res.status(500);
        res.json({ message:'Error updating user' });
      }
      else
        res.json({ message:'OK', data:user });
    });
});
userIDRoute.delete(function(req, res) {
  User.findByIdAndRemove(req.params.userid,
    function(err, details) {
      if(err) {
        res.status(500);
        res.json({ message:'Error deleting user' });
      }
      else if(details.result.n == 0) {
        res.status(404);
        res.json({ message:'User not found' });
      }
      else
        res.json({ message: 'OK' });
    });
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
