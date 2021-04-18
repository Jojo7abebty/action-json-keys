import * as glob from 'glob';
import * as fs from 'fs';
import { actionOptions } from './utils/ActionOptions';

async function main() {
  const files = glob.sync(actionOptions.matcher);
  console.log('files\n', files);

  console.log(fs.readdirSync('./'));
}

main();

