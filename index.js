const express = require('express');
const app = express();
morgan = require('morgan');
bodyParser = require('body-parser');
uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');
  require('./passport'); //local passport file
const cors = require('cors');
const { check, validationResult } = require('express-validator');

//mongoose.connect('mongodb://localhost:27017/myFlixDb', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('process.env.CONNECTION_URI', { useNewUrlParser: true, useUnifiedTopology: true });
var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
var auth = require('./auth')(app);

//middleware.
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

//introductory message on opening API with no url endpoint specified
app.get('/', function (req, res, next) {
  res.send('Welcome to my movie API!');
  next();
});

//MOVIES --- gets all movies
app.get("/movies", passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.find()
    .then(function(movies) {
      res.status(200).json(movies);
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//gets a specific movie's information by searching its title name
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    if (!movie) {
      res.status(404).send(req.params.Title +" was not found!");
    } else {
      res.json(movie)
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});
//gets a movie genre descripton by searching a genre name
//https://docs.mongodb.com/manual/tutorial/query-embedded-documents/
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({'Genre.Name': req.params.Name})
  .then(function(genre){
    if (!genre) {
      res.status(404).send(req.params.Name +" was not found!");
    } else {
      res.json(genre.Genre)
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//gets basic info about a director upon searching their name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({'Director.Name': req.params.Name})
  .then(function(director){
    if (!director) {
      res.status(404).send(req.params.Name +" was not found!");
    } else {
      res.json(director.Director)
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//USERS --- get all users
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find()
  .then(function(users) {
    res.status(200).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//gets a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(404).send(req.params.Username +" was not found!");
    } else {
      res.status(200).json(user)
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//add new user - required fields = username, password, email and Birthday
app.post('/users',
  [check('Username', 'Username is required').isLength({min: 8}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],
  function(req, res) {
    // check the validation object for errors
     var errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
     }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username : req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users
        .create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          DOB: req.body.DOB
        })
        .then(function(user) {res.status(201).json(user) })
        .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//authenticate new user
app.post('/login', function(req, res) {
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (!user) {
    return res.status(404).send(req.body.Username + "not found!");
  } else (user) =>
      Username === req.body.Username,
      Password === hashedPassword
    })
    .then(function(user) {res.status(201).json(user) })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    })
  });


//allows user to update their information
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
[check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],
   function(req, res) {
     // check the validation object for errors
     var errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
     }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
    {
      Username : req.body.Username,
      Password : hashedPassword,
      Email : req.body.Email,
      DOB : req.body.DOB
    }},
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " +err);
      } else {
        res.status(201).json(updatedUser)
      }
    })
});

//delete existing user (deregistration)
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(404).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username+ " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//FAVOURITES --- adds movies to favourites, prevents duplicates of the same movie being added to the favourites.
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $addToSet : { FavouriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.status(201).json(updatedUser)
    }
  })
});

//deletes a movie from user's favourites list
//https://stackoverflow.com/questions/35397513/mongoose-update-push-delete-in-array
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavouriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
    return res.status(200).json(updatedUser)
    }
  })
});

//documentation
app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log(`Listening on Port ${port}`);
});
