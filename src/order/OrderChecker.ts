export type OrderOptions = 'asc'|'desc';

export class OrderChecker {
  public readonly checker: (key1: string, key2: string) => boolean;

  constructor(input: OrderOptions) {
    if (input === 'asc') {
      this.checker = OrderChecker.asc;
    } else {
      this.checker = OrderChecker.desc;
    }
  }

  private static asc(key1: string, key2: string): boolean {
    return key1 <= key2;
  }

  private static desc(key1: string, key2: string): boolean {
    return key1 >= key2;
  }
}