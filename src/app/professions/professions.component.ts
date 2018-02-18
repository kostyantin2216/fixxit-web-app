import { ActivatedRoute, Router } from '@angular/router';
import { Profession } from './profession.model';
import { Subscription } from 'rxjs/Rx';
import { GlobalDataService } from '../shared/global-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.css']
})
export class ProfessionsComponent implements OnInit, OnDestroy {
  private professionsSubscription: Subscription;
  professions: Profession[];

  constructor(private globalDataService: GlobalDataService, 
              private router: Router) { }

  ngOnInit() {
    this.professionsSubscription = this.globalDataService.loadProfessions().subscribe(
      (professions: Profession[]) => this.professions = professions
    );
  }

  ngOnDestroy() {
    this.professionsSubscription.unsubscribe();
  }

  onProfessionSelected(profession: Profession) {
    this.router.navigate([profession.id]);
  }

}
