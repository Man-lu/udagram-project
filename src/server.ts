import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, isValidUrl } from './util/util';

(async () => {
	// Init the Express application
	const app = express();

	// Set the network port
	const port = process.env.PORT || 8082;

	// Use the body parser middleware for post requests
	app.use(bodyParser.json());

	// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
	// GET /filteredimage?image_url={{URL}}
	// endpoint to filter an image from a public url.
	// IT SHOULD
	app.get('/filteredimage', async (req, res) => {
		const image_url = req.query.image_url;
		const valid_url = isValidUrl(image_url);
		if (!isValidUrl) res.send('invalid url');

		console.log('valid');

		// const image = await filterImageFromURL(
		// 	'https://cdn.soccerladuma.co.za/cms2/image_manager/uploads/News/659137/7/1563185725_07b1c.jpg',
		// );

		// res.sendFile(image);
		console.log(req.url);
		res.send(image_url);
	});
	//    1
	//    1. validate the image_url query
	//    2. call filterImageFromURL(image_url) to filter the image
	//    3. send the resulting file in the response
	//    4. deletes any files on the server on finish of the response
	// QUERY PARAMATERS
	//    image_url: URL of a publicly accessible image
	// RETURNS
	//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

	/**************************************************************************** */

	//! END @TODO1

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
