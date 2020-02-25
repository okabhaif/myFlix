const express = require('express');
const app = express();
morgan = require('morgan');


let topMovies = [
  {
    title : 'The Beach',
    director : 'Danny Boyle'
  },
  {
    title : 'V for Vendetta',
    director : 'James McTeigue'
  },
  {
    title : 'Reservoir Dogs',
    director : 'Quentin Tarantino'
  },
  {
    title : 'Pan\'s Labyrinth',
    director : 'Guillermo del Toro'
  },
  {
    title : 'One Flew Over the Cuckoo\'s Nest',
    director : 'Miloš Forman'
  },
  {
    title : 'Shaun of the Dead',
    director : 'Edgar Wright'
  },
  {
    title : 'The Dark Knight',
    director : 'Christopher Nolan'
  },
  {
    title : 'Toy Story',
    director : 'John Lasseter'
  },
  {
    title : 'Forest Gump',
    director : 'Robert Zemeckis'
  },
  {
    title : 'American Pie',
    director : 'Paul Weitz, Chris Weitz'
  },
]

app.use(morgan('common'));

app.get('/movies', function(req, res, next) {
  res.json(topMovies)
  next();
});

app.get('/', function (req, res, next) {
  res.send('Welcome!');
  next()
});

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080);
