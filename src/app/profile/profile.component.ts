import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { PageTitleService } from '../shared/pageTitle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  passwordForm: FormGroup
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File
  image_Url: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png"
  fileName: string = "No file selected"

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    public router: Router,
    private pageTitleService: PageTitleService
  ) {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      address: [''],
    })
    this.passwordForm = this.fb.group({
      new_password: [''],
      confirm_password: ['']
    })
  }

  ngOnInit(): void {   
    this.pageTitleService.setTitle('Profile')
    this.getUserProfile().subscribe((res: any) => {
      // console.log(res.users)
      this.profileForm.controls['first_name'].setValue(res.users.first_name);
      this.profileForm.controls['last_name'].setValue(res.users.last_name);
      this.profileForm.controls['email'].setValue(res.users.email);
      this.profileForm.controls['phone'].setValue(res.users.phone);
      if (res.users.address !== undefined) {
        this.profileForm.controls['address'].setValue(res.users.address);
      }
      this.image_Url = this.authService.endpoint + res.users.profile_pic;
    })
  }

  // User profile
  getUserProfile(): Observable<any> {
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/user-profile`;
    return this.http.get(api, { headers: headers_object }).pipe(
      map((res: Response) => {
        return res || {}
      }),
    )
  }

  updateProfile() {
    var data = this.profileForm.value;
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/profile-update`;
    return this.http.post<any>(api, data, { headers: headers_object })
      .subscribe((res: any) => {
        swal.fire({
          text: res.message,
          icon: 'success',
          confirmButtonColor: "#951fa9"
        });
      },
        error => {
          swal.fire({
            text: error.error.message,
            icon: 'error',
            confirmButtonColor: "#951fa9"
          });
        })
  }

  changePassword() {
    var data = this.passwordForm.value;
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/change-password`;
    return this.http.post<any>(api, data, { headers: headers_object })
      .subscribe((res: any) => {
        swal.fire({
          text: res.message,
          icon: 'success',
          confirmButtonColor: "#951fa9"
        });
      },
        error => {
          swal.fire({
            text: error.error.message,
            icon: 'error',
            confirmButtonColor: "#951fa9"
          });
        })
  }

  onChange(event) {

    let formData = new FormData();
    formData.append("profile_pic", event.target.files[0]);
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/upload-profile`;
    return this.http.post<any>(api, formData, { headers: headers_object })
      .subscribe((res: any) => {
        swal.fire({
          text: res.message,
          icon: 'success',
          confirmButtonColor: "#951fa9"
        });
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = event => {
          this.image_Url = reader.result;
        };
      },
        error => {
          swal.fire({
            text: error.error.message,
            icon: 'error',
            confirmButtonColor: "#951fa9"
          });
        })




  }
}
