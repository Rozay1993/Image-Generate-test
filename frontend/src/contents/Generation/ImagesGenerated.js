import React from 'react';

import cs from 'classnames';
import ImageComponent from '../../components/imageComponent';

function ImagesGenerated(props) {
	const { loading, images, className } = props;
	return (
		<div className={className + cs(' d-flex justify-content-evenly flex-wrap')}>
			{loading
				? null
				: images.map((image) => {
						return <ImageComponent className="" imageURL={image} key={image} />;
				  })}
		</div>
	);
}

export default ImagesGenerated;
