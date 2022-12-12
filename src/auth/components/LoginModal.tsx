import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useLoading } from '../../common/context/LoadingContext';
import { useAuth } from '../context/AuthContext';
import { useLoginModal } from '../hooks/useLoginModal';

export const LoginModal:FC = () => {
  const { isLoginModalOpen, closeModal, login } = useAuth();
  const { loginForm, handleFormChange } = useLoginModal();
  const { loading } = useLoading();

  const { email, password } = loginForm;

  return (
      <Modal 
        show={isLoginModalOpen} 
        onHide={closeModal} 
        style={{
          display:"flex"
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                name="password"
                value={password}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{justifyContent:'center'}}>
          <Button variant="primary" onClick={()=>login(email, password)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

