import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
            {user && <Nav.Link href={`/`}>Movies</Nav.Link>}

            {user && <Nav.Link href={`/profile`}>My Profile</Nav.Link>}

            {user && <Nav.Link onClick={this.props.onLogout}>Logout</Nav.Link>}
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