import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { GLOBAL } from '../../config/config';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [  ]
})
export class RegisterComponent implements OnInit {

  name: string;
  surname: string;
  email: string;
  password: string;
  repassword: string;
  captcha = false;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this._userService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  resolved(captchaResponse: string) {
    const data = { captchaResponse, secretKey: GLOBAL.secretKey };
    this._userService.checkCaptcha(data)
      .subscribe((resp) => {
        if (resp.success === true) {
          this.captcha = true;
        } else {
          this.captcha = false;
        }
      });
  }

  onSubmit(registerForm: NgForm) {

    if (registerForm.invalid) {
      return;
    }

    if (registerForm.value.password !== registerForm.value.repassword ) {
      Swal.fire('', 'Las contraseñas no coinciden.', 'info');
      return;
    }

    if (registerForm.value.password.length < 6) {
      Swal.fire('', 'La contraseña debe contener al menos 6 caracteres.', 'info');
      return;
    }

    if (this.captcha === false) {
      Swal.fire('', 'Debe activar el captcha.', 'info');
      return;
    }

    const user = new User(registerForm.value.name, registerForm.value.surname,
                          registerForm.value.email , registerForm.value.password);
    this._userService.register(user)
      .subscribe(resp => {
          this.name = '';
          this.surname = '';
          this.email = '';
          this.password = '';
          this.repassword = '';
          this.router.navigate(['/login']);
    });

  }

}
