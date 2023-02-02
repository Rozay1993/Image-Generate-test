import { all } from 'redux-saga/effects';
import generateImage from './GenerateImage/saga';

export function* mainSaga() {
	yield all([generateImage()]);
}
