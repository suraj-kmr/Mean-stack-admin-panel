import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'src/app/shared/pageTitle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private pageTitleService:PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Dashboard')
  }

}
