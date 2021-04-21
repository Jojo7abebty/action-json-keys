import { actionOptions } from "../utils/ActionOptions";
import { Json, jsonSearch } from "../utils/jsonSearch";

export function isCorrectCase(object: Json): boolean {
  return jsonSearch(object, (keys) => keys.every(actionOptions.keyFormat.isCorrectCase));
}
