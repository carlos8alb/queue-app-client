import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Pages
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Login
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { LoginGuard } from './services/guards/login.guard';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
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

// export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot( appRoutes, {useHash: true} );
