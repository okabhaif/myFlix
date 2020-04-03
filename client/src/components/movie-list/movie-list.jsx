import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card'
export class MovieList extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <Container className="mx-auto">
        <Row>
          {movies.map(movie => (
            <Col key={movie._id} lg={4} sm={6} xs={12}>
              <MovieCard key={movie._id} movie={movie} />
            </Col>
          ))}
        </Row>
      </Container >
    )
  }
}
