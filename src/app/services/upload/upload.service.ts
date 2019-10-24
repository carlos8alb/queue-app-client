import { Injectable } from '@angular/core';
import { GLOBAL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
  ) { }

  uploadFile(file: File, type: string, id: string, token: string = '') {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('file', file, file.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Error al subir archivo');
            reject(xhr.response);
          }
        }

      };

      const url = GLOBAL.url + '/file/' + type + '/' + id + '?token=' + token;

      xhr.open('POST', url, true);
      xhr.send(formData);

    });


  }

}
