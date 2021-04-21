import * as core from '@actions/core';
import { KeyFormatMatcher } from '../format/KeyFormatMatcher';
import { OrderChecker, OrderOptions } from '../order/OrderChecker';

class ActionOptions {
  public readonly fileMatcher: string;
  public readonly order: OrderChecker;
  public readonly keyFormat: KeyFormatMatcher;
  constructor() {
    this.fileMatcher = core.getInput('matcher', {required: true});
    this.order = new OrderChecker(core.getInput('reversed', {required: true}) as OrderOptions);
    this.keyFormat = new KeyFormatMatcher(core.getInput('key-format', {required: true}));
  }
}

export const actionOptions = new ActionOptions();
