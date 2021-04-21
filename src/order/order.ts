import { Json } from "../utils/jsonSearch";
import { isObject } from "../utils/utils";

/**
 * Whether the object has its keys ordered in alphabetical order
 * @param object 
 * @returns 
 */
export function isOrdered(object: Json): boolean {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length - 1; i++) {
    if (keys[i] > keys[i+1]) {
      return false;
    }
  }
  return keys.every((key) => !isObject(object[key]) || isObject(object[key]));
}
