import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  register(data) {
    return this.http.post('/auth/register', data);
  }

  login(data) {
    return this.http.post('/auth/login', data).subscribe(res => {
      // console.log(res);
      localStorage.setItem('user', JSON.stringify((res as any).user));
      localStorage.setItem('token', JSON.stringify((res as any).token));
      this.router.navigate(['/'], {replaceUrl: true});
    });
  }

  profile() {
    return this.http.get('/users/profile');
  }

}
