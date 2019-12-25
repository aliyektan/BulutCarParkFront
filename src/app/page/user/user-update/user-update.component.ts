import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';
import {BranchService} from '../../../services/branch.service';
import {Role} from '../../../models/role-models';
import {Branch} from '../../../models/branch-models';
import {User} from '../../../models/user-models';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  @Input('id') id: number;
  @ViewChild(NgForm, {static: false}) editUserForm: NgForm;
  roles: Role[] = [];
  branches: Branch[] = [];
  user = new User();
  isSuccessful = false;
  compareFn = this._compareFn.bind(this);

  constructor(public userService: UserService, public roleService: RoleService, public branchService: BranchService) {
  }

  ngOnInit() {
    this.getAllRoles();
    this.getAllBranches();
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.id).subscribe((res: any) => {

      this.user = res.data;

    }, error => {
      console.log(error);
    });
  }

  getAllRoles() {

    this.roleService.getAllRoles().subscribe((res: any) => {

      this.roles = res.data;

    }, error => {
      console.log(error);
    });

  }

  getAllBranches() {
    this.branchService.getAllBranches().subscribe((res: any) => {

      this.branches = res.data;

    }, error => {
      console.log(error);
    });
  }

  updateUser() {

    this.userService.updateUser(this.user).subscribe((res: any) => {
      this.isSuccessful = true;
      this.editUserForm.resetForm(true);
    }, error => {
      console.log(error);
    });

  }

  _compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  resetForm() {
    this.editUserForm.resetForm(true);
  }

}
