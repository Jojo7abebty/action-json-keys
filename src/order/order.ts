import { actionOptions } from "../utils/ActionOptions";
import { Json, jsonSearch } from "../utils/jsonSearch";
import { OrderResult } from "./OrderResult";

/**
 * Whether the object has its keys ordered in alphabetical order
 * @param object 
 * @returns 
 */
export function isOrdered(object: Json): OrderResult {
  const orderResult = new OrderResult();
  jsonSearch(
    object,
    (keys: string[]): void => {
      for (let index = 0; index < keys.length - 1; index++) {
        const key1 = keys[index];
        const key2 = keys[index + 1];
        if (!actionOptions.order.checker(key1, key2)) {
          orderResult.push(key1, key2);
        }
      }
    }
  );
  return orderResult;
}
