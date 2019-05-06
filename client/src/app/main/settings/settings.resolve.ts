import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../core/user.service';

@Injectable()
export class UserResolve implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve() {
    return this.http.get('/users/profile');
  }
}
