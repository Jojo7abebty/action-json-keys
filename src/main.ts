import * as glob from 'glob';
import { actionOptions } from './utils/ActionOptions';

async function main() {
  const files = glob.sync(actionOptions.matcher);
  console.log('files\n', files);
}

main();

