const express = require('express');
const app = express();
morgan = require('morgan');
bodyParser = require('body-parser');
app.use(bodyParser.json());
uuid = require('uuid');

//List of users
let users = [
  {
    id : '823762',
    username : 'JohnDoe123',
    name: 'John Doe',
    dob : '12/12/12',
    password :'JohnDoe123',
    email : 'JohnDoe123@johndoe.com',
    favourites : [
      {
        title : 'The Beach',
        description: 'Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.',
        genres: 'Adventure, Drama, Romance, Thriller',
        director : 'Danny Boyle',
        image :  'https://m.media-amazon.com/images/M/MV5BNTljZTUzYWUtOTI4YS00NmZlLWE5MmQtZjFlZDZhNjg4MjQxXkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_.jpg',
      },
    ]
  },
];

//list of genres and descriptions
let genres = [
  {
    name : 'Adventure',
    description : 'An adventure story is about a protagonist who journeys to epic or distant places to accomplish something.',
  },
  {
    name : 'Drama',
    description : 'A genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles',
  },
  {
    name : 'Romance',
    description: 'Most often a romance is understood to be "love stories", emotion-driven stories that are primarily focused on the relationship between the main characters of the story.',
  },
  {
    name : 'Thriller',
    description : 'A Thriller is a story that is usually a mix of fear and excitement. It generally has a dark or serious theme, which also makes it similar to drama.'
  },
  {
    name : 'Sci-Fi',
    description : 'Science fiction is similar to fantasy, except stories in this genre use scientific understanding to explain the universe that it takes place in.',
  },
  {
    name : 'Fantasy',
    description : 'A fantasy story is about magic or supernatural forces, rather than technology.',
  },
  {
    name : 'Comedy',
    description : 'A story that tells about a series of funny, or comical events, intended to make the audience laugh.',
  },
  {
    name : 'Horror',
    description : 'A horror story is told to deliberately scare or frighten the audience, through suspense, violence or shock.',
  },
  {
    name : 'Crime',
    description : 'A crime story is about a crime that is being committed or was committed. It can also be an account of a criminal\'s life. It often falls into the action or adventure genres.',
  },
];

//list of directors with basic info - name dob bio.
let directors = [
  {
    name : 'Danny Boyle',
    dob : '20 October 1956',
    bio : 'Daniel Francis Boyle is an English director of film and stage, producer, and screenwriter. He is known for his work on films including Shallow Grave, Trainspotting and its sequel T2 Trainspotting, The Beach, 28 Days Later, Sunshine, Slumdog Millionaire, 127 Hours, Steve Jobs and Yesterday. His debut film Shallow Grave won the BAFTA Award for Best British Film. The British Film Institute ranked Trainspotting the 10th greatest British film of the 20th century.',
  },
  {
    name : 'James McTeigue',
    dob : '29 December 1967',
    bio : 'Janes McTeigue is an Australian film director. He has been an assistant director on many films, including Dark City (1998), the Matrix trilogy (1999–2003) and Star Wars: Episode II – Attack of the Clones (2002), and made his directorial debut with the 2005 film V for Vendetta to critical acclaim. Since Vendetta he has collaborated with the Wachowskis an additional three times as director on The Invasion (albeit uncredited), Ninja Assassin and Sense8.',
  },
  {
    name : 'Guillermo del Toro',
    dob : '9 October 1964',
    bio : 'Guillermo del Toro Gómez is a Mexican filmmaker, author, actor, and former special effects makeup artist. He is best known for the Academy Award-winning fantasy films Pan\'s Labyrinth (2006) and The Shape of Water (2017), winning the Oscars for Best Director and Best Picture for the latter.',
  },
  {
    name : 'Christopher Nolan',
    dob : '30 July 1970',
    bio : 'Christopher Nolan is a British-American filmmaker, who is known for making personal, distinctive films within the Hollywood mainstream. His ten films have grossed over US$4.7 billion worldwide and garnered a total of 34 Oscar nominations and ten wins.',
  },
  {
    name : 'Edgar Wright',
    dob : '18 April 1974',
    bio: 'Edgar Howard Wright is an English director, screenwriter and producer. Recognized as an auteur, he is famous for his fast-paced and kinetic, satirical genre films, which feature extensive reliance on music, tracking steady-cam shots, dolly zooms and a signature editing style that includes transitions, whip-pans and wipes.',
  },
];

//movie information
let topMovies = [
  {
    title : 'The Beach',
    description: 'Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.',
    genres: 'Adventure, Drama, Romance, Thriller',
    director : 'Danny Boyle',
    image :  'https://m.media-amazon.com/images/M/MV5BNTljZTUzYWUtOTI4YS00NmZlLWE5MmQtZjFlZDZhNjg4MjQxXkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_.jpg',
    },
  {
    title : 'V for Vendetta',
    description : 'In a future British tyranny, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow it with the help of a young woman.',
    genres : 'Action, Drama, Sci-Fi, Thriller',
    director : 'James McTeigue',
    image : 'https://upload.wikimedia.org/wikipedia/en/9/9f/Vforvendettamov.jpg'
  },
  {
    title : 'Pan\'s Labyrinth',
    description : 'In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.',
    genres : 'Drama, Fantasy',
    director : 'Guillermo del Toro',
    image : 'https://upload.wikimedia.org/wikipedia/en/6/67/Pan%27s_Labyrinth.jpg'
  },
  {
    title : 'Shaun of the Dead',
    description : 'A man\'s uneventful life is disrupted by the zombie apocalypse.',
    genres : 'Comedy, Horror',
    director : 'Edgar Wright',
    image : 'https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,669,1000_AL_.jpg',
  },
  {
    title : 'The Dark Knight',
    description : 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genres : 'Action, Crime, Drama, Thriller',
    director : 'Christopher Nolan',
    image : 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg',
  },
];

//morgan middleware tracks when api was accessed and what was requested etc.
app.use(morgan('common'));

//introductory message on opening API with no url endpoint specified
app.get('/', function (req, res, next) {
  res.send('Welcome to my movie API!');
  next();
});

//MOVIES --- gets all movies
app.get('/movies', function(req, res, next) {
  res.json(topMovies)
  next();
});

//gets a specific movie's information by searching its title name
app.get('/movies/:title', (req, res, next) => {
  res.json(topMovies.find((movie) => {
    return movie.title === req.params.title
    })
  );
  next();
});

//gets a movie genre descripton by searching a genre name
app.get('/genres/:name', (req, res, next) => {
  res.json(genres.find( (genre) => {
    return genre.name === req.params.name
    })
  );
    next();
});

app.get('/directors', function(req, res, next) {
  res.json(topMovies)
  next();
});

//gets basic info about a director upon searching their name
app.get('/directors/:name', (req, res, next) => {
  res.json(directors.find( (director) => {
    return director.name === req.params.name
    })
  );
    next();
});

//USERS --- get all users
app.get('/users', function(req, res, next) {
  res.json(users)
  next();
});

//gets a user by id as there may be multiple users with the same name / usernames
app.get('/users/:id', (req, res) => {
  res.json(users.find( (user) => {
    return user.id === req.params.id
    })
  );
    next();
});

//add new user - required fields = username, password and email
app.post('/users', (req, res, next) => {
  let newUser = req.body;

  if(!newUser.name) {
    const message = 'Missing "name" in request body';
    res.status(404).send(message);
  }
  if(!newUser.username) {
    const message = 'Missing "username" in request body';
    res.status(404).send(message);
  }
  if(!newUser.password) {
    const message = 'Missing "password" in request body';
    res.status(404).send(message);
  }
  if(!newUser.email) {
    const message = 'Missing "email" in request body';
    res.status(404).send(message);
  }
  else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
  next();
});

//allows user to update their information (https://stackoverflow.com/questions/35206125/javascript-es6-es5-find-in-array-and-change)
app.put('/users/:id', (req, res, next) => {
  //finds user object by index within users array,
  let userIndex = users.findIndex((user) => {return user.id === req.params.id});
  const user = users[userIndex];
  let newData = req.body;

  if (!user) {
    res.status(404).send('User: ' + req.params.username + ', username : ' + req.params.id + ' was not found.')
  }
  else if (!newData) {
    res.status(400).send("No changes were made!")
  }
  else {
    users[userIndex] = Object.assign(user, newData);
    res.status(201).send(user);
  }
  next();
});

//delete existing user (deregistration)
app.delete('/users/:id', (req, res, next) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (!user) {
      const message = 'Unable to find user ID:' + req.params.id + '.';
      res.status(404).send(message);
  }
  else {
    users = users.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send('User: ' + req.params.id + ' was deleted.')
  }
  next();
});

//deletes a movie from user's favourites list
app.delete('/users/:id/:favourites/:title', (req, res, next) => {
  let userIndex = users.findIndex((user) => {return user.id === req.params.id});
  let movieIndex = users[userIndex].favourites.findIndex((movie) => {return movie.title === req.params.title});

  if (userIndex < 0) {
    res.status(404).send('User ID: ' + req.params.id + 'not found!');
  }
  if (movieIndex < 0) {
    res.status(404).send('Movie: ' + req.params.title + 'not found!');
  }
  else {
    users[userIndex].favourites = users[userIndex].favourites.filter(function(obj) { return obj.title !== req.params.title });
    res.status(201).send('This movie: ' + req.params.title + ' was deleted.');
  }
  next();
});


//FAVOURITES --- creates and pushes a movie object to a specific user's (id) favourites array.
app.post('/users/:id/:favourites/:title', (req, res, next) => {
  let userIndex = users.findIndex((user) => {return user.id === req.params.id});
  let movie = topMovies.find((movie) => {return movie.title === req.params.title});

  if (!movie) {
    res.status(404).send('Movie named: ' + req.params.title + 'not found!');
  }
  else if (userIndex < 0) {
    res.status(404).send('User ID: ' + req.params.id + 'not found!');
  }
  else {
    users[userIndex].favourites.push(movie);
    res.status(201).send('This movie ' + req.params.title + ' has been added to your list of favourites!!');
  }
  next();
});

//documentation
app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, ()=> console.log('listening on port 8080...'));
