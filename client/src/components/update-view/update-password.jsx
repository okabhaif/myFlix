import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export function UpdatePasswordView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = (e) => {

    e.preventDefault();
    if (!username || !password || !newPassword || !confirmPassword) {
      return alert('Please complete all fields.');
    }
    if (newPassword !== confirmPassword) {
      return alert('Please check that your new passwords match');
    }
    props.handleUpdateUser({ password: newPassword });
    alert('Your password has been updated!');

  };



  return (
    <div>
      <h1 className="update-title" > Update Password </h1>

      <Container className="mx-auto" style={{ width: "80%" }}>
        <Form className='mt-5 update-form' onSubmit={handleUpdate}>
          <Form.Group controlId="update-password-username">
            <Form.Label>Please enter your username: </Form.Label>
            <Form.Control type="username" placeholder="username123" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-password">
            <Form.Label>Please enter your old Password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter your old password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-password">
            <Form.Label>Please enter your new password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter 8 or more characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <Form.Text className='text-muted'>
              Please note that special characters (e.g. # -) are not valid for this field.
          </Form.Text>
          </Form.Group>
          <Form.Group controlId="update-password">
            <Form.Label>Confirm your new password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter 8 or more characters" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Button type="button" variant="dark" size="sm" type="submit">Update Password</Button>

        </Form>
      </Container>
    </div>
  );
}
