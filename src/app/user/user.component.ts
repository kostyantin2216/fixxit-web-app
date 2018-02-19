import { Subscription } from 'rxjs/Rx';
import { User } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/utilities/custom-validators';

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
    this.userForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, CustomValidators.emailNotRequired),
      'telephone': new FormControl(null, Validators.required)
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
    }
    this.submitted = true;
  }

}
