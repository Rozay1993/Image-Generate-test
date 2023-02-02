import {
	GENERATE_IMAGE_REQUEST,
	GENERATE_IMAGE_SUCCESS,
	GENERATE_IMAGE_ERROR,
} from './constant';

export const initialState = {
	loading: false,
	successful: false,
	data: [],
	errors: {},
	messages: [],
};

export default function GenerateImageReducer(state = initialState, actions) {
	switch (actions.type) {
		case GENERATE_IMAGE_REQUEST:
			return { ...state, loading: true, errors: {} };
		case GENERATE_IMAGE_SUCCESS:
			return {
				...state,
				loading: false,
				successful: true,
				data: [...actions.payload.images],
			};
		case GENERATE_IMAGE_ERROR:
			return {
				...state,
				loading: false,
				successful: false,
				errors: { ...actions.error },
			};
		default:
			return state;
	}
}
