import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';
import { FormsModule } from '@angular/forms';

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
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
