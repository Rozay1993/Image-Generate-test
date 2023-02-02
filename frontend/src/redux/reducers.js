import { combineReducers } from 'redux';
import imagesReducer from './GenerateImage/reducer';

export const mainReducer = combineReducers({
	images: imagesReducer,
});
