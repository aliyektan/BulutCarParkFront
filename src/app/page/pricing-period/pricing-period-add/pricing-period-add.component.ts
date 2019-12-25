import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {PricingPeriodService} from '../../../services/pricing-period.service';
import {PricingPeriod} from '../../../models/pricing-models';

@Component({
  selector: 'app-pricing-period-add',
  templateUrl: './pricing-period-add.component.html',
  styleUrls: ['./pricing-period-add.component.scss']
})
export class PricingPeriodAddComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) newPricingPeriodForm: NgForm;
  formControl = new FormControl('', [
    Validators.required
  ]);
  isSuccessful = false;
  hasError = false;
  pricingPeriod = new PricingPeriod();

  constructor(public pricingPeriodService: PricingPeriodService) {
  }

  ngOnInit() {
  }

  createPricingPeriod() {

    this.pricingPeriodService.savePricingPeriod(this.pricingPeriod).subscribe((res: any) => {
      this.isSuccessful = true;
      this.hasError = false;
      this.newPricingPeriodForm.resetForm(true);
    }, error => {
      this.isSuccessful = false;
      this.hasError = true;
      console.log(error);
    });
  }

  resetForm() {
    this.newPricingPeriodForm.resetForm(true);
  }

}
