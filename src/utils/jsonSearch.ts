import { isObject } from "./utils";

export type Json = {[keys: string]: any};

type JsonSearchCallback = (keys: string[]) => boolean;

export function jsonSearch(json: any, callback: JsonSearchCallback): boolean {
  if (isObject(json)) {
    const keys = Object.keys(json);
    const isOk = callback(keys);
    if (!isOk) return false;
    return keys.every((key) => jsonSearch(json[key], callback),);
  } else if (Array.isArray(json)) {
    return (json as []).every((subJson) => jsonSearch(subJson, callback));
  }
  return true;
}