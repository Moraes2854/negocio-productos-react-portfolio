import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { useAuth } from '../../../auth/context/AuthContext';

export const CustomNavbarxd = () => {
  const { user, openModal, logout } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent:'space-between'}}>

            <Navbar.Brand style={{paddingLeft:'1.5vw'}}>Negocio</Navbar.Brand>
            <Nav style={{paddingRight:'1.5vw'}}>

            {
              (user) 
              ? (
                <>
                  <Navbar.Text>
                    {user.fullName}
                  </Navbar.Text>
                  <Button className="ms-4" variant='danger' size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) 
              : (
                <>
                  <Button size="sm" onClick={openModal}>
                    Login
                  </Button>
                </>
              )
            }

            </Nav>
        </Navbar.Collapse>

    </Navbar>
  );
}

export const CustomNavbar = () => {
  const { user, openModal, logout } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container style={{justifyContent:'space-between', marginRight:'1.5vw', marginLeft:'1.5vw', maxWidth:'100%'}}>
        <Navbar.Brand>Negocio</Navbar.Brand>
        <Nav >
          {
              (user) 
              ? (
                <>
                  <Navbar.Text>
                    {user.fullName}
                  </Navbar.Text>
                  <Button className="ms-4" variant='danger' size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) 
              : (
                <>
                  <Button size="sm" onClick={openModal}>
                    Login
                  </Button>
                </>
              )
            }
        </Nav>
      </Container>
    </Navbar>
  )
}