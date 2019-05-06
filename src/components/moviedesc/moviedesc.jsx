import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './moviedesc.css';

class MovieDesc extends Component {

	state = {
		movieOverview: '',
		movieTitle: '',
	}

	componentDidMount() {
		for (let i = 0; i < this.props.movieList.posts.posts.length; i++) {
			if (this.props.movieList.posts.posts[i].id == this.props.location.pathname.slice(1)) {
				this.setDesc(this.props.movieList.posts.posts[i].overview);
				this.setTitle(this.props.movieList.posts.posts[i].title);
			}
		}
	}

	setTitle = movieTitle => {
		this.setState({ movieTitle });
	}

	setDesc = movieOverview => {
		this.setState({ movieOverview });
	}

	render() {
		const { movieOverview, movieTitle } = this.state;
		return (
			<div className="ov">
				<Container>
					<Row>
						<Col>
							<div className="overview__wrapper">
								<span className="m-title">{movieTitle}</span>
								<p className="overview">
									{movieOverview}
								</p>
							</div>
						</Col>
					</Row>
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

export default connect(mapStateToProps)(MovieDesc);