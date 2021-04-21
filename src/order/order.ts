import { actionOptions } from "../utils/ActionOptions";
import { Json, jsonSearch } from "../utils/jsonSearch";
import { isObject } from "../utils/utils";

/**
 * Whether the object has its keys ordered in alphabetical order
 * @param object 
 * @returns 
 */
export function isOrdered(object: Json): boolean {
  return jsonSearch(
    object,
    (keys: string[]): boolean => {
      for (let index = 0; index < keys.length - 1; index++) {
        if (actionOptions.order.checker(keys[index], keys[index + 1])) {
          return false;
        }
      }
      return true;
    }
  );
}
