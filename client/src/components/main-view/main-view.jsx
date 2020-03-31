import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { MovieList } from '../movie-list/movie-list';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registrationView: false
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-project.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  selectMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  resetMovie() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogout() {
    console.log();
    this.setState({
      movies: null,
      selectedMovie: null,
      user: null,
      registrationView: false
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  }

  showRegistrationView() {
    this.setState({
      registrationView: true
    });
  }

  onRegistration() {
    this.setState({

      registrationView: false
    });
  }


  render() {
    const { movies, selectedMovie, user, registrationView } = this.state;
    console.log(movies, selectedMovie, user, registrationView)
    if (!user) {
      if (registrationView) {
        return <RegistrationView onRegistration={() => this.onRegistration()} />
      }
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} showRegistrationView={() => this.showRegistrationView()} />;
    }


    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (

      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} resetMovie={this.resetMovie.bind(this)} />
          : <MovieList movies={movies} selectMovie={this.selectMovie.bind(this)} />
        }

        <Button className="logout-button mt-3" type="button" variant="dark" size="sm" onClick={this.onLogout.bind(this)}>Logout</Button>


      </div>
    );
  }
}
