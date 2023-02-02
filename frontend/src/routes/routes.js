import * as React from 'react';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import HomePage from '../contents/Home';
import Generation from '../contents/Generation';
import Header from '../contents/Header';

export default function Routers() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/generate" element={<Generation />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

function Layout() {
	return (
		<>
			<Header />
			<Container className="mt-5">
				<Outlet />
			</Container>
		</>
	);
}
