import express from 'express';

import fs from 'fs';
import path from 'path';

import { filterImageFromURL, deleteLocalFiles, isValidUrl } from './util/util';

(async () => {
	// Init the Express application
	const app = express();

	// Set the network port
	const port = process.env.PORT || 8082;

	// Use the body parser middleware for post requests
	app.use(express.json());

	// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
	// GET /filteredimage?image_url={{URL}}
	// endpoint to filter an image from a public url.
	// IT SHOULD
	app.get('/filteredimage', async (req, res) => {
		const image_url: string = req.query.image_url.toString();
		const valid_url: boolean = isValidUrl(image_url);
		if (!valid_url) {
			return res
				.status(422)
				.json({ message: 'Invalid URL' })
				.send('Invalid URL');
		} else {
			const image = await filterImageFromURL(image_url);

			res.sendFile(image);

			const directoryPath = path.join(__dirname, 'util/tmp');

			fs.readdir(directoryPath, async function (err, files) {
				const allFiles: string[] = [];
				files.forEach(function (file) {
					allFiles.push(directoryPath + '/' + file);
				});
				await deleteLocalFiles(allFiles);
			});
		}
	});

	// Root Endpoint
	// Displays a simple message to the user
	app.get('/', async (req, res) => {
		res.send('try GET /filteredimage?image_url={{}}');
	});

	// Start the Server
	app.listen(port, () => {
		console.log(`server running http://localhost:${port}`);
		console.log(`press CTRL+C to stop server`);
	});
})();
