import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'




export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { showRegistrationView } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <Container className="mx-auto" style={{ width: "80%" }}>
      <Form className='mt-5 login-form'>
        <Form.Group controlId="login-username">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="login-password" className="login-pw mt-3">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="login-button mt-3" type="button" variant="dark" size="sm" onClick={handleSubmit}>Submit</Button>
        <Form.Group controlId="link-to-registration" className="register-here mt-3">
          <Form.Text>Haven't got an account yet.. </Form.Text>
          <Button className="link-to-registration-button mt-3" type="button" variant="dark" size="sm" onClick={showRegistrationView}>Register Here!!</Button>
        </Form.Group>


      </Form>
    </Container >
  );
}