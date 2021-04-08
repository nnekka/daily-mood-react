import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Image, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../../actions/authActions'


const Header = () => {

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const {user} = auth

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <LinkContainer to='/'><Navbar.Brand>
                    <i className="fas fa-cloud-sun"></i> Daily Mood
                </Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {
                            user.name

                                ? <>
                                    <LinkContainer to='/dashboard'>
                                        <Nav.Link>
                                            Мои календари
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/create-calendar'>
                                        <Nav.Link>
                                            Создать календарь
                                        </Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title={user.name}>
                                        <LinkContainer to={`/user/${user._id}`}>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                                    </NavDropdown>

                                </>
                                : <>
                                    <LinkContainer to='/login'><Nav.Link>Sign in</Nav.Link></LinkContainer>
                                    <LinkContainer to='/register'><Nav.Link>Sign up</Nav.Link></LinkContainer>
                                </>
                        }
                    </Nav>

                </Navbar.Collapse>
                <Nav.Link><Image src={`http://localhost:3333/${user.avatar}`} alt='avatar' width='70px' height='50px'/></Nav.Link>
            </Navbar>

        </header>
    )
}

export default Header