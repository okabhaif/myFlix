import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'


export function UpdateDOBView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [DOB, setDOB] = useState('');

  const handleUpdate = (e) => {

    e.preventDefault();
    if (!username || !password || !DOB) {
      return alert('Please complete all fields.');
    }
    props.handleUpdateUser({ DOB });
    alert('Your DOB has been updated!');
  };



  return (
    <div>
      <h1 className="update-title" > Update DOB </h1>

      <Container className="mx-auto" style={{ width: "80%" }}>
        <Form className='mt-5 update-form' onSubmit={handleUpdate}>
          <Form.Group controlId="update-DOB-username">
            <Form.Label>Please enter your current username: </Form.Label>
            <Form.Control type="username" placeholder="username123" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-DOB-password">
            <Form.Label>Please enter your Password: </Form.Label>
            <Form.Control type="password" placeholder="Please enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="update-DOB">
            <Form.Label>Please enter your new DOB: </Form.Label>
            <Form.Control type="date" placeholder="dd/mm/yyyy" value={DOB} onChange={e => setDOB(e.target.value)} />

          </Form.Group>
          <Button type="button" variant="dark" size="sm" type="submit">Update DOB</Button>

        </Form>
      </Container>
    </div>
  );
}
