import resource from 'resource-router-middleware';
import Tesseract from 'tesseract.js';

export const OcrTest = (nums) => {
	return nums;
}
export default () => resource({
	/** GET / - List all ocr Data */
	index({ params }, res) {
		Tesseract.recognize('src/images/nf1.jpg', {
			lang: 'fra'
		})
		.then(function (ocrData) {
			const regDate = /((0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d)/;
			const regDecimalWithCurrency = /\$?(([1-9]\d{0,2}(,\d{3})*)|0)?[\,\.]{1}\d{1,2}\s.{1}/;
			const regDecimal = /\$?(([1-9]\d{0,2}(,\d{3})*)|0)?[\,\.]{1}\d{1,2}/;
			const regCurrency = /E|€|\$|£/;
			const data = ocrData.text.split('\n');
			const prices = [];
			let date;
			let currency;
			data.forEach((elem) => {
				if (regDate.test(elem)) {
					elem.match(regDate);
					date = elem.match(regDate)[0];
				}
				if (regDecimal.test(elem) && (elem.includes('payer') || elem.includes('TVA'))) {
					elem.match(regDecimal);
					if (elem.match(regDecimal)[0] != 0) {
						prices.push(elem.match(regDecimalWithCurrency)[0].replace(',', '.'));
					}
				}
				if (regCurrency.test(elem)) {
					currency = elem.match(regCurrency)[0] === 'E' ? '€' : elem.match(regCurrency)[0];
				}
			});
			res.json({
				Total: Math.max(...prices.map(price => parseFloat(price.match(regDecimal)[0]))),
				Tva: Math.min(...prices.map(price => parseFloat(price.match(regDecimal)[0]))),
				date,
				currency
			});
		})
		.catch(function (error) {
			console.log('error:', error);
		});
	},
});
