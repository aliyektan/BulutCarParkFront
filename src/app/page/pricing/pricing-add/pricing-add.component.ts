import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {Pricing, PricingPeriod} from '../../../models/pricing-models';
import {PricingService} from '../../../services/pricing.service';
import {PricingPeriodService} from '../../../services/pricing-period.service';
import {UtilVariables} from '../../../utils/util-variables';

@Component({
  selector: 'app-pricing-add',
  templateUrl: './pricing-add.component.html',
  styleUrls: ['./pricing-add.component.scss']
})
export class PricingAddComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) newPricingForm: NgForm;
  formControl = new FormControl('', [
    Validators.required
  ]);
  isSuccessful = false;
  hasError = false;
  pricing = new Pricing();
  pricingPeriods: PricingPeriod[] = [];
  currencyMaskOptions = UtilVariables.currencyMaskOptions;

  constructor(public pricingService: PricingService, public pricingPeriodService: PricingPeriodService) {
  }

  ngOnInit() {
    this.getAllPricingPeriods();
  }

  createPricing() {

    this.pricingService.savePricing(this.pricing).subscribe((res: any) => {
      this.isSuccessful = true;
      this.hasError = false;
      this.newPricingForm.resetForm(true);
    }, error => {
      this.isSuccessful = false;
      this.hasError = true;
      console.log(error);
    });
  }

  getAllPricingPeriods() {
    this.pricingPeriodService.getAllPricingPeriods().subscribe((res: any) => {
      this.pricingPeriods = res.data;
    }, error => {
      console.log(error);
    });
  }

  resetForm() {
    this.newPricingForm.resetForm(true);
  }

}
