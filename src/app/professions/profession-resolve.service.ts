import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Profession } from "./profession.model";
import { GlobalDataService } from "../shared/global-data.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProfessionResolve implements Resolve<Profession> {

    constructor(
        private globalDataService: GlobalDataService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Profession> {
        let professionId = parseInt(route.params['profession']);
        if(professionId) {
            return this.globalDataService.loadProfession(professionId);
        }
        return Observable.of(null);
    }
}