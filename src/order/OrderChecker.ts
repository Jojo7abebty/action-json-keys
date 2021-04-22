export type OrderOptions = 'asc'|'desc';

export class OrderChecker {
  public readonly checker: (key1: string, key2: string) => boolean;
  public readonly orderText: string;

  constructor(input: OrderOptions) {
    if (input === 'asc') {
      this.checker = OrderChecker.asc;
      this.orderText = 'ascending';
    } else {
      this.checker = OrderChecker.desc;
      this.orderText = 'descending';
    }
  }

  private static asc(key1: string, key2: string): boolean {
    return key1 <= key2;
  }

  private static desc(key1: string, key2: string): boolean {
    return key1 >= key2;
  }
}