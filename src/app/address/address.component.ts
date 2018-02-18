import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalStateService } from '../shared/global-state.service';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  constructor(private globalStateService: GlobalStateService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  submitLocation(addressInput: HTMLInputElement) {
    this.router.navigate([addressInput.value], { relativeTo: this.route })
  }

}
