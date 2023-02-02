const openai = require('../services/openai');
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const randomString = require('randomstring');

const CreateImage = async (req, res) => {
	const prompt = req.body.prompt;
	const imageCount = 2;
	const response = await openai.createImage({
		prompt: prompt,
		n: imageCount,
		size: '256x256',
	});

	let files = [];
	response.data.data.forEach(async (image, index, urls) => {
		SaveImages(image)
			.then((url) => {
				files.push(url);
				console.log(files, '___1');
				if (index === urls.length - 1) {
					console.log(files, '___2');
					res.json({
						images: files,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

const SaveImages = async (image) => {
	const url = image.url;
	const fileName = randomString.generate(15) + '.png';

	const path = Path.resolve('./public/images/', fileName);
	const writer = Fs.createWriteStream(path);

	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream',
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('drain', resolve(fileName));
		writer.on('error', reject);
	});
};

module.exports = CreateImage;
