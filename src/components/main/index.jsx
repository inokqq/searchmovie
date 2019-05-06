import React, { Component } from 'react';
import MoviePost from '../movie/movie'
import Input from '../input/input';
import Container from 'react-bootstrap/Container';
import Pagination from '../pagination/pagination';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';


const APIKEY = 'api_key=8d9f9cb5e5164028eea7c326bf26e6ee';
const BASE_PATH = 'https://api.themoviedb.org/3';
const SEARCH_PATH = 'search';
const MOVIE = 'movie';
const SEARCH_PARAM = 'query=';
const DISCOVER = 'discover';
const MOST_POPULAR = 'sort_by=popularity.desc';
const PAGE_PARAM = 'page=';


class Movie extends Component {

	state = {
		searchQuery: '',
		result: {},
		page: 1,
	}


	componentDidMount() {
		this.fetchPopular(this.state.page)
	}

	fetchPopular = (page) => {
		fetch(`${BASE_PATH}/${DISCOVER}/${MOVIE}?${APIKEY}&${MOST_POPULAR}&${PAGE_PARAM}${page}`)
			.then(res => res.json())
			.then(result => {
				this.setMovies(result)
				this.props.saveData(result.results)
			})
			.catch(error => error);
	}

	fetchData = (searchQuery, page) => {
		fetch(`${BASE_PATH}/${SEARCH_PATH}/${MOVIE}?${APIKEY}&${PAGE_PARAM}${page}&${SEARCH_PARAM}${searchQuery}`)
			.then(res => res.json())
			.then(result => {
				this.setMovies(result)
				this.props.saveData(result.results)

			})
			.catch(error => error);
	}

	handleInputChange = ({ target: { value } }) => {
		this.setState({
			searchQuery: value
		})
	}

	getSearch = ({ key }) => {
		if(key === 'Enter') {
			const { searchQuery } = this.state;
			if(searchQuery.length) {
				this.setState({
					page: 1,
				});
				this.fetchData(searchQuery);
			}
		}
	}

	setMovies = result => {
		this.setState({ result });
	}

	handlePageChange = ({ target }) => {
		const btnType = target.getAttribute('data-name');
		let { page } = this.state;

		if(!isNaN(btnType)) {
			this.updatePage(+btnType);
		} else {
			switch (btnType) {
				case 'next':
					this.updatePage(page + 1);
					break;
				case 'prev':
					this.updatePage(page - 1);
					break;
			}
		}
	}

	updatePage = (number) => {
		const { searchQuery } = this.state;
		this.setState({
			page: number,
		}, () => {
			if(searchQuery.length) {
				this.fetchData(searchQuery, number);
			} else {
				this.fetchPopular(number)
			}
		})
	}

	render() {
		const { searchQuery, result } = this.state;
		const { results = [], page, total_pages } = result;

		return (
			<div>
				<Container>
					<Input onKeyUp={this.getSearch} onChange={this.handleInputChange} value={searchQuery} />
					<Pagination
						onClick={this.handlePageChange}
						page={page}
						lastPage={total_pages}
					/>
					{results.map(({ title, overview, poster_path, id }) =>
						<MoviePost
							key={id}
							id={id}
							title={title}
							overview={overview}
							poster_path={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						/>
					)}
					<MoviePost />
				</Container>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		movieList: state
	}
}

function mapDispatchToProps(dispatch) {
	return {
		saveData: (data) =>
			dispatch({
				type: 'SAVE_DATA',
				payload: data,
			})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);