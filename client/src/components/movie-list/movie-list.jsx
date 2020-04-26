import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input.jsx';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, deleteMovie, toggleFavourite } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <Container className="mx-auto">
        <Row>

          {filteredMovies.map(movie => (
            <Col key={movie._id} lg={4} sm={6} xs={12}>
              <MovieCard key={movie._id} movie={movie} deleteMovie={deleteMovie} toggleFavourite={toggleFavourite} />
            </Col>
          ))}
        </Row>
      </Container >
    </div>
  )
}

export default connect(mapStateToProps)(MoviesList);



