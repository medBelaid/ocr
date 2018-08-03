import { version } from '../../package.json';
import { Router } from 'express';
import ocrs from './ocrs';

export default ({ config, db }) => {
	let api = Router();

	// mount the ocr data resource
	api.use('/ocrs', ocrs({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
