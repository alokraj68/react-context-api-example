import React, { useState, useContext, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from './Spinner';
import authContext from '../store';
import attemptLogin from '../auth/fakeAuth';

const LoginForm = () => {
	const [ loading, setLoading ] = useState(false);
	const [ formData, setFormData ] = useState({
		username: '',
		password: ''
	});
	const [ { isLoggedIn, error }, dispatch ] = useContext(authContext);

	function onSubmit(event) {
		event.preventDefault();
		setLoading(true);
		attemptLogin(formData)
			.then((username) => {
				dispatch({
					type: 'LOGIN',
					payload: {
						username
					}
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOGIN_ERROR',
					payload: {
						error
					}
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function onChange(event) {
		const { name, value } = event.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	}

	//ES 6 ...formData - It's called spread attributes and its aim is to make the passing of props easier.

	// Let us imagine that you have a component that accepts N number of properties. Passing these down can be tedious and unwieldy if the number grows.

	// Thus instead you do this, wrap them up in an object and use the spread notation

	return (
		<Fragment>
			{isLoggedIn ? (
				<Redirect to="/" />
			) : (
				<Fragment>
					<Link to="/">Back to home</Link>
					{error && <p className="error">{error}</p>}
					<form onSubmit={onSubmit}>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={onChange}
							placeholder="Username"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={onChange}
						/>
						<button type="submit" disabled={loading}>
							{!!loading && <Spinner width="15px" />}
							<span>{!!loading ? 'Please wait' : 'Log In'}</span>
						</button>
					</form>
				</Fragment>
			)}
		</Fragment>
	);
};

export default LoginForm;
