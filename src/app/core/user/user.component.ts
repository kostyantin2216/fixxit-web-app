import { CustomValidators } from './../../shared/utilities/custom-validators';
import { Subscription } from 'rxjs/Rx';
import { User } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private userServiceSubscription: Subscription;

  public userForm: FormGroup;
  public submitted = false;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let userName = localStorage.getItem('userName') || null;
    let userEmail = localStorage.getItem('userEmail') || null;
    let userTelephone = localStorage.getItem('userTelephone') || null;
    this.userForm = new FormGroup({
      'name': new FormControl(userName, Validators.required),
      'email': new FormControl(userEmail, CustomValidators.emailNotRequired),
      'telephone': new FormControl(userTelephone, Validators.required)
    });
  }

  ngOnDestroy() {
    if(this.userServiceSubscription) {
      this.userServiceSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if(this.userForm.valid) {
      const user: User = this.userForm.value;
      this.userServiceSubscription = this.userService.getIdForUser(user).subscribe(
        (userId: number) => this.router.navigate([userId], { relativeTo: this.route })
      );
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userTelephone', user.telephone);
    }
    this.submitted = true;
  }

}
