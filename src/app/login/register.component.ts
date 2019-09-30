import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(registerForm: NgForm) {

    if (registerForm.invalid) {
      console.log('Error');
      return;
    }

    if (registerForm.value.password !== registerForm.value.repassword ){
      alert('Las contraseñas no coinciden');
      return;
    }

    if (registerForm.value.password.length < 6) {
      alert('Las contraseña debe contener al menos 6 caracteres');
      return;
    }

    console.log(registerForm.value.name);
    console.log(registerForm.value.surname);
    console.log(registerForm.value.email);
    console.log(registerForm.value.password);
    console.log(registerForm.value);
  }

}
