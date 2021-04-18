import * as core from '@actions/core';

class ActionOptions {
  public readonly matcher: string;
  constructor() {
    this.matcher = core.getInput('matcher', {required: true});
  }
}

export const actionOptions = new ActionOptions();