export class PaymentMethod{
  paymentType: string;
  value: string;

  constructor(paymentType: string, value: string) {
    this.paymentType = paymentType;
    if(paymentType == 'CARD'){
      this.value = 'xxxx-xxxx-xxxx-'+value;
    } else
      this.value = value;
  }
}
