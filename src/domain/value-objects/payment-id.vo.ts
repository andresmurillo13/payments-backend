export class PaymentId {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid Payment ID');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    // Add validation logic for payment ID (e.g., format, length)
    return typeof value === 'string' && value.length > 0;
  }

  public getValue(): string {
    return this.value;
  }
}