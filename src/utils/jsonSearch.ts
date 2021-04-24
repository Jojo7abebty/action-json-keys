import { isObject } from "./utils";

export type Json = {[keys: string]: any};

type JsonSearchCallback = (keys: string[]) => void;

export function jsonSearch(json: any, callback: JsonSearchCallback): void {
  if (isObject(json)) {
    const keys = Object.keys(json);
    callback(keys);
    keys.forEach((key) => jsonSearch(json[key], callback),);
  } else if (Array.isArray(json)) {
    return (json as []).forEach((subJson) => jsonSearch(subJson, callback));
  }
}