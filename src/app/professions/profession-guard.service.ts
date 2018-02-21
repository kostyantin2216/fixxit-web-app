import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProfessionResolve } from "./profession-resolve.service";
import "rxjs"; 
import { Profession } from "./profession.model";

@Injectable()
export class ProfessionGaurd implements CanActivate {

    constructor(
        private professionResolve: ProfessionResolve,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.professionResolve.resolve(route).subscribe(
                (profession: Profession) => {
                    if(profession) {
                        resolve(true);
                    } else {
                        this.router.navigate(['/']);
                        resolve(false);
                    }
                }
            );
        });
    }
    
}