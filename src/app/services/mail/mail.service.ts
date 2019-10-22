import { Injectable } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public url: string;

  constructor(
    public http: HttpClient
  ) { }

  send( mail: Mail )  {
    this.url = GLOBAL.url + '/mail/send';
    return this.http.post(this.url, mail).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError(err => {
        throw(err);
      })
      );
  }

}
