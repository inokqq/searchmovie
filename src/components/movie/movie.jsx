import React from 'react';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie.css'

const MoviePost = ({ title, overview, poster_path, id }) => (
	<Row className="movie-card">
		<Col xs={12}>
			<div className="movie-card__wrapper">
				<Link to={`/${id}`}><img src={poster_path} alt=""/></Link>
				<div className="movie-info">
					<div>
						<span className="movie-title">{title}</span>
						<p className="movie-description">{overview}</p>
					</div>
					<div>
						<Link to={`/${id}`}><button className="movie-info__btn">more info</button></Link>
					</div>
				</div>
			</div>
		</Col>
	</Row>
);

export default MoviePost;