const defaultState = {
	posts: null
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'SAVE_DATA':
			return {
				...state,
				posts: action.payload
			};
		default:
			return state;
	}
}