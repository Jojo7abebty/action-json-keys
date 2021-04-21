import * as glob from 'glob';
import * as fs from 'fs';
import * as core from '@actions/core';
import { actionOptions } from './utils/ActionOptions';

async function main() {
  const files = glob.sync(actionOptions.matcher);
  console.log('1');
  console.log('::group:: Checking json files...');

  console.log('2');
  const results = files.map(checkJson);
  let success = true;
  let i = 0;
  for (const result of results) {
    console.log(`3 - ${i}`);
    if (!result.success) {
      console.log(`4 - ${i}`);
      success = false;
      if (!result.json) {
        console.error(`${result.file} is not a json.`);
      }
      if (!result.ordered) {
        console.error(`${result.file} is not ordered.`);
      }
      if (!result.correctCase) {
        console.error(`${result.file} keys are not all in snake case.`);
      }
      console.log(`5 - ${i}`);
    }
      console.log(`6 - ${i}`);

  }
  console.log(`7`);
  console.log('::endgroup::');
  console.log(`8`);
  if (!success) {
    console.log('9');
    core.setFailed('Some json files are not properly formatted, see logs above for more information.');
    console.log('10');
  }
  console.log('11');
}


class Result {
  public readonly file: string;
  public readonly ordered: boolean;
  public readonly json: boolean;
  public readonly correctCase: boolean;
  constructor(params: {
    file: string,
    ordered?: boolean,
    json?: boolean,
    correctCase?: boolean,
  }) {
    this.file = params.file;
    this.ordered = params.ordered ?? true;
    this.json = params.json ?? true;
    this.correctCase = params.correctCase ?? true;
  }

  public get success(): boolean {
    return this.ordered && this.json && this.correctCase;
  }
}


/**
 * Check a json file
 */
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
  const correctCase = isCorrectCase(json);

  return new Result({file: filePath, ordered: ordered, correctCase: correctCase});
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

function isCorrectCase(object: {[keys: string]: any}): boolean {
  const keys = Object.keys(object);
  for (const key of keys) {
    if (key.match(snakeCaseRegExp)?.length !== 1) {
      return false;
    }
  }
  return keys.every((key) => !isObject(object[key]) || isCorrectCase(object[key]));
}

const snakeCaseRegExp = /^([a-z]|_)*$/g;

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