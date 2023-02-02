const express = require('express');
const router = express.Router();

// ** Import Routers
// const authRoute = require('./auth.router')
// const usersRoute = require('./users.router')
// const profileRoute = require('./profile.router')
// const contractorsRoute = require('./contractors.router')
// const brokersRoute = require('./brokers.router')
// const trucksRoute = require('./trucks.router')
// const driversRoute = require('./drivers.router')
const generateImageRoute = require('./generateImage.router');

const defaultRoutes = [
	// {
	//   path: "/auth",
	//   route: authRoute,
	// },
	// {
	//   path: "/users",
	//   route: usersRoute,
	// },
	// {
	//   path: "/profile",
	//   route: profileRoute,
	// },
	// {
	//   path: "/contractors",
	//   route: contractorsRoute,
	// },
	// {
	//   path: "/brokers",
	//   route: brokersRoute,
	// },
	// {
	//   path: "/trucks",
	//   route: trucksRoute,
	// },
	// {
	//   path: "/drivers",
	//   route: driversRoute,
	// },
	{
		path: '/generateimage',
		route: generateImageRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
