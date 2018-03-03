import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user.model';
import { Profession } from '../professions/profession.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  public profession: Profession;
  public address: string;
  public user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profession = this.route.snapshot.data['profession'];
    this.address = this.route.snapshot.params['address'];
    this.user = this.route.snapshot.data['user'];
  }

  completeOrder(commentElm: HTMLInputElement) {
    let comment = commentElm.value;
    if(!comment) {
      comment = '-';
    }
    this.router.navigate([ comment ], { relativeTo: this.route });
  }

}
