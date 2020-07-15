import React from 'react';
import { Box, Text, Heading, Image, Button } from 'gestalt';
import { getToken, clearCart, clearToken } from '../utils';
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends React.Component {
	handelSignout = () => {
		//clear token
		clearToken();
		// clear cart
		clearCart();
		// redirect home
		this.props.history.push('/');
	};
	render() {
		return getToken() !== null ? <AuthNav handelSignout={this.handelSignout} /> : <UnAuthNav />;
	}
}

const AuthNav = ({ handelSignout }) => (
	<Box
		display='flex'
		alignItems='center'
		justifyContent='around'
		height={70}
		color='midnight'
		padding={1}
		shape='roundedBottom'
	>
		{/* Check out link */}
		<NavLink activeClassName='active' to='/signin'>
			<Text size='xl' color='white'>
				Sign In
			</Text>
		</NavLink>

		{/* Title and logo */}
		<NavLink activeClassName='active' to='/'>
			<Box display='flex' alignItems='center'>
				<Box margin={2} height={50} width={50}>
					<Image alt='BrewHaha Logo' naturalHeight={1} naturalWidth={1} src='./icons/logo.svg' />
				</Box>
				<Heading size='xs' color='orange'>
					BrewHaha
				</Heading>
			</Box>
		</NavLink>

		{/* Sign out Button */}
		<Button onClick={handelSignout} color='transparent' text='Sign Out' inline size='md' />
	</Box>
);

const UnAuthNav = () => (
	<Box
		display='flex'
		alignItems='center'
		justifyContent='around'
		height={70}
		color='midnight'
		padding={1}
		shape='roundedBottom'
	>
		{/* Sign in link */}
		<NavLink activeClassName='active' to='/signin'>
			<Text size='xl' color='white'>
				Sign In
			</Text>
		</NavLink>

		{/* Title and logo */}
		<NavLink activeClassName='active' to='/'>
			<Box display='flex' alignItems='center'>
				<Box margin={2} height={50} width={50}>
					<Image alt='BrewHaha Logo' naturalHeight={1} naturalWidth={1} src='./icons/logo.svg' />
				</Box>
				<Heading size='xs' color='orange'>
					BrewHaha
				</Heading>
			</Box>
		</NavLink>

		{/* Sign up link */}
		<NavLink activeClassName='active' to='/signup'>
			<Text size='xl' color='white'>
				Sign Up
			</Text>
		</NavLink>
	</Box>
);

export default withRouter(Navbar);
