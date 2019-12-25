import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Branch} from '../../../models/branch-models';
import {BranchService} from '../../../services/branch.service';
import {PricingService} from '../../../services/pricing.service';
import {Pricing} from '../../../models/pricing-models';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.scss']
})
export class BranchAddComponent implements OnInit {

  @ViewChild(NgForm, {static: true}) newBranchForm: NgForm;

  hasError = false;
  message: string;

  isSuccessful = false;
  pricings: Pricing[] = [];
  branch = new Branch();

  constructor(public branchService: BranchService, public pricingService: PricingService) {
  }

  ngOnInit() {
    this.getAllPricings();
  }

  createBranch() {

    this.branchService.saveBranch(this.branch).subscribe((res: any) => {
      this.isSuccessful = true;
      this.hasError = false;
      this.newBranchForm.resetForm(true);
    }, error => {
      this.hasError = true;
      this.isSuccessful = false;
      this.message = error.error.errorDescription;
    });
  }

  getAllPricings() {

    this.pricingService.getAllPricings().subscribe((res: any) => {

      this.pricings = res.data;

    }, error => {
      console.log(error);
    });

  }

  resetForm() {
    this.newBranchForm.resetForm(true);
  }

}
