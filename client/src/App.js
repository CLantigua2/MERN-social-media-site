import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<Route exact path="/" component={Landing} />
				<div className="container">
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/dashboard" component={Dashboard} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
