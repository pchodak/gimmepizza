import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      map(logged => {
        if (logged) {
            return true;
        } else {
          this.router.navigate(['/login'], { replaceUrl: true });
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/login'], { replaceUrl: true });
        return Observable.throw(err);
      })
    );
  }
}
