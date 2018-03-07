import { ContactUsModel } from './../core/contact-us/contact-us.model';
import { User } from './../core/user/user.model';
import { Profession } from './../core/professions/profession.model';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { environment } from "../../environments/environment";
import { assign } from 'lodash';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ServerAccessService {
    
    constructor(
        private httpClient: HttpClient
    ) { }

    fetchProfessions() {
        const body = [ this.createQuery('isActive', '=', 'true') ];
        return this.httpClient.post<Profession[]>(
                    this.completeUrl('data/Professions/query'), 
                    body
               );
    }

    completeOrder(user: User, profession: Profession, address: string, comment: string) {
        const body = new URLSearchParams();
        body.set('profession', profession.name);
        body.set('address', address);                
        body.set('name', user.name);
        body.set('emal', user.email);
        body.set('telephone', user.telephone);
        body.set('comment', comment);
        body.set('trafficSourceId', String(1));              

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.httpClient.post(
            this.completeUrl('general/orders/quickOrderRequest'),
            body.toString(),
            options
        );
    }

    contactUsEnquiry(model: ContactUsModel) {
        this.httpClient.post(
            this.completeUrl('general/contactus/json'),
            model
        ).subscribe();
    }

    private completeUrl(suffix) {
        return environment.serverBaseUrl + suffix;
    }

    private createQuery(property, operator, value) {
        return {
            'prop': property,
            'op': operator,
            'val': value
        };
    }

}