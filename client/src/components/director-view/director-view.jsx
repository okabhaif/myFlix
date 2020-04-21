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
        <Col>
          <div className="director-view p-5">

            <div className="director-name mt-3">
              <h1 className="value"> {director.Name} </h1>
            </div><br />

            <div className="director-bio">
              <span className="label"> Biography: </span>
              <span className="value"> {director.Bio} </span>
            </div>< br />

            <div className="director-DOB">
              <span className="label"> DOB: </span>
              <span className="value"> {director.DOB ? director.DOB.substr(0, 10) : 'Unknown!'} </span>
            </div> <br />

            {director.Died && <div className="director-Died">
              <span className="label"> Died: </span>
              <span className="value">  {director.Died.substr(0, 10)} </span>
            </div>}

            <Link to={`/`}>

              <Button variant="dark" className="nav-to-home mt-3" type="button" size="lg">Home</Button>
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
    DOB: PropTypes.Date,
    Died: PropTypes.Date
  })
};