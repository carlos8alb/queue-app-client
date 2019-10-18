import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient/pacient.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html'
})
export class PacientsComponent implements OnInit {

  pacients: any;
  totalPacients = 0;
  loading = true;
  user: User;
  itemsPerPage = 10;

  constructor(
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.user = this._userService.user;
    this.loadPacients();
  }

  ngOnInit() {
  }

  loadPacients() {
    this.loading = true;
    this._pacientService.getPacients(0, 10, '', '', this.user._id)
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
