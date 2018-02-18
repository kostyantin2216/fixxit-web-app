import { Subscription } from 'rxjs/Rx';
import { User } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private userServiceSubscription: Subscription;

  constructor(private userService: UserService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.userServiceSubscription) {
      this.userServiceSubscription.unsubscribe();
    }
  }

  submitContactDetails(nameInput: HTMLInputElement, 
                       emailInput: HTMLInputElement, 
                       telephoneInput: HTMLInputElement) {
    const user = new User(nameInput.value, emailInput.value, telephoneInput.value);
    this.userServiceSubscription = this.userService.getIdForUser(user).subscribe(
      (userId: number) => this.router.navigate([userId], { relativeTo: this.route })
    );
  }

}
