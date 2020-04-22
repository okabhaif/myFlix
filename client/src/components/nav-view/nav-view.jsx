import React from 'react';
import { Link } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

export class NavView extends React.Component {

  render() {
    const { user } = this.props;

    return (
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href={`/`}>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user && <Link to={`/`}>
              <Button className="mr-2 mt-2" size="sm" variant="dark">Movies</Button>

            </Link>}
            {user && <Link to={`/profile`}>
              <Button className="mr-2 mt-2" size="sm" variant="dark">Profile</Button>

            </Link>}

            {user && <Link onClick={this.props.onLogout}>
              <Button className="mr-2 mt-2" size="sm" variant="dark">Logout</Button>
            </Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


NavView.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};