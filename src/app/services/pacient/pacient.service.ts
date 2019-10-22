import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/users';
import { Pacient } from 'src/app/models/pacients';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  public url: string;
  public token: string;
  public user: User;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.token = this._userService.token;
    this.user = this._userService.user;
  }

  getPacients(from = 0, itemsPage = 10, sortBy = '', textSearched = '', userId) {

    this.url = GLOBAL.url + '/pacient?from=' + from + '&itemspage=' + itemsPage + '&sortby=' +
               sortBy + '&textSearched=' + textSearched + '&userId=' + userId;
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
          throw (err);
        })
      );
    }

  getPacient(pacientId) {

    this.url = GLOBAL.url + '/pacient/' + pacientId;
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
          throw (err);
        })
      );
    }

  deletePacient(pacientId) {
    this.url = GLOBAL.url + '/pacient/' + pacientId + '?token=' + this.token;
    return this.http.delete(this.url).pipe(
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
          throw(err);
        })
      );
  }

  registerPacient( pacient: Pacient )  {
    this.url = GLOBAL.url + '/pacient/register?token=' + this.token;
    return this.http.post(this.url, pacient).pipe(
      map((resp: any) => {
        Swal.fire('', 'El paciente ha sido creado correctamente', 'success');
        return resp.pacient;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw(err);
      })
      );
  }

  updatePacient( pacientId, pacient: Pacient )  {
    this.url = GLOBAL.url + `/pacient/update/${ pacientId }?token=${ this.token }`;
    return this.http.put(this.url, pacient).pipe(
      map((resp: any) => {
        Swal.fire('', 'El paciente ha sido actualizado correctamente', 'success');
        return resp;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw (err);
      })
    );
  }

}
