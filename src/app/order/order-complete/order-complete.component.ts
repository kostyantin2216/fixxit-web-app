import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profession } from '../../professions/profession.model';
import { User } from '../../user/user.model';
import { GlobalDataService } from '../../shared/global-data.service';
import { UserService } from '../../user/user.service';
import { OrderParams } from '../order-params.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit, OnDestroy {

  public params: OrderParams;

  private professionSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalData: GlobalDataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.params = new OrderParams(() => console.log(this.params));
    let profession = parseInt(this.route.snapshot.params['profession']);
    if(profession) {
      this.professionSubscription = this.globalData.loadProfession(profession).subscribe(
        (p: Profession) => this.params.profession = p
      );
    } else {
      this.params.profession = null;
    }
    this.params.address = this.route.snapshot.params['address'];

    this.route.snapshot.params['user'];
    this.params.user = null;
  }

  ngOnDestroy() {
    if(this.professionSubscription) {
      this.professionSubscription.unsubscribe();
    }
  }

}
