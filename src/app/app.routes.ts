import { RouterModule, Routes } from "@angular/router";

//Pages
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

//Login
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'profile', component: ProfileComponent},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
