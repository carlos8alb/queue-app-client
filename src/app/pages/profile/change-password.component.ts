import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  oldPassword = '';
  newPassword = '';
  reNewPassword = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit(changePasswordform: NgForm) {
    if (changePasswordform.invalid) {
      return;
    }

    this.oldPassword = changePasswordform.value.oldPassword;
    this.newPassword = changePasswordform.value.newPassword;
    this.reNewPassword = changePasswordform.value.reNewPassword;

    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      reNewPassword: this.reNewPassword
    };

    console.log(body);

    if (  this.newPassword.length < 6 ) {
      Swal.fire('', 'La contraseña debe tener al menos 6 caracteres', 'info');
      return;
    }

    if ( this.newPassword !== this.reNewPassword ) {
      Swal.fire('', 'Las contraseñas no son iguales', 'info');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      type: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {

        this._userService.changePassword(this._userService.user._id, body)
          .subscribe(
            resp => {
              this._userService.user = resp.user;
              this.oldPassword = '';
              this.newPassword = '';
              this.reNewPassword = '';
            }
        );
      }
    });
  }

}
