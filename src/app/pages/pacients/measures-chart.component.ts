import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { MeasureService } from 'src/app/services/measure/measure.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { PacientService } from '../../services/pacient/pacient.service';

@Component({
  selector: 'app-measures-chart',
  templateUrl: './measures-chart.component.html',
  styles: []
})
export class MeasuresChartComponent implements OnInit {

  public fullName: any;
  public pacientId = '';

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {data: [0], label: ''}
  ];

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _measuresService: MeasureService,
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.pacientId = params.id;
      this._pacientService.getPacient(this.pacientId)
      .subscribe((resp) => {
        this.fullName = resp.pacient.surname + ', ' + resp.pacient.name;
      });
    });
    this.loadBars();
  }

  loadBars() {
    this._measuresService.getMeasures(this.pacientId)
      .subscribe((resp) => {
        this.barChartLabels = resp.measures.map((measures) => {
          return moment(measures.date).format('MM-YYYY');
        });
        // ['Peso Actual', 'IMC', 'Abdominal', 'Cintura Min', 'Caderas Max', 'Biceps', 'Triceps'];
        const dataPesoActual = resp.measures.map(measures => measures.pesoActual);
        const dataIMC = resp.measures.map(measures => measures.imc);
        const dataAbdominal = resp.measures.map(measures => measures.abdominal);
        const dataCinturaMinima = resp.measures.map(measures => measures.cinturaMinima);
        const dataCaderasMaxima = resp.measures.map(measures => measures.caderasMaxima);
        const dataBiceps = resp.measures.map(measures => measures.biceps);
        const dataTriceps = resp.measures.map(measures => measures.triceps);

        this.barChartData = [
          {data: dataPesoActual, label: 'Peso actual'},
          {data: dataIMC, label: 'IMC'},
          {data: dataAbdominal, label: 'Abdominal'},
          {data: dataCinturaMinima, label: 'Cintura Min'},
          {data: dataCaderasMaxima, label: 'Caderas Max'},
          {data: dataBiceps, label: 'Biceps'},
          {data: dataTriceps, label: 'Triceps'},
        ];

      });
  }

  ngOnInit() {}

}
