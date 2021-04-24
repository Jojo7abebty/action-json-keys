export class FormatResult {
  public readonly keys: string[];
  constructor() {
    this.keys = [];
  }

  public push(key: string): void {
    this.keys.push(key)
  }

  public get success(): boolean {
    return !this.keys.length;
  }

}