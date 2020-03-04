const express = require('express');
const app = express();
morgan = require('morgan');
bodyParser = require('body-parser');
app.use(bodyParser.json());
uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDb', { useNewUrlParser: true, useUnifiedTopology: true });

//morgan middleware tracks when api was accessed and what was requested etc.
app.use(morgan('common'));

//introductory message on opening API with no url endpoint specified
app.get('/', function (req, res, next) {
  res.send('Welcome to my movie API!');
  next();
});

//MOVIES --- gets all movies
app.get('/movies', function(req, res) {
  Movies.find()
  .then(function(movies) {
    res.status(200).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//gets a specific movie's information by searching its title name
app.get('/movies/:Title', function(req, res) {
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
app.get('/movies/genres/:Name', function(req, res) {
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
app.get('/movies/directors/:Name', function(req, res) {
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
app.get('/users', function(req, res) {
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
app.get('/users/:Username', function(req, res) {
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
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
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

//allows user to update their information
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
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
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(404).send(req.params.Username + " was not found");
    } else {
      res.status(204).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//FAVOURITES --- adds movies to favourites, prevents duplicates of the same movie being added to the favourites.
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
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
app.delete('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavouriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.status(204).json(updatedUser)
    }
  })
});

//documentation
app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, ()=> console.log('listening on port 8080...'));
