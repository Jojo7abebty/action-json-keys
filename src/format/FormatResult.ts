/**
 * Contains the result on the format of the keys
 */
export class FormatResult {
  public readonly keys: string[];
  constructor() {
    this.keys = [];
  }

  /**
   * Add a bad formatted key
   * 
   * @param key 
   */
  public push(key: string): void {
    this.keys.push(key)
  }

  /**
   * Wether the check passed
   */
  public get success(): boolean {
    return !this.keys.length;
  }

}