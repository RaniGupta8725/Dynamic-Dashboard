import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html'
})
export class UserChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // ✅ Bar chart data
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'User Ages',
        data: [],
        backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50', '#009688']
      }
    ]
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.barChartData.labels = users.map(u => u.name);
      this.barChartData.datasets[0].data = users.map(u => u.age);
      this.chart?.update(); // 🔁 Force chart to update
    });
  }
}
