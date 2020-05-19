import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { WesiteLayoutComponent } from './components/layouts/wesite-layout/wesite-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SettingComponent } from './components/setting/setting.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { PageTitleService } from './shared/pageTitle.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AdminLayoutComponent,
    WesiteLayoutComponent,
    ProfileComponent,
    TopbarComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
  ],
  providers: [
    Title,
    PageTitleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
