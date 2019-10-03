import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/users';
import { GLOBAL } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public user: User;
  public token: string;

  constructor(
    public http: HttpClient
  ) {
    this.loadStorage();
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  login(user: User) {
    this.url = GLOBAL.url + '/login';
    return this.http.post(this.url, user)
      .map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      })
      .catch(err => {
        let errorMessage: string;
        if (err.status === 0) {
          errorMessage = 'Compruebe la conexión a internet. Si el problema persiste, contáctese con el administrador.';
        } else {
          errorMessage = err.error.message;
        }
        Swal.fire('Error', errorMessage, 'error');
        return Observable.throwError(err);
      });
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loggedIn() {
    // return (this.token.length > 0) ? true : false;
    return (localStorage.getItem('token')) ? true : false;
  }

  register( user: User )  {
    this.url = GLOBAL.url + '/user/register';
    return this.http.post(this.url, user)
      .map((resp: any) => {
        Swal.fire('Welcome', 'User has been created successfully', 'success');
        return resp.user;
      })
      .catch(err => {
        Swal.fire('Error', err.error.message, 'error');
        return Observable.throwError(err);
      });
  }

  logOut() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
  }

}
