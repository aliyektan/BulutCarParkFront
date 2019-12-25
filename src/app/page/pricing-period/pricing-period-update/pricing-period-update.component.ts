import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {PricingPeriod} from '../../../models/pricing-models';
import {PricingPeriodService} from '../../../services/pricing-period.service';

@Component({
  selector: 'app-pricing-period-update',
  templateUrl: './pricing-period-update.component.html',
  styleUrls: ['./pricing-period-update.component.scss']
})
export class PricingPeriodUpdateComponent implements OnInit {

  @Input('id') id: number;

  @ViewChild(NgForm, {static: false}) editPricingPeriodForm: NgForm;

  formControl = new FormControl('', [
    Validators.required
  ]);

  isSuccessful = false;
  hasError = false;
  pricingPeriod = new PricingPeriod();

  constructor(public pricingPeriodService: PricingPeriodService) {
  }

  ngOnInit() {
    this.getPricingPeriod();
  }

  getPricingPeriod() {
    this.pricingPeriodService.getPricingPeriod(this.id).subscribe((res: any) => {

      this.pricingPeriod = res.data;

    }, error => {
      console.log(error);
    });
  }

  updatePricingPeriod() {

    this.pricingPeriodService.savePricingPeriod(this.pricingPeriod).subscribe((res: any) => {
      this.isSuccessful = true;
      this.hasError = false;
      this.editPricingPeriodForm.resetForm(true);
    }, error => {
      this.hasError = true;
      this.isSuccessful = false;
      console.log(error);
    });
  }

  resetForm() {
    this.editPricingPeriodForm.resetForm(true);
  }

}
