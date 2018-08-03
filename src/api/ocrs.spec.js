'use strict'
const OcrTest = (nums) => {
  return nums;
}
describe.only('OcrTest function', () => {
  it('Should parse character "1"', () => {
    const one = ['text'];
    expect(OcrTest(one)).toEqual(['text']);
  });
});