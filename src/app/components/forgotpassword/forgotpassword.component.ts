import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgForm } from '@angular/forms';
import { MailService } from '../../services/mail/mail.service';
import { Mail } from '../../models/mail';
import { GLOBAL } from '../../config/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styles: []
})
export class ForgotpasswordComponent implements OnInit {

  email = '';
  mail: Mail;
  userId: string;
  url: string;
  loading = false;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _mailService: MailService,
  ) {
    this.mail = new Mail('', '', '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    if (this._userService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  recoverPassword(forgotPasswordForm: NgForm) {

      if (forgotPasswordForm.invalid) {
        return;
      }

      this.email = forgotPasswordForm.value.email;
      this._userService.recoverPassword(this.email)
        .subscribe((resp) => {
          if (resp.ok === true) {
            this.mail.to = forgotPasswordForm.value.email;
            this.mail.subject = 'Recuperar password';
            this.mail.body = `<h1>Recuperar contraseña</h1>
            <p>Para poder cambiar su contraseña haga click en el siguiente link:</p>
            <a href="${ location.origin }/#/resetpassword/${ resp.user.recoverPasswordId }" target="blank">Recuperar contraseña</a>`;

            this.loading = true;
            this._mailService.send(this.mail)
              .subscribe(
                respMail => {
                  Swal.fire('', respMail.message, 'success');
                  this.loading = false;
                },
                error => {
                  Swal.fire('', error.error.message + '. Contáctese con el administrador.', 'error');
                  this.loading = false;
                }
              );
          } else {
            Swal.fire('', resp.message, 'info');
          }
        });
  }

}
