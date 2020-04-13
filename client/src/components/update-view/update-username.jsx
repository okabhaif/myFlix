import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export function UpdateUsernameView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newUsername, setNewUsername] = useState('');

  const handleUpdate = (e) => {

    e.preventDefault();
    if (!username || !newUsername || !password) {
      return alert('Please complete all fields.');
    }
    if (username === newUsername) {
      return alert('Please check you have entered a new username.');
    }
    props.handleUpdateUser({ username: newUsername });
    alert('Your username has been updated!');
  };



  return (
    <div>
      <h1 className="update-title" > Update Username </h1>

      <Container className="mx-auto" style={{ width: "80%" }}>
        <Form className='mt-5 update-form' onSubmit={handleUpdate}>
          <Form.Group controlId="update-username">
            <Form.Label>Please enter your current username: </Form.Label>
            <Form.Control type="username" placeholder="username123" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-username-password">
            <Form.Label>Please enter your Password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-username">
            <Form.Label>Please enter your new username: </Form.Label>
            <Form.Control type="username" placeholder="Please enter 8 or more characters" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
            <Form.Text className='text-muted'>
              Please note that special characters (e.g. # -) are not valid for this field.
          </Form.Text>
          </Form.Group>
          <Button type="button" variant="dark" size="sm" type="submit">Update Username</Button>

        </Form>
      </Container>
    </div>
  );
}
