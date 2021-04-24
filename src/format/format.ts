import { actionOptions } from "../utils/ActionOptions";
import { Json, jsonSearch } from "../utils/jsonSearch";
import { FormatResult } from "./FormatResult";

/**
 * Check that the keys are in the correct format
 * 
 * @param object 
 * @returns 
 */
export function isCorrectCase(object: Json): FormatResult {
  const badFormatAccumulator = new FormatResult();
  jsonSearch(
    object,
    (keys) => keys.forEach((key) => actionOptions.keyFormat.isCorrectCase(key, badFormatAccumulator)),
  );
  return badFormatAccumulator;
}
