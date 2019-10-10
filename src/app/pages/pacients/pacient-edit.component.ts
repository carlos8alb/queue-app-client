import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacient-edit',
  templateUrl: './pacient-edit.component.html',
  styles: []
})
export class PacientEditComponent implements OnInit {

  pacientId = '';

  constructor(
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.pacientId = params.id;
    });
  }

  ngOnInit() {
  }

}
