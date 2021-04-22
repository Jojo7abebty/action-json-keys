
/**
 * Check whether the object is a typescript object
 * 
 * @param object 
 * @returns
 */
export function isObject(object: any): boolean {
  return !!object && typeof object === 'object' && object.constructor === Object;
}
