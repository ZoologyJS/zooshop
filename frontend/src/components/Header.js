// If you want to call an action: useDispatch
// If you want to bring something in: useSelector
// If you don't know who to call, Ghostbusters!

import React from "react";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { Image, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";


const Header = () => {
    const dispatch = useDispatch();

    // Grabbing login info from global Redux state/store
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(userInfo.name)
    // userInfo.name = userInfo.name.indexOf(" ") !== -1 ? userInfo.name.split(" ")[0] : userInfo.name;

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar style={{height:"70px"}} bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Image className="sneaks mr-2" src={require("../sneakers.png")}></Image>
                    <LinkContainer className="ml-2" to="/">
                        <Navbar.Brand>Zoo's Shoes</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                        { userInfo ? (
                            <NavDropdown title={userInfo.name.split(" ")[0]} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        <i className="fas fa-user-cog"></i> Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i className="fas fa-sign-out-alt"></i> &nbsp;Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i> Login
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
