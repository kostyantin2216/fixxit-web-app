import { ServerAccessService } from './../shared/server-access.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  public submitted = false;

  constructor(
    private serverAccessService: ServerAccessService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.serverAccessService.contactUsEnquiry(form.value);
  }


}
