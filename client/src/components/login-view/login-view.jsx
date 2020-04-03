import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';




export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { showRegistrationView } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    /*send request to server for authentication */
    axios.post('https://myflix-project.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.error(e)
      });
  };

  return (
    <Container className="mx-auto" style={{ width: "80%" }}>
      <Form className='mt-5 login-form' onSubmit={handleSubmit}>
        <Form.Group controlId="login-username">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="login-password" className="login-pw mt-3">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="login-button mt-3" type="button" variant="dark" size="sm" type="submit">Submit</Button>
        <Form.Group controlId="link-to-registration" className="register-here mt-3">
          <Form.Text>Haven't got an account yet.. </Form.Text>

          <Link to={`/register`}>
            <Button className="link-to-registration-button mt-3" type="button" variant="dark" size="sm">Register Here!!</Button>
          </Link>
        </Form.Group>


      </Form>
    </Container >
  );
}