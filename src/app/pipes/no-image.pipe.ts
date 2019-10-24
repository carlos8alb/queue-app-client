import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from '../config/config';
import { UserService } from '../services/user/user.service';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {}


  transform(img: string = 'no-image', type: string = 'user'): any {
    if (img === '') {
      img = 'no-image';
    }
    const url = `${ GLOBAL.url }/file/${ type }/${ img }?token=${ this._userService.token }`;
    return url;
  }

}
