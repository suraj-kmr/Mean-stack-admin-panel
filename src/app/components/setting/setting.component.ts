import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { PageTitleService } from 'src/app/shared/pageTitle.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingForm: FormGroup
  privacy_policy: String
  terms_and_condition: String
  about_us: String

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    public router: Router,
    private pageTitleService:PageTitleService
  ) {
    this.settingForm = this.fb.group({
      // privacy_policy: [''],
      // terms_and_condition: [''],
      // about_us: [''],
    })
    this.privacy_policy = '';
    this.terms_and_condition = '';
    this.about_us = '';
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Setting')
    this.getSetting().subscribe((res: any) => {
      this.privacy_policy = res.setting.privacy_policy,
      this.terms_and_condition = res.setting.terms_and_condition,
      this.about_us = res.setting.about_us
    })
  }

  getSetting(){
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/setting`;
    return this.http.get(api, { headers: headers_object }).pipe(
      map((res: Response) => {
        return res || {}
      }),
    )
  }

  public onChangePrivacyPolicy(event: CKEditor4.EventInfo) {
    this.privacy_policy = event.editor.getData();
  }

  public onChangeTermCondition(event: CKEditor4.EventInfo) {
    this.terms_and_condition = event.editor.getData();
  }

  public onChangeAboutUs(event: CKEditor4.EventInfo) {
    this.about_us = event.editor.getData();
  }

  updateSetting() {
    var data = {
      privacy_policy: this.privacy_policy,
      terms_and_condition: this.terms_and_condition,
      about_us: this.about_us
    };
    var token = this.authService.getToken();
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    let api = `${this.authService.endpoint}/admin/setting/save-setting`;
    return this.http.post<any>(api, data, { headers: headers_object })
      .subscribe((res: any) => {
        swal.fire({
          text: res.message,
          icon: 'success',
          confirmButtonColor:"#951fa9"
        });
      },
        error => {
          swal.fire({
            text: error.error.message,
            icon: 'error',
            confirmButtonColor:"#951fa9"
          });
        })
  }

}
