import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NycShopFormService } from '../../services/nyc-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  countries: Country[] = [];
  constructor(private formBuilder: FormBuilder,
    private nycShopFormService: NycShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months
    const startMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
    console.log("Start Month: ", startMonth);

    this.nycShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Retrieved credit Card Months: ", JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // populate credit card years
    this.nycShopFormService.getCreditCardYears().subscribe(data => {
      console.log("Retrieved credit Card Years: ", JSON.stringify(data));
      this.creditCardYears = data;
    });

    // populate countries
    this.nycShopFormService.getCountries().subscribe(data => {
      console.log("Retrieved countries: ", JSON.stringify(data));
      this.countries = data;
    });

  }
  copyShippingAddressToBillingAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

        // set billing address state to shipping address state
        this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      // 
      this.billingAddressStates = [];
    }
  }


  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is: " + this.checkoutFormGroup.get('customer')?.value.email);

    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear = new Date().getFullYear();

    const selectedYear = Number(creditCardFormGroup?.get('expirationYear')?.value);

    // if curren year equals selected year, then start with the current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.nycShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      console.log("Retrieved credit Card Months: ", JSON.stringify(data));
      this.creditCardMonths = data;
    });
    // populate countries
    this.nycShopFormService.getCountries().subscribe(data => {
      console.log("Retrieved countries: ", JSON.stringify(data));
      this.countries = data;
    });

  }
 getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.nycShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}