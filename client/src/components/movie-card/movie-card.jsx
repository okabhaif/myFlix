import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (

      <div className="movie-card-container">
        <Card className="movie-card mt-3" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} className="fixed-movie-image" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <div className="text-card-styling"></div>
            <Card.Text className="card-text">{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>

              <Button type="button" variant="dark" size="sm" block>Find out more</Button>
            </Link>
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
  })
};