import React from 'react';
import { Image } from 'react-bootstrap';
const imageUrlPrefix = process.env.REACT_APP_IMAGE_URL;

function ImageComponent(props) {
	const { className, imageURL } = props;
	return (
		<div className={className + ' border border-primary border-2'}>
			<Image src={imageUrlPrefix + imageURL} className="one-image-generated" />
		</div>
	);
}

export default ImageComponent;
