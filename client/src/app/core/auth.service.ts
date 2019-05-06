import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, defer, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { map, filter, switchMap, take, concat, ignoreElements, tap, shareReplay } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private subject = new BehaviorSubject<Object|null>(null);

  readonly refreshToken: Observable<any>;
  readonly token: Observable<Object>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
     // refreshToken, when subscribed, gets the new token from the backend,
    // and then completes without values.
    this.refreshToken = defer(() => {
      // Defer allows us to easily execute some action when the Observable
      // is subscribed. Here, we set the current token to `null` until the
      // refresh operation is complete. This ensures no requests will be
      // sent with a known bad token.
      this.subject.next(null);

    return this
      // Next, we refresh the token from the server.
      .doRefreshToken()
      // Set it as the active token.
      .pipe(
        tap(token => {
          this.saveToken(token);
          return this.subject.next(token);
        }),
          // Drop the value, ensuring this Observable only completes when
          // done and doesn't emit.
          ignoreElements(),
          // Finally, share the Observable so we don't attempt multiple
          // refreshes at once.
          shareReplay()
      );
    });

    // token, when subscribed, returns the latest token.
    this.token = this
      .subject.pipe(
        filter(token => token !== null),
        take(1)
      );
  }

  doRefreshToken(): Observable<Object> {
    const body = {
      email: this.getUser().email,
      refreshToken: this.getToken().refreshToken
    };
    return this.http.post('/auth/refresh-token', body);
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && token.accessToken) {
      this.subject.next(token);
    }
    return token;
  }

  saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  clearTokens() {
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  isAuthenticated(): Observable<any> {
    return new Observable(observer => {
      const token: any = this.getToken();
      if (token) {
        const date = new Date(token.expiresIn);
        if (!token.accessToken) {
          observer.next(false);
          observer.complete();
        }
        if (date.valueOf() > new Date().valueOf()) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(this.refreshToken);
          observer.complete();
        }
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

}
