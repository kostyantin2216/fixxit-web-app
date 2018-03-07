import { Subscribable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ServerAccessService } from './server-access.service';
import { Profession } from '../core/professions/profession.model';

@Injectable()
export class GlobalDataService {

  private professions: Profession[];

  constructor(
    private serverAccess: ServerAccessService
  ) { }

  loadProfession(id: number): Observable<Profession> {
    if(this.professions) {      
      return Observable.of(this.getProfession(id));
    } else {
      return this.serverAccess.fetchProfessions().map((professions: Profession[]) => {
        this.professions = professions;
        return this.getProfession(id);
      });
    }
  }
  
  loadProfessions(): Observable<Profession[]> {
    if(this.professions) {
      return Observable.of(this.professions);
    } else {
      return this.serverAccess.fetchProfessions().map(
        (professions: Profession[]) => {
          this.professions = professions;
          return this.professions;
        }
      );
    }
  }

  private getProfession(id: number) {
    const professions = this.professions.filter(
      (profession: Profession) => profession.id === id
    );

    let profession;
    if(professions && professions.length) {
      profession = professions[0];
    } else {
      profession = null;
    }

    return profession;
  }

}
