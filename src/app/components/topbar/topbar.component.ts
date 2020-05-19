import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from 'src/app/shared/pageTitle.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  header:String
  constructor(
    public authService: AuthService,
    private pageTitleService: PageTitleService
    ) { }

  ngOnInit(): void {
    this.pageTitleService.title.subscribe((val: string) => {
      this.header = val;
    });
  }

  logout() {
    this.authService.doLogout()
  }

}
