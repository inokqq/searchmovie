import React from 'react';

import './pagination.css';

const renderPaginationBtns = (onClick, page, lastPage) => {
	let btnsArr = [page];

	return btnsArr.map((num, index) => {
		return num === '...' ?
			num :
			<button
				key={num + index}
				onClick={onClick}
				data-name={num}
				className={num === page ? 'active' : ''}
			>{num}</button>
	});
};

const Pagination = ({ onClick, page, lastPage }) => (
	<div className="pagination__wrapper">
		{ page !== 1 && <button onClick={onClick} data-name="prev">{'<<'}</button> }
		{renderPaginationBtns(onClick, page, lastPage)}
		{ page !== lastPage && <button onClick={onClick} data-name="next">{'>>'}</button> }
	</div>
);

export default Pagination;