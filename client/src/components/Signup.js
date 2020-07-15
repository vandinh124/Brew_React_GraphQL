import React, { Component } from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

export default class Signup extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		toast: false,
		toastMessage: '',
		loading: false
	};
	handleChange = ({ event, value }) => {
		event.persist();
		this.setState({ [event.target.name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const { username, email, password } = this.state;
		if (this.isformEmpty(this.state)) {
			this.showToast('Fill in all fields');
			return;
		}
		//sign up user
		try {
			// set loading true
			this.setState({ loading: true });
			//make request to register user with strapi
			const response = await strapi.register(username, email, password);
			//set loading false
			this.setState({ loading: false });
			//put token (to manage user session) in local storage
			setToken(response.jwt);
			//redirect user to home page
			console.log(response);
			this.redirectUser('/');
		} catch (err) {
			// set loading false
			this.setState({ loading: false });
			//show error message with toast message
			this.showToast(err.message);
		}
	};

	redirectUser = (path) => this.props.history.push(path);

	isformEmpty = ({ username, email, password }) => {
		return !username || !email || !password;
	};

	showToast = (toastMessage) => {
		this.setState({ toast: true, toastMessage });
		setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
	};
	render() {
		const { toastMessage, toast, loading } = this.state;
		return (
			<Container>
				<Box
					dangerouslySetInlineStyle={{
						__style: {
							backgroundColor: '#ebe2da'
						}
					}}
					margin={4}
					padding={4}
					shape='rounded'
					display='flex'
					justifyContent='center'
				>
					{/* Sign Up form */}
					<form
						style={{
							display: 'inlineBlock',
							textAlign: 'center',
							maxWidth: 450
						}}
						onSubmit={this.handleSubmit}
					>
						<Box marginBottom={2} display='flex' direction='column' alignItems='center'>
							<Heading color='midnight'>Let's Get Started</Heading>
							<Text italic color='orchid'>
								Sign up to order some brews!
							</Text>
						</Box>
						{/* User Input */}
						<TextField
							id='username'
							type='text'
							name='username'
							placeholder='Username'
							onChange={this.handleChange}
						/>
						{/* Email Input */}
						<TextField
							id='email'
							type='text'
							name='email'
							placeholder='Email Address'
							onChange={this.handleChange}
						/>
						{/* Password Input */}
						<TextField
							id='password'
							type='text'
							name='password'
							placeholder='Password'
							onChange={this.handleChange}
						/>
						<Button inline disabled={loading} color='blue' text='Submit' type='submit' />
					</form>
				</Box>
				<ToastMessage show={toast} message={toastMessage} />
			</Container>
		);
	}
}
