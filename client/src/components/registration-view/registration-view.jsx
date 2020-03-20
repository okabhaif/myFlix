import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export function RegistrationView(props) {
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [email, registerEmail] = useState('');
  const [DOB, registerDOB] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, DOB);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onRegistration(username);
  };

  return (
    <Container className="mx-auto" style={{ width: "80%" }}>
      <Form className='mt-5 registration-form'>
        <Form.Group controlId="registration-username">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="username" placeholder="Please enter 8 or more characters" value={email} onChange={e => registerUsername(e.target.value)} />
          <Form.Text className='text-muted'>
            Please note that special characters (e.g. # -) are not valid for this field.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="registration-password">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Please enter 8 or more characters" value={email} onChange={e => registerPassword(e.target.value)} />
          <Form.Text className='text-muted'>
            Please note that special characters (e.g. # -) are not valid for this field.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="registration-email">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder="Please enter your email address" value={email} onChange={e => registerEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="registration-DOB">
          <Form.Label>Date of birth: </Form.Label>
          <Form.Control type="DOB" placeholder="dd/mm/yyyy" value={email} onChange={e => registerDOB(e.target.value)} />
        </Form.Group>
        <Button type="button" variant="dark" size="sm" onClick={handleRegistration}>Submit</Button>
      </Form>
    </Container>
  );
}
