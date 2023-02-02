import { put, all, call, takeLatest } from 'redux-saga/effects';
import { request } from '../../helpers/request';
import * as urls from '../../helpers/urls';
// import { browserRedirect } from '../../helpers/helpers';
import _ from 'lodash';

import {
	GENERATE_IMAGE_REQUEST,
	// GENERATE_IMAGE_SUCCESS,
	// GENERATE_IMAGE_ERROR,
} from './constant';

import {
	// imageGenerateRequest,
	imageGenerateSuccess,
	imageGenerateError,
} from './action';

function imageGenerateCall(data) {
	return request('post', urls.ImageGenerate, data);
}

function* imageGenerateWorker({ payload }) {
	try {
		const response = yield call(imageGenerateCall, payload);
		yield put(imageGenerateSuccess(response.data));
	} catch (err) {
		yield put(
			imageGenerateError(_.has(err, 'response.data') ? err.response.data : err)
		);
	}
}

export default function* imageGenerateSaga() {
	yield all([takeLatest(GENERATE_IMAGE_REQUEST, imageGenerateWorker)]);
}
