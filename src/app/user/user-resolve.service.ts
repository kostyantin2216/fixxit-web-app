import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserResolve implements Resolve<User> {

    constructor(
        private userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userId = parseInt(route.params['user']);
        if(userId || userId === 0) {
            return this.userService.getUser(userId);
        }
        return Observable.of(null);
    }

}