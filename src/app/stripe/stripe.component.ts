import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './user';
declare let Stripe: any;
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit, AfterViewInit {
  public spin: Boolean = false;
  public errMsg: String;
  protected token: string = null;
  public userForm: FormGroup;
  public userModel = {
    name: null,
    email: null,
    phone: null
  };
  card: any;
  stripe: any;
  elements: any;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showCustomStripe();
  }
  onSubmit(userForm: NgForm) {

  }

  showCustomStripe() {
    const stripe_key = 'pk_test_LU5CAPgi3QkZEP3gUrEP1dFY';
    this.stripe = Stripe(stripe_key);
    this.elements = this.stripe.elements();
    const style = {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#8898AA',
          color: '#000',
          lineHeight: '36px',
          fontWeight: 300,
          '::placeholder': {
            color: '#8898AA',
          },
        },
        invalid: {
          iconColor: '#e85746',
          color: '#e85746',
        }
      },
      classes: {
        focus: 'is-focused',
        empty: 'is-empty',
      },
};

// Create an instance of the card Element
  this.card = this.elements.create('card', {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#8898AA',
        color: '#000',
        lineHeight: '36px',
        fontWeight: 300,
        '::placeholder': {
          color: '#8898AA',
        },
      },
      invalid: {
        iconColor: '#e85746',
        color: '#e85746',
      }
    },
    classes: {
      focus: 'is-focused',
      empty: 'is-empty',
    },
  }
  );
    this.card.mount('#card-element');
    const inputs: any = Array.from(document.querySelectorAll('input.field'));
    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        input.classList.add('is-focused');
      });
      input.addEventListener('blur', function() {
        input.classList.remove('is-focused');
      });
      input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
          input.classList.add('is-empty');
        } else {
          input.classList.remove('is-empty');
        }
      });
    });
    this.card.addEventListener('change', function(event) {
      // const displayError = document.getElementById('card-errors');
      // if (event.error) {
      //   this.errMsg = event.error.message;
      // } else {
      //   this.errMsg = null;
      // }
    });
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', (event) => {
      this.spin = true;
      event.preventDefault();
      const options = {};
      if (this.userModel.email && this.userModel.email !== null && this.userModel.email !== '') {
        Object.assign(options, {email: this.userModel.email});
      }
      if (this.userModel.name && this.userModel.name !== null && this.userModel.name !== '') {
        Object.assign(options, {name: this.userModel.name});
      }
      if (this.userModel.phone && this.userModel.phone !== null) {
        Object.assign(options, {phone: this.userModel.phone});
      }
      this.stripe.createToken(this.card, options).then((result) => {
        if (result.error) {
          this.errMsg = result.error.message;
          this.spin = false;
          this.token = null;
        } else {
          this.spin = false;
          this.errMsg = null;
          this.token = result.token.id;
          console.log(this.token);
        }
      }, error => {
        this.spin = false;
      });
    });
  }

}
