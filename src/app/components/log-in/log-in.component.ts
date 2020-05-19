import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  public errorMessage: string = '';
  public successMessage: string = '';

  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      role: ['Admin']
    })
  }

  ngOnInit(): void {
    var redirect = this.authService.getToken();
    if(redirect){
      this.router.navigate(['admin/dashboard']);
    }
  }

  loginUser() {
    return this.http.post<any>(`${this.authService.endpoint}/admin/authenticate`, this.signinForm.value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.accessToken)
        this.router.navigate(['admin/dashboard'])
      },
        error => {
          console.log(error.error.message)
          this.errorMessage = error.error.message;
        }
      )
  }

  
}
