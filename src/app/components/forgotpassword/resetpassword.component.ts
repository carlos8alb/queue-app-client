import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styles: []
})
export class ResetpasswordComponent implements OnInit {

  recoverPasswordId = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.recoverPasswordId = params.recoverPasswordId;
    });
  }

  ngOnInit() {
  }

  resetPassword(resetPasswordForm: NgForm) {
    if (resetPasswordForm.invalid) {
      return;
    }

    if ( resetPasswordForm.value.password !== resetPasswordForm.value.repassword ) {
      Swal.fire('', 'Las contraseñas deben ser iguales', 'info');
      return;
    }

    const body: object = {password: resetPasswordForm.value.password};

    this._userService.resetPassword(this.recoverPasswordId, body)
      .subscribe( (resp) => {
        this.router.navigate(['/login']);
      });

  }

}
