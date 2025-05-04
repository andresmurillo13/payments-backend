export class PaymentNotFoundException extends Error {
  constructor(paymentId: string) {
    super(`Payment with ID ${paymentId} not found.`);
    this.name = 'PaymentNotFoundException';
  }
}