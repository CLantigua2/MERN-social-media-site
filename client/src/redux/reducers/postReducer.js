import { GET_POSTS, GET_POST, ADD_POST, DELETE_POST } from '../actions/types.js';

const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload
			};

		default:
			return state;
	}
}
