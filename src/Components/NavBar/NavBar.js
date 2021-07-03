import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import './NavBar.css'
const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar className="container" collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Navbar.Brand><NavLink className="link-style" to="/home">Mattay Ni</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link><NavLink className="text-light mr-3" to="/home">Au Mati</NavLink></Nav.Link>
                </Nav>
                {
                    !loggedInUser.isSignedIn ? <Link to="/login"><button className="btn btn-warning">Login</button></Link> : <p style={{ color: 'cyan', marginTop: '8px', fontWeight: 'bold' }}>{loggedInUser.name}</p>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;