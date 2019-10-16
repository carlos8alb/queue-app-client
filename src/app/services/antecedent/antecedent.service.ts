import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/users';
import { Pacient } from 'src/app/models/pacients';
import { map, catchError } from 'rxjs/operators';
import { Antecedent } from '../../models/antecedents';

@Injectable({
  providedIn: 'root'
})
export class AntecedentService {

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

  getAntecedent(pacientId) {

    this.url = GLOBAL.url + '/antecedent/' + pacientId;
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
          // Swal.fire('', errorMessage, 'error');
          throw (err);
        })
      );
    }

  registerAntecedent( antecedent: Antecedent )  {
    this.url = GLOBAL.url + '/antecedent/register?token=' + this.token;
    return this.http.post(this.url, antecedent).pipe(
      map((resp: any) => {
        Swal.fire('', 'Los antecedentes han sido cargados correctamente', 'success');
        return resp.antecedent;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw(err);
      })
      );
  }

  updateAntecedent( pacientId, antecedent: Antecedent )  {
    this.url = GLOBAL.url + `/antecedent/update/${ pacientId }?token=${ this.token }`;
    return this.http.put(this.url, antecedent).pipe(
      map((resp: any) => {
        Swal.fire('', 'Los antecedentes han sido actualizados correctamente', 'success');
        return resp;
      }),
      catchError(err => {
        Swal.fire('', err.error.message, 'error');
        throw (err);
      })
    );
  }

}
