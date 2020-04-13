import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export function UpdateEmailView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');

  const handleUpdate = (e) => {

    e.preventDefault();
    if (!username || !password || !email || !checkEmail) {
      return alert('Please complete all fields.');
    }
    if (email !== checkEmail) {
      return alert('Please ensure your emails match');
    }
    props.handleUpdateUser({ email });
    alert('Your email address has been updated!');

  };



  return (
    <div>
      <h1 className="update-title" > Update email </h1>

      <Container className="mx-auto" style={{ width: "80%" }}>
        <Form className='mt-5 update-form' onSubmit={handleUpdate}>
          <Form.Group controlId="update-email-username">
            <Form.Label>Please enter your username: </Form.Label>
            <Form.Control type="username" placeholder="username123" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-email-password">
            <Form.Label>Please enter your old Password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter your old password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-email">
            <Form.Label>New Email: </Form.Label>
            <Form.Control type="email" placeholder="Please enter your new email address" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-email">
            <Form.Label>Confirm your new Email: </Form.Label>
            <Form.Control type="email" placeholder="Please confirm your new email address" value={checkEmail} onChange={e => setCheckEmail(e.target.value)} />
          </Form.Group>

          <Button type="button" variant="dark" size="sm" type="submit">Update Email</Button>

        </Form>
      </Container>
    </div>
  );
}
