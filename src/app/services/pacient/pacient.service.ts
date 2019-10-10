import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class PacientService {

  public url: string;
  public token: string;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.token = this._userService.token;
  }

  getPacients(from = 0, itemsPage = 10, sortBy = '', textSearched = '') {

    this.url = GLOBAL.url + '/pacient?from=' + from + '&itemspage=' + itemsPage + '&sortby=' + sortBy + '&textSearched=' + textSearched;
    return this.http.get(this.url)
      .map((resp: any) => {
        return resp;
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

  deletePacient(pacientId) {
      this.url = GLOBAL.url + '/pacient/' + pacientId + '?token=' + this.token;
      return this.http.delete(this.url)
        .map((resp: any) => {
          return resp;
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

}
