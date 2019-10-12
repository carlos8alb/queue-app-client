import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientService } from '../../../services/pacient/pacient.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-pacients-search',
  templateUrl: './pacients-search.component.html',
  styles: []
})
export class PacientsSearchComponent implements OnInit {

  textSearched = '';
  pacients: any;
  totalPacients = 0;
  loading = false;
  user: User;

  constructor(
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.user = this._userService.user;
    this.loadPacients();
  }

  loadPacients() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.textSearched = params.text;
      this._pacientService.getPacients(0, 10, '', this.textSearched, this.user._id)
        .subscribe( (resp: any) => {
          this.pacients = resp.pacients;
          this.totalPacients = resp.total;
          this.loading = false;
        });
    });
  }

  ngOnInit() {}

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
