import React, { useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';

function InputPrompt(props) {
	const { generateFunc, loading } = props;

	const [prompt, setPrompt] = useState('');
	const GenerateImage = () => {
		generateFunc(prompt);
	};
	return (
		<InputGroup className="input-prompt">
			<Form.Control
				placeholder="Input prompt here"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>
			<Button onClick={GenerateImage} className="d-flex align-items-center">
				{loading ? (
					<>
						<Spinner
							animation="border"
							variant="light"
							className="loading-spinner me-2"
						/>{' '}
						Generating...
					</>
				) : (
					'Generate'
				)}
			</Button>
		</InputGroup>
	);
}

export default InputPrompt;
