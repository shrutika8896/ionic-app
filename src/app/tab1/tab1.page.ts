import { Component } from '@angular/core';
import { Stripe, StripeCardTokenParams } from '@ionic-native/stripe/ngx';
import { ToastMessageService } from '../toast-message.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
   card: StripeCardTokenParams = {
    number: '', // 16-digit credit card number
    expMonth: 0, // expiry month
    expYear: 0, // expiry year
    cvc: ''
  };
    constructor(private stripe: Stripe,
      private toastMessageService: ToastMessageService) {
      console.log('constructor');
    }

  createCard() {
    this.card.number = this.cardNumber;
    this.card.expMonth = this.expiryMonth;
    this.card.expYear = this.expiryYear;
    this.card.cvc = this.cvv;
    this.stripe.createCardToken(this.card).then(data => {
      console.log(data);
      this.toastMessageService.presentToast('Token generated : ' + data);
    }, err => {
      console.log(err);
      this.toastMessageService.presentToast(err);
    });

  }

  validateCardNumber() {
    this.stripe.validateCardNumber(this.card.number).then(data => {
      console.log('Validated', data);
      this.toastMessageService.presentToast('Validated' + data);
    }).catch(error => {
      console.log('Error in validation', error);
      this.toastMessageService.presentToast('Error in validation');
    });
  }

}
