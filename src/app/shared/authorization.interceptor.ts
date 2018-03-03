import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { environment } from '../../environments/environment';

export class AuthorizationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ 
            headers: req.headers.set('X-Authorization', environment.serverApiKey) 
        });

        return next.handle(req);
    }

}