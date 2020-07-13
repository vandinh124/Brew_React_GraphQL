import React, { Component } from 'react';
import './App.css';
// prettier-ignore
import { Box, Container, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import Loader from './Loader';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
	state = {
		brands: [],
		searchTerm: '',
		loadingBrands: true
	};
	async componentDidMount() {
		try {
			const response = await strapi.request('POST', '/graphql', {
				data: {
					query: `query {
						brands {
						  _id
						  name
						  description
						  image {
							url
							name
						  }
						}
					  }`
				}
			});
			this.setState({ brands: response.data.brands, loadingBrands: false });
		} catch (err) {
			console.log(err);
			this.setState({ loadingBrands: false });
		}
	}

	handleChange = ({ value }) => {
		this.setState({ searchTerm: value });
	};

	filteredBrands = ({ searchTerm, brands }) => {
		return brands.filter((brand) => {
			return (
				brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				brand.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	};
	render() {
		const { searchTerm, loadingBrands } = this.state;
		return (
			<Container>
				{/* Brands search Filed */}
				<Box display='flex' justifyContent='center' marginTop={4}>
					<SearchField
						id='searchField'
						accessibilityLabel='Brands search Field'
						onChange={this.handleChange}
						value={searchTerm}
						placeholder='Search Brands'
					/>
					<Box margin={2}>
						<Icon
							icon='filter'
							color={searchTerm ? 'orange' : 'gray'}
							size={20}
							accessibilityLabel='Filter'
						/>
					</Box>
				</Box>

				{/* Brands sections */}
				<Box display='flex' justifyContent='center' marginBottom={2}>
					{/* Brands Header */}
					<Heading color='midnight' size='md'>
						Brew Brands
					</Heading>
				</Box>
				{/* Brands */}
				<Box
					dangerouslySetInlineStyle={{
						__style: {
							backgroundColor: '#d6c8ec'
						}
					}}
					shape='rounded'
					wrap
					display='flex'
					justifyContent='around'
				>
					{this.filteredBrands(this.state).map((brand) => (
						<Box paddingY={4} width={200} key={brand._id}>
							<Card
								image={
									<Box margin={2} height={200} width={200}>
										<Image
											fit='cover'
											alt='Brand'
											naturalHeight={1}
											naturalWidth={1}
											src={`${apiUrl}${brand.image[0].url}`}
										/>
									</Box>
								}
							>
								<Box display='flex' alignItems='center' justifyContent='center' direction='column'>
									<Text bold size='xl'>
										{brand.name}
									</Text>
									<Text>{brand.description}</Text>
									<Text bold size='xl'>
										<Link to={'/${brand._id'}>See Brews</Link>
									</Text>
								</Box>
							</Card>
						</Box>
					))}
				</Box>
				{/* <Spinner show={loadingBrands} accessibilityLabel='Loading Spinner' /> */}
				<Loader show={loadingBrands} />
			</Container>
		);
	}
}

export default App;
