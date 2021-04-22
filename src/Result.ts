
export class Result {
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