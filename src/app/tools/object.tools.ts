
export class ObjectTools {

  static isEmptyOrNull(obj: any) {
    return JSON.stringify(obj) === '{}' || obj === undefined;
  }

  static getWritableObject<T>(obj:T): T {
    return JSON.parse(JSON.stringify(obj))
  }
}
