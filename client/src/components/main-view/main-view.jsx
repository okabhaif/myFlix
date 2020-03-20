import React from 'react';
import axios from 'axios';
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
    axios.get('https://myflix-project.herokuapp.com/movies')
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

  onLoggedIn(user) {
    this.setState({
      user
    });
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
      </div>
    );
  }
}
