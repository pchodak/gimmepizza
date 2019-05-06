import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, concatMap, catchError, concat } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.api;
    if (req.url.includes('refresh-token') || req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req.clone({ url: url + req.url }));
    }
    const auth = this.injector.get(AuthService);
    return this
      .injector.get(AuthService)
      // Get the latest token from the auth service.
      .token
      // Map the token to a request with the right header set
      .pipe(
        map(token => req.clone({ url: url + req.url, headers: req.headers.set('Authorization', `Bearer ${(token as any).accessToken}`) })),
        // Execute the request on the server.
        concatMap(authReq => next.handle(authReq)),
        // Catch the 401 and handle it by refreshing the token and restarting the chain
        // (where a new subscription to this.auth.token will get the latest token).
        catchError((err, restart) => {
          // If the request is unauthorized, try refreshing the token before restarting.
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return auth.refreshToken.pipe(concat(restart));
          }
          return Observable.throw(err);
        })
      );
  }
}
