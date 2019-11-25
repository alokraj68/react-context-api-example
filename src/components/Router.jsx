import React from 'react';
import '../App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './Hello';
import LoginForm from './LoginForm';

export default () => (
	<section id="main">
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={LoginForm} />
				{/* exact lets you render only that route but not the parent route */}
			</Switch>
		</Router>
	</section>
);
