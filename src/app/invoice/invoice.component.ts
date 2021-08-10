import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {ItemsOnCart} from '../_models/ItemsOnCart';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
 items: ItemsOnCart[];
  subtotal = 0;
  totalQue = 0;
  todayDate: Date = new Date();

  constructor(private cartService: OrderService) { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
    for (const item of this.items) {
      this.subtotal = this.subtotal + (item.item.price * item.quantity);
      this.totalQue = this.totalQue + item.quantity;
    }
  }

  getInvoice() {
    return this.cartService.getInvoice();
  }

  getTotalAmount(subTotal: number) {
    return subTotal + this.getCGST(subTotal) + this.getSGST(subTotal) + this.getServiceCharge(subTotal);
  }
  getCGST(subTotal: number) {
    return 0.025 * subTotal;
  }
  getSGST(subTotal: number) {
    return 0.025 * subTotal;
  }
  getServiceCharge(subTotal: number) {
    return 0.05 * subTotal;
  }
  getTotalPrice(item: ItemsOnCart): number {
    this.subtotal = 0;
    this.totalQue = 0;

    for (const item1 of this.items) {
      this.subtotal = this.subtotal + (item1.item.price * item1.quantity);
      this.totalQue = this.totalQue + item1.quantity;
    }
    return item.item.price * item.quantity;
  }

  /*public captureScreen() {
    const data = document.getElementById('contentToConvert');
    console.log(data);
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }*/


}
