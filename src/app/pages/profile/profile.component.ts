import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/users';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  name = '';
  surname =  '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) {
    this.user = this._userService.user;
    this.name = this.user.name;
    this.surname = this.user.surname;
   }

  ngOnInit() {

  }

  onSubmit(userProfileform: NgForm) {
    if (userProfileform.invalid) {
      return;
    }

    this.user.name = userProfileform.value.name;
    this.user.surname = userProfileform.value.surname;

    this._userService.update(this.user)
      .subscribe(
        resp => {
          this._userService.user = resp.user;
        }
    );

  }

}
