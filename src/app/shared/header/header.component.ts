import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userFullName = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.userFullName = user.name + ' ' + user.surname;
    }
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
