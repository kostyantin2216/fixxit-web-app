import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProfessionGaurd } from "../professions/profession-guard.service";

@Injectable()
export class AddressGuard implements CanActivate {

    constructor(
        private router: Router,
        private professionGuard: ProfessionGaurd
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.professionGuard.canActivate(route, state).then((validProfession: boolean) => {
            if(validProfession) {
                if(route.params['address']) {
                    return Promise.resolve(true);
                } else {
                    this.router.navigate(['../']);
                }
            }
            return Promise.resolve(false);
        });
    }
}