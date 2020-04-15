import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Router, Route } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

// #0
import { setMovies } from '../../actions/actions';

import { NavView } from '../nav-view/nav-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DeregistrationView } from '../update-view/deregisteration-view.jsx';


import MoviesList from '../movie-list/movie-list';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';


import { ProfileView } from '../profile-view/profile-view';


const browserHistory = createBrowserHistory();

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem('user'))
      });
      this.getMovies(accessToken);
    }
  }

  getMovies() {
    axios.get('https://myflix-project.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .then(response => {
        this.props.setMovies(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUser(user) {
    this.setState({
      user
    });
    localStorage.setItem('user', JSON.stringify(user));
  }

  createNewUser({ username, password, email, DOB }) {
    axios.post('https://myflix-project.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      DOB: DOB
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab

      })
      .catch(e => {
        console.log('error registering the user', e)
      });
  }

  handleLogin({ username, password }) {
    axios.post('https://myflix-project.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        this.onLoggedIn(data);
      })
      .catch(e => {
        console.error(e)
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    this.getMovies(authData.token);

  }

  deleteMovie(movieId) {
    axios.delete('https://myflix-project.herokuapp.com/users/' + this.state.user.Username + '/movies/' + movieId, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .then(response => {
        this.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser(username, password) {
    axios.delete(`https://myflix-project.herokuapp.com/users/` + this.state.user.Username, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .then(response => {
        alert('{user.Username} has been successfully deleted!')
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab

      })
      .catch(e => {
        console.error('error de-registering the user')
      });
  }

  handleUpdateUser({ username, password, email, DOB }) {
    axios.put('https://myflix-project.herokuapp.com/users/' + this.state.user.Username, {
      Username: username,
      Password: password,
      Email: email,
      DOB: DOB
    }, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    })
      .then(response => {
        this.setUser(response.data);
        // console.log(data);
        browserHistory.push(`/profile`);
      })
      .catch(e => {
        console.error('error registering the user', e)
      });
  }

  getToken() {
    return localStorage.getItem('token');
  }



  onLogout() {
    console.log();
    this.setState({
      movies: null,
      user: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab

  }

  render() {
    // #2
    let { movies } = this.props;
    let { user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router history={browserHistory}>
        <NavView onLogout={this.onLogout.bind(this)} user={user} />
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView handleLogin={user => this.handleLogin(user)} />;
            return <MoviesList movies={movies} />
          }} />
          <Route path="/register" render={() => <RegistrationView createNewUser={user => this.createNewUser(user)} />} />
          <Route path="/unregister" render={() => <DeregistrationView deleteUser={user => this.deleteUser(user)} />} />

          {/* user paths  */}
          <Route exact path="/profile" render={() => {
            if (!user) {
              return <div className="main-view" />
            }
            return <ProfileView user={user} movies={movies} deleteMovie={this.deleteMovie.bind(this)} handleUpdateUser={user => this.handleUpdateUser(user)} />
          }}
          />


          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />

        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);


        // <Button className="logout-button mt-3" type="button" variant="dark" size="sm" onClick={this.onLogout.bind(this)}>Logout</Button>
