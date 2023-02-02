import React from 'react';

import { Provider } from 'react-redux';

import store from './redux/store';
import MainRouter from './routes/routes';

import './assets/css/main.scss';

function App() {
	return (
		<Provider store={store}>
			<MainRouter />
		</Provider>
	);
}

export default App;
