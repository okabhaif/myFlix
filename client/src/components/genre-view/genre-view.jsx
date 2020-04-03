import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { genre } = this.props;

    return (

      <Container>
        <Col lg={8} sm={12}>
          <div className="genre-view p-5">

            <div className="genre-name mt-3">
              <span className="label"> Genre: </span>
              <span className="value"> {genre.Name} </span>
            </div>

            <div className="genre-description">
              <span className="label"> Description: </span>
              <span className="value"> {genre.Description} </span>
            </div>

            <Link to={`/`}>

              <Button variant="dark" className="nav-to-home mt-3" type="button" size="sm">Home</Button>
            </Link>

          </div>

        </Col>
      </Container>


    );
  }
}



GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  })
};