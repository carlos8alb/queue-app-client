import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacients-search',
  templateUrl: './pacients-search.component.html',
  styles: []
})
export class PacientsSearchComponent implements OnInit {

  textSearched = '';

  constructor(
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.textSearched = params.text;
    });
  }

}
