import React from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import cs from 'classnames';
import { Link } from 'react-router-dom';

function HeaderComponent(props) {
	return (
		<Navbar className={cs('header', {})} bg="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home" className={cs('text-white')}>
					Iconify
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="text-white"
				/>
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="">
						<Nav.Item className="d-flex align-items-center px-2">
							<Link className={cs('text-white text-under')} to="/home">
								Home
							</Link>
						</Nav.Item>
						<Nav.Item className="d-flex align-items-center px-2">
							<Link to="/generate" className={cs('text-white')}>
								Generate
							</Link>
						</Nav.Item>
						<NavDropdown title={'User'} id="basic-nav-dropdown" align={'end'}>
							<NavDropdown.Item href="#action/3.1">
								Generate Icon
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Reset Password
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HeaderComponent;
