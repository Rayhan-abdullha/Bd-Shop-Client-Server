import { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../../App';
import './Navigation.css'


const Navigation = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header text-center">
            <Navbar className="container" expand="lg">
                <Navbar.Brand href="/home">BD SHOP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="mr-4 text-dark" href="/home">Home</Nav.Link>
                        <Nav.Link className="mr-4 text-dark" href="/orders">Orders</Nav.Link>
                        <Nav.Link className="mr-4 text-dark" href="/admin">Admin</Nav.Link>
                        <Nav.Link className="mr-4 text-dark" href="/home">Deals</Nav.Link>
                        <>
                            <span>{loggedInUser.displayName}</span>
                        </>
                    </Nav>
                    <Button className="loginBtn" href="/login" variant="outline-warning text-dark">Log in</Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;