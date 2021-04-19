import * as glob from 'glob';
import * as fs from 'fs';
import * as core from '@actions/core';
import { actionOptions } from './utils/ActionOptions';

async function main() {
  const files = glob.sync(actionOptions.matcher);
  console.log('::group:: Checking json files...');

  const results = files.map(checkJson);
  for (const result of results) {
    if (!result.success) {
      if (!result.json) {
        core.setFailed(`${result.file} is not a json`);
      }
      if (!result.ordered) {
        core.setFailed(`${result.file} is not ordered`);
      }
    }
  }
  // const badFiles = results.filter((result) => !result.success).map((result) => result.file);
  // if (badFiles.length) {
  //   core.setFailed(`Some files are not properly formatted\n- ${badFiles.join('\n -')}\n`);
  // }
  console.log('::endgroup::');
}


class Result {
  public readonly file: string;
  public readonly ordered: boolean;
  public readonly json: boolean;
  constructor(params: {
    file: string,
    ordered?: boolean,
    json?: boolean,
  }) {
    this.file = params.file;
    this.ordered = params.ordered ?? true;
    this.json = params.json ?? true;
  }

  public get success(): boolean {
    return this.ordered && this.json;
  }
}


function checkJson(filePath: string): Result {
  const jsonString = fs.readFileSync(filePath, {encoding: 'utf-8'});
  let json: Object;
  try {
    json = JSON.parse(jsonString);
  } catch (error) {
    console.error(`error parsing ${error}`);
    return new Result({file: filePath, json: false});
  }
  if (!isObject(json))  {
    return new Result({file: filePath, json: false});
  }
  const ordered = isOrdered(json);

  return new Result({file: filePath, ordered: ordered});
}

/**
 * Whether the object has its keys ordered in alphabetical order
 * @param object 
 * @returns 
 */
function isOrdered(object: {[keys: string]: any}): boolean {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length - 1; i++) {
    if (keys[i] > keys[i+1]) {
      return false;
    }
  }
  return keys.every((key) => !isObject(object[key]) || isObject(object[key]));
}

/**
 * Check whether the object is a typescript object
 * 
 * @param object 
 * @returns
 */
function isObject(object: any): boolean {
  return !!object && typeof object === 'object' && object.constructor === Object;
}

main();