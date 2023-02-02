import React from 'react';
import { Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ImagesGenerated from './ImagesGenerated';
import InputPrompt from './inputPrompt';

import { imageGenerateRequest } from '../../redux/GenerateImage/action';

function GenerationPage(props) {
	const { images, generateImageRequest } = props;

	const GenerateImage = (prompt) => {
		generateImageRequest({ prompt });
	};
	return (
		<Container className="mt-5">
			<InputPrompt generateFunc={GenerateImage} loading={images.loading} />
			<ImagesGenerated
				className="mt-5"
				images={images.data}
				loading={images.loading}
			/>
		</Container>
	);
}

GenerationPage.prototype = {
	images: PropTypes.array,
};

function mapStateToProps(state) {
	return {
		images: state.images,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// getBooks: () => dispatch(bookPageInit()),
		generateImageRequest: (data) => dispatch(imageGenerateRequest(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerationPage);
