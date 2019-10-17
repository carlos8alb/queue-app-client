import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/users';
import { map, catchError } from 'rxjs/operators';
import { Measure } from '../../models/measures';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

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

  getMeasures(pacientId) {

    this.url = GLOBAL.url + '/measure/pacient/' + pacientId;
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

  getMeasure(id) {

    this.url = GLOBAL.url + '/measure/' + id;
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

  deleteMeasure(id) {
    this.url = GLOBAL.url + '/measure/' + id + '?token=' + this.token;
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

  registerMeasure( measure: Measure )  {
    this.url = GLOBAL.url + '/measure/register?token=' + this.token;
    return this.http.post(this.url, measure).pipe(
      map((resp: any) => {
        Swal.fire('', 'Los datos han sido creados correctamente', 'success');
        return resp.pacient;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw(err);
      })
      );
  }

  updateMeasure( id, measure: Measure )  {
    this.url = GLOBAL.url + `/measure/update/${ id }?token=${ this.token }`;
    return this.http.put(this.url, measure).pipe(
      map((resp: any) => {
        Swal.fire('', 'Los datos han sido actualizados correctamente', 'success');
        return resp;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw (err);
      })
    );
  }

}

