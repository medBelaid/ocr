import resource from 'resource-router-middleware';
import Tesseract from 'tesseract.js';

export default () => resource({
	/** GET / - List all ocr Data */
	index({ params }, res) {
		Tesseract.recognize('src/images/nf1.jpg', {
			lang: 'fra'
		})
		.then(function (ocrData) {
			res.json(ocrData.text);
		})
		.catch(function (error) {
			console.log('error:', error);
		});
	},
});
