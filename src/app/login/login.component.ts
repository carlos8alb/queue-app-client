import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {

    if (loginForm.invalid) {
      console.log('Error');
      return;
    }

    console.log(loginForm.value.email);
    console.log(loginForm.value.password);
    console.log(loginForm.value);
  }

}
