import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {}

  submit() {
    this.userService.login(this.model);
  }
}
