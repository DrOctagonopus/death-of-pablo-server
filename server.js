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
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

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
var artistRoute = router.route('/artists');

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
    // CHANGE THIS WHEN FRONTEND ALLOWS >1 artist
    "artistIds": [songParams.artistId],
    "albumId": songParams.albumId,
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
    "songIds": artistParams.songIds.split(",")
  };
}

//Route methods
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
      res.json({ message:'Error creating song.'});
    }
    else {
      res.status(201);
      res.json({ message:'OK', data:[song] });
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

artistRoute.post(function(req, res) {
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

userRoute.post(function(req, res) {
  User.create(function(err, user) {
    if(err) {
      res.status(500);
      res.json({ message:'Error creating user'});
    }
    else {
      res.status(201);
      res.json({ message:'OK', data:[user] });
    }
  });
});
userRoute.get(function(req, res) {
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
