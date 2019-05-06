import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import MovieDesc from "./components/moviedesc/moviedesc";
import Movie from './components/main/index'

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Switch>
					<Route exact path='/' component={Movie} />
					<Route path='/:id' component={MovieDesc} />
				</Switch>
			</App>
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));
serviceWorker.unregister();