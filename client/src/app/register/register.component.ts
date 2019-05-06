import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: any = {};
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {}

  submit() {
    this.userService.register(this.register).subscribe(res => {
      console.log(res);
    });
  }
}
