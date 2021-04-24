export class OrderResult {
  public readonly keyCouples: [string, string][];
  constructor() {
    this.keyCouples = [];
  }

  public push(key1: string, key2: string): void {
    this.keyCouples.push([key1, key2]);
  }

  public get success(): boolean{
    return !this.keyCouples.length;
  }
}