import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/users';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  name = '';
  surname =  '';
  imageUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    public router: Router
  ) {
    this.loadUser();
   }

   loadUser() {
    this.user = this._userService.user;
    this.name = this.user.name;
    this.surname = this.user.surname;
   }

  ngOnInit() {
  }

  onSubmit(userProfileform: NgForm) {
    if (userProfileform.invalid) {
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      type: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.user.name = userProfileform.value.name;
        this.user.surname = userProfileform.value.surname;

        this._userService.update(this.user)
          .subscribe(
            resp => {
              this._userService.user = resp.user;
              this._userService.notificacion.emit(resp.user);
            }
        );
      } else {
        this.router.navigate(['/profile']);
        return;
      }
    });

  }

  openUploadImage() {
    document.getElementById('uploadInput').click();
  }

  selectImage(file: File) {

    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.imageUpload = null;
      Swal.fire('', 'El archivo seleccionado no es una imagen', 'info');
      return;
    }

    Swal.fire({
        title: '¿Desea cambiar la foto de perfil?',
        type: 'question',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.imageUpload = file;
          // Reader es para cargar la imagen temporal sin enviar a la base de datos
          // const reader = new FileReader();
          // reader.onloadend = () => {
          //   this.imageTemp = reader.result;
          // };
          this.uploadImage();
        } else {
          document.getElementById('uploadInput').value = '';
        }
      });

  }

uploadImage() {
    this._userService.changeImage(this.imageUpload, this.user._id)
      .then((resp: any) => {
        this.user.img = resp.modelUpdated.img;
        this._userService.saveStorage(this.user._id, this._userService.token, this.user);
        this._userService.notificacion.emit(this.user);
        Swal.fire('', 'Imagen actualizada', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
