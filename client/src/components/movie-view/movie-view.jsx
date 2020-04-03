import React from 'react';
import { Link } from "react-router-dom";

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
        <Col lg={8} sm={12}>
          <div className="movie-view p-5">
            <img className="movie-poster" src={movie.ImagePath} />

            <div className="movie-title mt-3">
              <span className="label"> Title: </span>
              <span className="value"> {movie.Title} </span>
            </div>

            <div className="movie-description">
              <span className="label"> Description: </span>
              <span className="value"> {movie.Description} </span>
            </div>

            <div className="movie-genre">
              <span className="label"> Genre: </span>
              <span className="value"> {movie.Genre.Name} </span>
            </div>

            <div className="movie-director">
              <span className="label"> Director: </span>
              <span className="value"> {movie.Director.Name} </span>
            </div>
            <Link to={`/`}>

              <Button variant="dark" className="nav-to-home mt-3" type="button" size="sm" >Home</Button>
            </Link>

          </div>

        </Col>
        <Col lg={8} sm={12}>
          <Row>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="dark">Director</Button>
            </Link>

            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="dark">Genre</Button>
            </Link>
          </Row>
        </Col>
      </Container>


    );
  }
}
