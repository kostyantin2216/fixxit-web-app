import { Profession } from "../professions/profession.model";
import { User } from "../user/user.model";
import { Router } from "@angular/router";

export class OrderParams {
    public static resolveMissingParams(params: OrderParams, router: Router) {
        if(!params._profession) {
            router.navigate(['/']);
        } else if(!params._address) {
            router.navigate(['/', params._profession.id]);
        } else if(!params._user) {
            router.navigate(['/', params._profession.id, params._address]);
        }
    }

    private _profession: Profession;
    private _address: string;
    private _user: User;

    constructor(
        private onParamsReady: Function
    ) { }

    set profession(profession: Profession) {
        this._profession = profession || null;
        this.notifyReady();
    }

    set address(address: string) {
        this._address = address || null;
        this.notifyReady();
    }

    set user(user: User) {
        this._user = user || null;
        this.notifyReady();
    }

    get profession(): Profession {
        return this._profession;
    }

    get address(): string {
        return this._address;
    }

    get user(): User {
        return this._user;
    }

    isReady(): boolean {
        return this._profession !== undefined && this._address !== undefined && this._user !== undefined;
    }

    private notifyReady() {
        if(this.isReady()) {
            this.onParamsReady();
            this.onParamsReady = null;
        }
    }
 
}