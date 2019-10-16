import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientService } from '../../services/pacient/pacient.service';
import { Pacient } from '../../models/pacients';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';
import { Antecedent } from 'src/app/models/antecedents';
import { AntecedentService } from '../../services/antecedent/antecedent.service';

@Component({
  selector: 'app-pacient-edit',
  templateUrl: './pacient-edit.component.html',
  styles: []
})
export class PacientEditComponent implements OnInit {

  pacient: Pacient;
  antecedent: Antecedent;
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
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _antecedentService: AntecedentService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.pacientId = params.id;
    });
    moment.locale('es');
    this.loadPacient(this.pacientId);
  }

  ngOnInit() {
  }

  loadPacient(pacientId: string) {
    if (pacientId) {
      this.loading = true;
      this._pacientService.getPacient(this.pacientId)
        .subscribe( (respPacient: any) => {
          this.pacient = respPacient.pacient;
          this.birthday = moment(this.pacient.birthday).format('YYYY-MM-DD');
          this.age = moment().diff(this.birthday, 'years', false);

          this._antecedentService.getAntecedent(this.pacientId)
            .subscribe((respAntecedent: any) => {
              if (respAntecedent.antecedent) {
                this.antecedent = respAntecedent.antecedent;
              } else {
                this.antecedent = new Antecedent('', '', '', '', '', this.pacientId);
              }
              this.loading = false;
            });
        });
    } else {
      this.pacient = new Pacient('', '', '', '', this._userService.user._id, '', '', '', '', '', '');
      this.antecedent = new Antecedent('', '', '', '', '', '');
    }
  }

  // Cargar edad cuando se ingresa la fecha de nacimiento
  calculateAge(datePickerValue) {
    this.age = moment().diff(datePickerValue, 'years', false);
  }

  onSubmitPacient(pacientForm: NgForm) {
    if (pacientForm.invalid) {
      return;
    }

    if (this.age <= 0) {
      Swal.fire('', 'La fecha de nacimiento ingresada es incorrecta.', 'info');
    }

    if (!this.pacientId) {
      this._pacientService.registerPacient(pacientForm.value)
        .subscribe(resp => {
          this.antecedent.pacientId = resp._id;
          this._antecedentService.registerAntecedent(this.antecedent)
          .subscribe(respAntecedent => {
            this.antecedent = respAntecedent.antecedent;
            this.router.navigate(['/pacient-edit', resp._id]);
          });
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
          this.router.navigate(['/pacient-edit', this.pacientId]);
          return;
        }
      });
    }
  }

  onSubmitAntecedent(antecedentsForm: NgForm) {
    if (antecedentsForm.invalid) {
      return;
    }

    if (!this.pacientId) {
      Swal.fire('', 'Primero debe guardar los datos personales del paciente', 'info');
    } else {
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        type: 'question',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this._antecedentService.updateAntecedent(this.pacientId, antecedentsForm.value)
            .subscribe(resp => resp.ok);
        } else {
          this.router.navigate(['/pacient-edit', this.pacientId]);
          return;
        }
      });
    }
  }

}
