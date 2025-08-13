import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NycShopFormService } from '../../services/nyc-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { NycShopValidators } from 'src/app/validators/nyc-shop-validators';

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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), NycShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), NycShopValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), NycShopValidators.notOnlyWhitespace])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2), 
                                    NycShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), NycShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}')]),
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
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
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
      // clear billing address states
      this.billingAddressStates = [];
    }
  }


  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

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