import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Routes
import { APP_ROUTES } from './app.routes';

// Shared
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';

// Main Component
import { AppComponent } from './app.component';

// Login
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/forgotpassword/resetpassword.component';

// Pages
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PagesComponent } from './pages/pages.component';
import { PacientsSearchComponent } from './pages/search/pacients/pacients-search.component';
import { PacientsComponent } from './pages/pacients/pacients.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { PacientEditComponent } from './pages/pacients/pacient-edit.component';
import { ChangePasswordComponent } from './pages/profile/change-password.component';
import { MeasuresChartComponent } from './pages/pacients/measures-chart.component';

// Plugins
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';

// Pipe
import { NoImagePipe } from './pipes/no-image.pipe';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    PagesComponent,
    RegisterComponent,
    FooterComponent,
    ForgotpasswordComponent,
    PacientsSearchComponent,
    PacientsComponent,
    LoaderComponent,
    PacientEditComponent,
    ResetpasswordComponent,
    NoImagePipe,
    ChangePasswordComponent,
    MeasuresChartComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RecaptchaModule,
    ChartsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
