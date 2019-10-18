import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientService } from '../../services/pacient/pacient.service';
import { Pacient } from '../../models/pacients';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Antecedent } from 'src/app/models/antecedents';
import { AntecedentService } from '../../services/antecedent/antecedent.service';
import { Measure } from '../../models/measures';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MeasureService } from '../../services/measure/measure.service';

@Component({
  selector: 'app-pacient-edit',
  templateUrl: './pacient-edit.component.html',
  styles: []
})
export class PacientEditComponent implements OnInit {

  pacient: Pacient;
  antecedent: Antecedent;
  measure: Measure;
  pacientId = '';
  loading: boolean;
  birthday: string;
  age: number;
  measures: Array<any> = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _antecedentService: AntecedentService,
    // tslint:disable-next-line: variable-name
    public _measureService: MeasureService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.pacientId = params.id;
    });
    moment.locale('es');
    this.loadPacient(this.pacientId);
  }

  ngOnInit() {}

  loadMeasures(pacientId: string) {
    this._measureService.getMeasures(pacientId)
      .subscribe((respMeasures: any) => {
        // Close modal
        this.measures = respMeasures.measures;
      });
  }

  loadPacient(id: string) {
    if (id) {
      this.loading = true;
      this._pacientService.getPacient(id)
        .subscribe( (respPacient: any) => {
          this.pacient = respPacient.pacient;
          this.birthday = moment(this.pacient.birthday).format('YYYY-MM-DD');
          this.age = moment().diff(this.birthday, 'years', false);

          this._antecedentService.getAntecedent(this.pacient._id)
            .subscribe((respAntecedent: any) => {
              if (respAntecedent.antecedent) {
                this.antecedent = respAntecedent.antecedent;
              } else {
                this.antecedent = new Antecedent('', '', '', '', '', id);
              }

              // Cargar Measures si existen
              this.loadMeasures(id);

              this.loading = false;
            });
        });
    } else {
      // Si el paciente es nuevo porque no hay un id en la url
      this.pacient = new Pacient('', '', '', '', this._userService.user._id, '', '', '', '', '', '');
      this.antecedent = new Antecedent('', '', '', '', '', '');
    }

    this.measure = new Measure(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      moment().format('YYYY-MM-DD'),
      '', id, 'null', '');

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
      this.loading = true;
      this._pacientService.registerPacient(pacientForm.value)
        .subscribe(resp => {
          this.antecedent.pacientId = resp._id;
          this._antecedentService.registerAntecedent(this.antecedent)
          .subscribe(respAntecedent => {
            this.antecedent = respAntecedent.antecedent;
            this.router.navigate(['/pacient-edit', resp._id]);
            this.loading = false;
          });
        });
    } else {
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        type: 'question',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this._pacientService.updatePacient(this.pacientId, pacientForm.value)
            .subscribe(resp => {
              this.loading = false;
            });
        } else {
          this.router.navigate(['/pacient-edit', this.pacientId]);
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
          this.loading = true;
          this._antecedentService.getAntecedent(this.pacientId)
            .subscribe((respAntecedent) => {

              if (respAntecedent.antecedent) {
                this._antecedentService.updateAntecedent(this.pacientId, antecedentsForm.value)
                  .subscribe();
              } else {
                this.antecedent.pacientId = this.pacientId;
                this._antecedentService.registerAntecedent(this.antecedent)
                .subscribe(resp => {
                  this.antecedent = resp;
                  this.router.navigate(['/pacient-edit', resp.pacientId]);
                });
              }

              this.loading = false;

            });
        } else {
          this.router.navigate(['/pacient-edit', this.pacientId]);
          return;
        }
      });
    }
  }

  onSubmitMeasures(measuresForm: NgForm) {
    if (measuresForm.invalid) {
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      type: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        if (this.measure._id) {
          // Update
          this._measureService.updateMeasure(this.measure._id, this.measure)
            .subscribe(() => this.loadMeasures(this.pacientId));
        } else {
           // Register
           this._measureService.registerMeasure(measuresForm.value)
           .subscribe(() => this.loadMeasures(this.pacientId));
        }
        this.loading = false;
        // Close modal
        document.getElementById('closeBtn').click();

      }
    });

  }

  openModal() {

    this.measure = new Measure(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      moment().format('YYYY-MM-DD'),
      '', this.pacientId, 'null', '');

  }

 editMeasure( measureId ) {
    this.loading = true;
    this._measureService.getMeasure(measureId)
          .subscribe(resp => {
            this.measure = resp.measure;
            this.loading = false;
          });
  }

  deleteMeasure( measureId ) {
    Swal.fire({
      title: '¿Desea eliminar los datos?',
      type: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this._measureService.deleteMeasure(measureId)
          .subscribe(resp => {
            this.loadMeasures(this.pacientId);
            this.loading = false;
          });
      }
    });
  }

}
