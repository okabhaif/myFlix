import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export function DeregistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDeregistration = (e) => {

    e.preventDefault();
    if (!username || !password) {
      return alert('Please complete all fields.');
    }
    props.deleteUser({ username, password });
    alert('Your account has been successfully deleted.');
  };



  return (
    <div>
      <h1 className="update-title" > Unregister Here </h1>

      <Container className="mx-auto" style={{ width: "80%" }}>
        <Form className='mt-5 deregistration-form' onSubmit={handleDeregistration}>
          <Form.Group controlId="deregistration-username">
            <Form.Label>Please enter your current username: </Form.Label>
            <Form.Control type="username" placeholder="username123" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="deregistration-password">
            <Form.Label>Please enter your Password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button type="button" variant="dark" size="sm" type="submit">Unregister</Button>

        </Form>
      </Container>
    </div>
  );
}
