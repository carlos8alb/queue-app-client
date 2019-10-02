import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
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

  onSubmit(registerForm: NgForm) {

    if (registerForm.invalid) {
      return;
    }

    if (registerForm.value.password !== registerForm.value.repassword ) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (registerForm.value.password.length < 6) {
      Swal.fire('Error', 'La contraseña debe contener al menos 6 caracteres', 'error');
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
