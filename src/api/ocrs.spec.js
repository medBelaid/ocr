'use strict'
const OcrTest = (nums) => {
  return nums;
}

const str = "SAJ AL REEF ‘-\n38 AVENUE DE MARCEAU\n92400 COURBEVOIE\n01 47 09 03 64\nCommande N° Du 25/07/2018 A 13:01\n: : A EMPORTER : *\n{}T pmuuns PRIX\n2 REPAS 31 .00 E\nmm EURO 31.00 E\n, , HÏ : 28.9l E\nTVA 10 x = 2.89 E\nMERCI POUR VU1RE 1:11MMAN01 — A …un…\n\" ,,\n\n";
const str2 = "Les Dunes Se1f\n01/08/2018 12 42 14\nTPV DoubleRampe VM Socîété: 30_ Ÿ\nService: DUNE5 Badge : 859947 %!\nTicket: 109 Tarif: GROUPE SG ‘\n1 Wok Asia 3,61 €\n1 Fruit‘bar petit bodega 1,39 €\n10ta1 prestations 5,00 €\n1 Adm SG Les Dunes 5,35 €\n1 Sub Les Dunes -5,35 €\nA payer 5,00 €\nDont TVA 10,00% 0,45 €\nAncien so1de 39,61 €\n‘ Nouveau so1de 34,51 €\nBON APPETIT\n\n";
const regDate = /((0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d)/;
const regDecimal = /\$?(([1-9]\d{0,2}(,\d{3})*)|0)?[\,\.]{1}\d{1,2}/;
const regDecimalWithCurrency = /\$?(([1-9]\d{0,2}(,\d{3})*)|0)?[\,\.]{1}\d{1,2}\s.{1}/;
const regCurrency = /E|€|\$|£/;
describe('OcrTest function', () => {
  it.only('Should parse character "1"', () => {
    const data = str.split('\n');
    console.log(data);
    const one = ['text'];
    const prices = [];
    let date;
    let currency;
    data.forEach((elem, index) => {
      if (regDate.test(elem)) {
        elem.match(regDate);
        date = elem.match(regDate)[0];
      }
      if (regDecimal.test(elem) && (elem.includes('payer') || elem.includes('TVA') || elem.includes('EURO'))) {
        elem.match(regDecimal);
        if (elem.match(regDecimal)[0] != 0) {
          prices.push(elem.match(regDecimalWithCurrency)[0].replace(',','.'));
        }
      }
      if (regCurrency.test(elem)) {
        currency = elem.match(regCurrency)[0] === 'E' ? '€' : elem.match(regCurrency)[0];        
      }
    });
    console.log('Total a payé', Math.max(...prices.map(price => parseFloat(price.match(regDecimal)[0]))));
    console.log('TVA', Math.min(...prices.map(price => parseFloat(price.match(regDecimal)[0]))));
    console.log('date', date);
    console.log('currency', currency);
    expect(OcrTest(one)).toEqual(['text']);
  });
});