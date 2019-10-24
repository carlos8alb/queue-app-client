import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userFullName = '';
  img = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) { }

  loadUser() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.userFullName = user.name + ' ' + user.surname;
      this.img = user.img;
    }
  }

  ngOnInit() {
    this.loadUser();
    this._userService.notificacion
      .subscribe((user) => {
        this.userFullName = user.name + ' ' + user.surname;
        this.img = user.img;
      });
  }

  logOut() {
    this._userService.logOut();
    // this.router.navigate(['/login'])
  }

  searchPacients(text) {
    if (text.trim() !== '') {
      this.router.navigate(['/search/pacients/', text]);
    }
  }

}
