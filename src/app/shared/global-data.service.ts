import { Profession } from '../professions/profession.model';
import { Subscribable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class GlobalDataService {

  private professions: Profession[] = [
      new Profession(
        1, 
        "Plumber", 
        "Plumbers", 
        "Installation and repair of water supply lines, waste disposal systems, and related appliances.", 
        "http://fixxit-web.co.za/imgs/app/professions/plumber.jpg"
      ),
      new Profession(
       2,
       "Locksmith",
       "Locksmiths",
       "Installation and repairs locks, duplicates keys.",
       "http://fixxit-web.co.za/imgs/app/professions/locksmith.jpg"
      ),
      new Profession(
       3,
       "Electrician",
       "Electricians",
       "Installation and repairs to electrical wiring, lighting systems and electrical components.",
       "http://fixxit-web.co.za/imgs/app/professions/electrician.jpg"
      ),
      new Profession(
       4,
       "Handyman",
       "Handymen",
       "Repairs and maintenance to domestic and commerical properties and appliances.",
       "http://fixxit-web.co.za/imgs/app/professions/handyman.jpg"
      ),
      new Profession(
       5,
       "Aircon technician",
       "Aircon technicians",
       "Installing, maintaining and regassing airconditioners",
       "http://fixxit-web.co.za/imgs/app/professions/airconrepairs.jpg"
      )
    ];

  constructor() { }

  loadProfession(id: number): Observable<Profession> {
    const professions = this.professions.filter(
      (profession: Profession) => profession.id === id
    );

    let profession;
    if(professions && professions.length) {
      profession = professions[0];
    } else {
      profession = null;
    }
    
    return Observable.of(profession);
  }

  loadProfessions(): Observable<Profession[]> {
    return Observable.of(this.professions);
  }

}
