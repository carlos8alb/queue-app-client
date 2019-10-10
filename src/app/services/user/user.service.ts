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
      this.user = JSON.parse(localStorage.getItem('user'));
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
        Swal.fire('', errorMessage, 'error');
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
        Swal.fire('Bienvenido', 'El usuario ha sido creado correctamente', 'success');
        return resp.user;
      })
      .catch(err => {
        Swal.fire('', err.error.message, 'error');
        return Observable.throwError(err);
      });
  }

  update( userUpdate: User )  {
    this.url = GLOBAL.url + '/user/update/' + userUpdate._id + '?token=' + this.token;
    return this.http.put(this.url, userUpdate)
      .map((resp: any) => {

        if (userUpdate._id === this.user._id) {
          this.saveStorage(resp.userUpdatedId, this.token, resp.user);
        }

        Swal.fire('', 'El usuario ha sido actualizado correctamente', 'success');
        return resp;
      })
      .catch(err => {
        console.log(err);
        Swal.fire('', err.error.message, 'error');
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
