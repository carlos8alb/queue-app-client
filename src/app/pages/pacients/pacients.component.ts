import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient/pacient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html'
})
export class PacientsComponent implements OnInit {

  pacients: any;
  totalPacients = 0;
  loading = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService
  ) {
    this.loadPacients();
  }

  ngOnInit() {
  }

  loadPacients() {
    this.loading = true;
    this._pacientService.getPacients()
      .subscribe( (resp: any) => {
        this.pacients = resp.pacients;
        this.totalPacients = resp.total;
        this.loading = false;
      });
  }

  deletePacient(pacientId) {
    Swal.fire({
      title: '¿Desea eliminar el paciente?',
      type: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._pacientService.deletePacient(pacientId)
          .subscribe( (resp: any) => {
            this.loadPacients();
          });
      } else {
        return false;
      }
    });
  }

}
