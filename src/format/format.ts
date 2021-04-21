import { Json } from "../utils/jsonSearch";
import { isObject } from "../utils/utils";

export function isCorrectCase(object: Json): boolean {
  const keys = Object.keys(object);
  for (const key of keys) {
    if (key.match(snakeCaseRegExp)?.length !== 1) {
      return false;
    }
  }
  return keys.every((key) => !isObject(object[key]) || isCorrectCase(object[key]));
}

const snakeCaseRegExp = /^([a-z]|_)*$/g;
