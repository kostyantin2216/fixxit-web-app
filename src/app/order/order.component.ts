import { Component, OnInit } from '@angular/core';
import { OrderParams } from './order-params.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../shared/global-data.service';
import { UserService } from '../user/user.service';
import { Profession } from '../professions/profession.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public params: OrderParams;

  private professionSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalData: GlobalDataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.params = new OrderParams(() => {});

    let profession = parseInt(this.route.snapshot.params['profession']);
    if(profession) {
      this.professionSubscription = this.globalData.loadProfession(profession).subscribe(
        (p: Profession) => this.params.profession = p
      );
    
      let address = this.route.snapshot.params['address'];
      if(address) {
        this.params.address = address;

        let user = parseInt(this.route.snapshot.params['user']);
        if(user || user === 0) {
          this.userService.getUser(user).subscribe(
            (u: User) => this.params.user = u
          );
        } else {
          OrderParams.resolveMissingParams(this.params, this.router);
        }
      } else {
        OrderParams.resolveMissingParams(this.params, this.router);
      }
    } else {
      OrderParams.resolveMissingParams(this.params, this.router);
    }    
  }

  ngOnDestroy() {
    if(this.professionSubscription) {
      this.professionSubscription.unsubscribe();
    }
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
