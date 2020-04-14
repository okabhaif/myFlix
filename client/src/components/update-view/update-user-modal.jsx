import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function UpdateUserModal({ inputType, inputName, inputPlaceholder, onSubmit, initialValue, show, closeModal }) {
  const [data, setData] = useState(initialValue);
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      field: inputName,
      value: data
    });
  }

  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={closeModal}>
        <Modal.Title id="update-un-title">
          Update {inputName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='mt-5 update-form' onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Label>Please set {inputName}: </Form.Label>
            <Form.Control type={inputType} placeholder={inputPlaceholder} initialValue={initialValue} onChange={e => setData(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={closeModal}>Close</Button>
        <Button variant="dark" onClick={handleSubmit}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}
