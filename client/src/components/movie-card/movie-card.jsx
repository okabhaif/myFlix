import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {

  delete() {
    this.props.deleteMovie(this.props.movie._id);
  }

  render() {
    const { movie, deleteMovie, toggleFavourite } = this.props;
    return (

      <div className="movie-card-container">
        <Card className="movie-card mt-3" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} className="fixed-movie-image" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <div className="text-card-styling"></div>
            <Card.Text className="card-text">{movie.Description}</Card.Text>
            {!movie.favourite && <Button type="button" variant="dark" size="sm" block onClick={() => toggleFavourite(movie._id)}>Add to favourites</Button>}

            <Link to={`/movies/${movie._id}`}>

              <Button type="button" variant="dark" size="sm" className="mt-2" block>Find out more</Button>
            </Link>
            {deleteMovie && <Button type="button" className="mt-2" variant="dark" size="sm" block onClick={this.delete.bind(this)}>Delete</Button>}
          </Card.Body>
        </Card >
      </div>


    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
  }),
  deleteMovie: PropTypes.func

};