/**
 * Order options for the Github action
 */
export type OrderOptions = 'asc'|'desc';

/**
 * Object to check the key order from the github action option
 */
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

  /**
   * Ascending check
   * 
   * @param key1 
   * @param key2 
   * @returns 
   */
  private static asc(key1: string, key2: string): boolean {
    return key1 <= key2;
  }

  /**
   * Descending check
   * 
   * @param key1 
   * @param key2 
   * @returns 
   */
  private static desc(key1: string, key2: string): boolean {
    return key1 >= key2;
  }
}