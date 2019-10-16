import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styles: []
})
export class ForgotpasswordComponent implements OnInit {

  email = '';

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

  sendEmail(forgotPasswordForm: NgForm) {

      if (forgotPasswordForm.invalid) {
        return;
      }

      alert('Enviar email a: ' + forgotPasswordForm.value.email);
  }

}
