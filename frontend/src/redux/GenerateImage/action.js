import {
	GENERATE_IMAGE_REQUEST,
	GENERATE_IMAGE_SUCCESS,
	GENERATE_IMAGE_ERROR,
} from './constant';

export function imageGenerateRequest(payload) {
	return {
		type: GENERATE_IMAGE_REQUEST,
		payload,
	};
}

export function imageGenerateSuccess(payload) {
	return {
		type: GENERATE_IMAGE_SUCCESS,
		payload,
	};
}

export function imageGenerateError(error) {
	return {
		type: GENERATE_IMAGE_ERROR,
		error,
	};
}
