import { ServerAccessService } from './../../shared/server-access.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profession } from '../../professions/profession.model';
import { User } from '../../user/user.model';
import { GlobalDataService } from '../../shared/global-data.service';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  public user: User;

  constructor(
    private route: ActivatedRoute,
    private serverAccessService: ServerAccessService
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];

    const profession = this.route.snapshot.data['profession'];
    const address = this.route.snapshot.params['address'];
    const comment = this.route.snapshot.params['comment'];
    
    this.serverAccessService.completeOrder(this.user, profession, address, comment).subscribe(
      (response) => {
        if(response) {
          console.log(response);
        } else {
          console.log('success!');
        }
      }
    );
  }

}
