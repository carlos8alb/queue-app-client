import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/users';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [  ]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this._userService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(loginForm: NgForm) {

    if (loginForm.invalid) {
      return;
    }

    const user = new User(null, null, loginForm.value.email, loginForm.value.password);
    this._userService.login(user)
      .subscribe(
        resp => {
          this.router.navigate(['/dashboard']);
        }
    );

  }

}
