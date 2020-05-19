import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  current_url: string
  constructor(private router: Router) { 
    this.current_url= ''
   }

  ngOnInit(): void {
    this.current_url = this.router.url 
  }

}
