import { Component } from '@angular/core';
import { Stripe, StripeCardTokenParams } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
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
    constructor(private stripe: Stripe) {
      console.log('constructor');
    }

    ngOnInit(){
      console.log('init');
    }

  createCard() {
    this.card.number = this.cardNumber;
    this.card.expMonth = this.expiryMonth;
    this.card.expYear = this.expiryYear;
    this.card.cvc = this.cvv;
    this.stripe.createCardToken(this.card).then(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });

  }

  validateCardNumber() {
    this.stripe.validateCardNumber(this.card.number).then(data => {
      console.log('Validated', data);
    }).catch(error => {
      console.log('Error in validation', error);
    });
  }

}
