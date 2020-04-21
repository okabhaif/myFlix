import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movie } = this.props;

    return (

      <Container>

        <Row>
          <Col lg={6} sm={6} xs={12}>
            <img className="movie-poster rounded float-left mt-5" src={movie.ImagePath} />
          </Col>

          <Col lg={6} sm={6} xs={12}>
            <div className="movie-view mt-3">

              <div className="movie-title">
                <h1 className="value mt-5 mb-2"> {movie.Title} </h1>
              </div><br />

              <div className="movie-description">
                <span className="label"> Description: </span>
                <span className="value"> {movie.Description} </span>
              </div><br />

              <div className="movie-genre">
                <span className="label"> Genre: </span>
                <span className="value"> {movie.Genre.Name} </span>
              </div><br />

              <div className="movie-director">
                <span className="label"> Director: </span>
                <span className="value"> {movie.Director.Name} </span>
              </div><br />

            </div>

            <Link to={`/directors/${movie.Director.Name}`}>
              <Button className="mr-2 mt-2" size="lg" variant="dark">Director</Button>
            </Link>

            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className="mt-2" size="lg" variant="dark">Genre</Button>
            </Link>
          </Col>

        </Row>
      </Container>


    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
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