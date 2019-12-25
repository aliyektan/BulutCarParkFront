import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {User} from '../../../models/user-models';
import {Role} from '../../../models/role-models';
import {RoleService} from '../../../services/role.service';
import {BranchService} from '../../../services/branch.service';
import {Branch} from '../../../models/branch-models';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) newUserForm: NgForm;
  formControl = new FormControl('', [
    Validators.required
  ]);
  isSuccessful = false;
  roles: Role[] = [];
  branches: Branch[] = [];
  user = new User();

  constructor(public userService: UserService, public roleService: RoleService, public branchService: BranchService) {
  }

  ngOnInit() {
    this.getAllRoles();
    this.getAllBranches();
  }

  createUser() {

    this.userService.createUser(this.user).subscribe((res: any) => {
      this.isSuccessful = true;
      this.newUserForm.resetForm(true);
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

  resetForm() {
    this.newUserForm.resetForm(true);
  }

}
