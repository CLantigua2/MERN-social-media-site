import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import PrivateRoute from './components/common/PrivateRoute';
import AddExpreience from './components/add-credentials/AddExperience';
import AddEducatation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
					<Route exact path="/profiles" component={Profiles} />
					<Route exact path="/profile/:handle" component={Profile} />
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/create-profile" component={CreateProfile} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/edit-profile" component={EditProfile} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/add-experience" component={AddExpreience} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/add-education" component={AddEducatation} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/feed" component={Posts} />
					</Switch>
					<Switch>
						<PrivateRoute exact path="/post/:id" component={Post} />
					</Switch>
					<Route exact path="/not-found" component={NotFound} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
