import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { UserResolve } from "./user-resolve.service";
import { AddressGuard } from "../address/address-guard.service";
import { User } from "./user.model";

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private router: Router,
        private addressGuard: AddressGuard,
        private userResolve: UserResolve
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.addressGuard.canActivate(route, state).then((validAddress: boolean) => {
                if(validAddress) {
                    this.userResolve.resolve(route, state).subscribe(
                        (user: User) => {
                            if(user) {
                                resolve(true);
                            } else {
                                console.log('invalid user id');
                                this.router.navigate(['/', route.params['profession'], route.params['address']]);
                                resolve(false);
                            }
                        }
                    )
                } else {
                    resolve(false);
                }
            });
        });
    }
}