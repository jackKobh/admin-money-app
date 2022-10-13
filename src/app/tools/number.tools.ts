export class NumberTools {

  static generateRandomNumber(base: number) {
    return Math.round(Math.random() * base);
  }

  static isNumeric(num){
    return !isNaN(num)
  }
}
