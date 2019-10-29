import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { UserService } from '../../services/user/user.service';
import { PacientService } from 'src/app/services/pacient/pacient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public name: string;
  public totalPacients = 0;

  public doughnutChartLabels: Label[] = ['Mujeres', 'Hombres', 'Sin definir'];
  public doughnutChartData: MultiDataSet = [[0, 0, 0]];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartLabels2: Label[] = ['0 - 18', '19 - 35', '36 - 55', '56 - 100'];
  public doughnutChartData2: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartType2: ChartType = 'doughnut';

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _pacientService: PacientService
  ) {

    this.loadDashboard();
  }

  loadDashboard() {
      this.name = this._userService.user.name;
      this._pacientService.getPacients( 0, 10, '', '', this._userService.user._id)
        .subscribe((resp) => {
          this.totalPacients = resp.total;
          const totalFemale = resp.pacients.filter((genderCount) => {
            return genderCount.sex === 'Mujer' || 0;
          });
          const totalMale = resp.pacients.filter((genderCount) => {
            return genderCount.sex === 'Hombre' || 0;
          });
          const totalSd = resp.pacients.filter((genderCount) => {
            return genderCount.sex === 'Sin definir' || 0;
          });

          this.doughnutChartData = [[totalFemale.length, totalMale.length, totalSd.length]];

          const total018 = resp.pacients.filter((genderCount) => {
            return (genderCount.age >= 0 && genderCount.age <= 18) || 0;
          });
          const total1935 = resp.pacients.filter((genderCount) => {
            return (genderCount.age >= 19 && genderCount.age <= 35) || 0;
          });
          const total3655 = resp.pacients.filter((genderCount) => {
            return (genderCount.age >= 36 && genderCount.age <= 55) || 0;
          });
          const total56100 = resp.pacients.filter((genderCount) => {
            return (genderCount.age >= 56 && genderCount.age <= 100) || 0;
          });

          this.doughnutChartData2 = [[total018.length, total1935.length, total3655.length, total56100.length]];

        });
  }

  ngOnInit() {}

}
