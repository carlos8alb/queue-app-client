import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this._userService.logOut();
    // this.router.navigate(['/login']);
  }

}
