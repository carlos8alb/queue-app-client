import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/users';
import { GLOBAL } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';
import { UploadService } from '../upload/upload.service';

type NewType = UploadService;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public user: User;
  public token: string;
  public notificacion = new EventEmitter<any>();

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _uploadService: UploadService
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
    return this.http.post(this.url, user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      }),
      catchError(err => {
        let errorMessage: string;
        if (err.status === 0) {
          errorMessage = 'Compruebe la conexión a internet. Si el problema persiste, contáctese con el administrador.';
        } else {
          errorMessage = err.error.message;
        }
        Swal.fire('', errorMessage, 'error');
        // return Observable.throwError(err);
        throw err;
      })
    );
  }

  checkCaptcha(data) {
    this.url = GLOBAL.url + '/user/captcha/';
    return this.http.post(this.url, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        throw err;
      })
    );

  }

  recoverPassword(email: string) {
    this.url = GLOBAL.url + '/user/recoverpassword/' + email;
    return this.http.get(this.url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        let errorMessage: string;
        if (err.status === 0) {
          errorMessage = 'Compruebe la conexión a internet. Si el problema persiste, contáctese con el administrador.';
        } else {
          errorMessage = err.error.message;
        }
        Swal.fire('', errorMessage, 'error');
        // return Observable.throwError(err);
        throw err;
      })
    );
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loggedIn() {
    return (localStorage.getItem('token')) ? true : false;
  }

  isTokenExpired() {

    const decoded = jwt_decode(this.token);
    if (decoded.exp === undefined) {
      return false;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    if (date === undefined) {
      return false;
    }

    if (date.valueOf() > new Date().valueOf()) {
      return true;
    } else {
      return false;
    }

  }

  register( user: User )  {
    this.url = GLOBAL.url + '/user/register';
    return this.http.post(this.url, user).pipe(
        map((resp: any) => {
          Swal.fire('Bienvenido', 'El usuario ha sido creado correctamente', 'success');
          return resp.user;
        }),
        catchError(err => {
          Swal.fire('', err.error.message, 'error');
          throw (err);
        })
      );
    }

  update( userUpdate: User )  {
    this.url = GLOBAL.url + '/user/update/' + userUpdate._id + '?token=' + this.token;
    return this.http.put(this.url, userUpdate).pipe(
        map((resp: any) => {
          if (userUpdate._id === this.user._id) {
            this.saveStorage(resp.userUpdatedId, this.token, resp.user);
          }

          Swal.fire('', 'El usuario ha sido actualizado correctamente', 'success');
          return resp;
        }),
        catchError(err => {
          console.log(err);
          Swal.fire('', err.error.message, 'error');
          throw (err);
        })
      );
    }

  logOut() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
  }

  resetPassword( recoverPasswordId: string, body: object )  {
    this.url = GLOBAL.url + '/user/resetpassword/' + recoverPasswordId;
    return this.http.put(this.url, body).pipe(
        map((resp: any) => {
          Swal.fire('', 'La contraseña ha sido actualizada correctamente', 'success');
          return resp;
        }),
        catchError(err => {
          console.log(err);
          Swal.fire('', err.error.message, 'error');
          throw (err);
        })
      );
    }

    changeImage( file: File, userId: string ) {
      return this._uploadService.uploadFile(file, 'user', userId, this.token);
    }

}
