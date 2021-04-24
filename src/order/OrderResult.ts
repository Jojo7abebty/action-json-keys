/**
 * Contains the results of the check on the key order
 */
export class OrderResult {
  public readonly keyCouples: [string, string][];
  constructor() {
    this.keyCouples = [];
  }

  /**
   * Add a couple of unordered keys
   * 
   * @param key1 
   * @param key2 
   */
  public push(key1: string, key2: string): void {
    this.keyCouples.push([key1, key2]);
  }

  /**
   * Whether the check passed
   */
  public get success(): boolean{
    return !this.keyCouples.length;
  }
}