import { version } from '../../package.json';
import { Router } from 'express';
import ocrs from './ocrs';
import ocrs1 from './ocrs.1';

export default ({ config, db }) => {
	let api = Router();

	// mount the ocr data resource
	api.use('/ocrs1', ocrs({ config, db }));
	api.use('/ocrs2', ocrs1({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
