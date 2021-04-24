import * as glob from 'glob';
import * as fs from 'fs';
import * as core from '@actions/core';
import { actionOptions } from './utils/ActionOptions';
import { Result } from './Result';
import { isObject } from './utils/utils';
import { isCorrectCase } from './format/format';
import { isOrdered } from './order/order';

async function main() {
  const files = glob.sync(actionOptions.fileMatcher);
  console.log('::group:: Checking json files...');

  const results = files.map(checkJson);
  let success = true;
  for (const result of results) {
    if (!result.success) {
      success = false;
      if (!result.json) {
        console.log(`::error::${result.file} is not a json.`);
      }
      if (!result.order.success) {''
        const badKeys = result.order.keyCouples.map(([key1, key2]) => `("${key1}, "${key2}")`).join(', ');
        console.error(`::error::${result.file} keys are not in ${actionOptions.order.orderText} order (${badKeys}).`);
      }
      if (!result.format.success) {
        const badKeys = `"${result.format.keys.join('", "')}"`;
        console.error(`::error::${result.file} keys are not in ${actionOptions.keyFormat.formatName} format (${badKeys}).`);
      }
    }

  }
  console.log('::endgroup::');
  if (!success) {
    core.setFailed('Some json files are not properly formatted, see logs above for more information.');
  } else {
    console.log('The action found no issue.')
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
  const orderResult = isOrdered(json);
  const formatResult = isCorrectCase(json);

  return new Result({file: filePath, order: orderResult, format: formatResult});
}

main();