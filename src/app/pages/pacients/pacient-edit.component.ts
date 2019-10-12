import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientService } from '../../services/pacient/pacient.service';
import { Pacient } from '../../models/pacients';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-pacient-edit',
  templateUrl: './pacient-edit.component.html',
  styles: []
})
export class PacientEditComponent implements OnInit {

  pacient: Pacient;
  pacientId = '';
  loading: boolean;
  birthday: string;
  age: number;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.pacientId = params.id;
    });
    moment.locale('es');
    this.loadPacient(this.pacientId);
  }

  ngOnInit() {
  }

  loadPacient(pacientId: String) {
    if (pacientId) {
      this.loading = true;
      this._pacientService.getPacient(this.pacientId)
        .subscribe( (resp: any) => {
          this.pacient = resp.pacient;
          this.birthday = moment(this.pacient.birthday).format('YYYY-MM-DD');
          this.age = moment().diff(this.birthday, 'years', false);
          this.loading = false;
        });
    } else {
      this.pacient = new Pacient('', '', '', '', this._userService.user._id, '', '', '', '', '', '');
    }
  }

  // Cargar edad cuando se ingresa la fecha de nacimiento
  calculateAge(datePickerValue) {
    this.age = moment().diff(datePickerValue, 'years', false);
  }

  onSubmit(pacientForm: NgForm) {
    if (pacientForm.invalid) {
      return;
    }

    if (this.age <= 0) {
      Swal.fire('', 'La fecha de nacimiento ingresada es incorrecta.', 'info');
    }

    if (!this.pacientId) {
      this._pacientService.registerPacient(pacientForm.value)
        .subscribe(resp => {
          this.router.navigate(['/pacient-edit', resp._id])
        });
    } else {
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        type: 'question',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this._pacientService.updatePacient(this.pacientId, pacientForm.value)
            .subscribe(resp => resp.ok);
        } else {
          this.router.navigate(['/pacient-edit', this.pacientId])
          return;
        }
      });
    }
  }

}
