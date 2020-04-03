import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { director } = this.props;

    return (

      <Container>
        <Col lg={8} sm={12}>
          <div className="director-view p-5">

            <div className="director-name mt-3">
              <span className="label"> Director: </span>
              <span className="value"> {director.Name} </span>
            </div>

            <div className="director-bio">
              <span className="label"> Biography: </span>
              <span className="value"> {director.Bio} </span>
            </div>

            <div className="director-DOB">
              <span className="label"> DOB: </span>
              <span className="value"> {director.DOB} </span>
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



DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  })
};