import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Branch} from '../../../models/branch-models';
import {BranchService} from '../../../services/branch.service';
import {PricingService} from '../../../services/pricing.service';
import {Pricing} from '../../../models/pricing-models';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.scss']
})
export class BranchUpdateComponent implements OnInit {

  @Input('id') id: number;
  @ViewChild(NgForm, {static: false}) editBranchForm: NgForm;
  hasError = false;
  message: string;

  isSuccessful = false;
  pricings: Pricing[] = [];
  branch = new Branch();
  compareFn = this._compareFn.bind(this);

  constructor(public branchService: BranchService, public pricingService: PricingService) {
  }

  ngOnInit() {
    this.getAllPricings();
    this.getBranch();
  }

  getBranch() {
    this.branchService.getBranch(this.id).subscribe((res: any) => {

      this.branch = res.data;

    }, error => {
      console.log(error);
    });
  }

  getAllPricings() {

    this.pricingService.getAllPricings().subscribe((res: any) => {

      this.pricings = res.data;

    }, error => {
      console.log(error);
    });

  }

  updateBranch() {

    this.branchService.saveBranch(this.branch).subscribe((res: any) => {
      this.isSuccessful = true;
      this.hasError = false;
      this.editBranchForm.resetForm(true);
    }, error => {
      this.hasError = true;
      this.isSuccessful = false;
      this.message = error.error.errorDescription;
    });

  }

  _compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  resetForm() {
    this.editBranchForm.resetForm(true);
  }

}
