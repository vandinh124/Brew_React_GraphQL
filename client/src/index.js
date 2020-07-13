import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import 'gestalt/dist/gestalt.css';

const Root = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Switch>
				<Route component={App} exact path='/' />
				<Route component={Signin} path='/signin' />
				<Route component={Signup} path='/signup' />
				<Route component={Checkout} path='/checkout' />
			</Switch>
		</Fragment>
	</Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
