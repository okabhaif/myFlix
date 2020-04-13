import React from 'react';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile-view.scss';
import { MovieList } from '../movie-list/movie-list.jsx'
import { UpdateUsernameView } from '../update-view/update-username.jsx';

export class ProfileView extends React.Component {


  render() {
    const { user, movies, deleteMovie } = this.props;
    const favMovies = movies.filter(movie => user.FavouriteMovies.includes(movie._id));


    console.log(user, favMovies);
    return [

      <Container>
        <Col lg={8} sm={12}>
          <div className="user-view p-5">


            <div className="user-title mt-3">
              <span className="label"> Username: </span>
              <span className="value"> {user.Username} </span>
            </div>
            <div className="user-title mt-3">
              <span className="label"> Registered Email: </span>
              <span className="value"> {user.Email} </span>
            </div>
            <div className="user-title mt-3">
              <span className="label"> DOB: </span>
              <span className="value"> {user.DOB.substr(0, 10)} </span>
            </div>

          </div>
          <div>
            <Link to={`/update-username`}>

              <Button type="button" className="nav-to-update-username" variant="dark" size="sm"> Update username</Button>
            </Link>
            <Link to={`/update-password`}>

              <Button type="button" className="nav-to-update-password" variant="dark" size="sm"> Update password</Button>
            </Link>
            <Link to={`/update-email`}>

              <Button type="button" className="nav-to-update-email" variant="dark" size="sm"> Update Email</Button>
            </Link>
            <Link to={`/update-DOB`}>

              <Button type="button" className="nav-to-update-DOB" variant="dark" size="sm"> Update DOB</Button>
            </Link>
            <Link to={`/unregister`}>

              <Button type="button" className="nav-to-unregister" variant="dark" size="sm">Delete my account</Button>
            </Link>
          </div>
        </Col>
      </Container>,
      <Container>
        <div className="favourites-list">
          <span className="label"> {user.Username}'s Favourite Movies: </span>
          <span className="value"> <MovieList movies={favMovies} deleteMovie={deleteMovie} /> </span>
        </div>


      </Container>]










      ;
  }
}
