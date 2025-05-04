export class PaymentEntity {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  productId: string;
  customerEmail: string;
  customerName: string;
  address: string;

  constructor(
    id: string,
    amount: number,
    status: string,
    paymentMethod: string,
    productId: string,
    customerEmail: string,
    customerName: string,
    address: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.productId = productId;
    this.customerEmail = customerEmail;
    this.customerName = customerName;
    this.address = address;
  }
}
