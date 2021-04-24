import { FormatResult } from "./format/FormatResult";
import { OrderResult } from "./order/OrderResult";

export class Result {
  public readonly file: string;
  public readonly order: OrderResult;
  public readonly json: boolean;
  public readonly format: FormatResult;
  constructor(params: {
    file: string,
    order?: OrderResult,
    json?: boolean,
    format?: FormatResult,
  }) {
    this.file = params.file;
    this.order = params.order ?? new OrderResult();
    this.json = params.json ?? true;
    this.format = params.format ?? new FormatResult();
  }

  public get success(): boolean {
    return this.order.success && this.json && this.format.success;
  }

  
}