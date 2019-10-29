import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Login
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/forgotpassword/resetpassword.component';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { LoginGuard } from './services/guards/login.guard';

// Pages
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PacientsComponent } from './pages/pacients/pacients.component';
import { PacientsSearchComponent } from './pages/search/pacients/pacients-search.component';
import { PacientEditComponent } from './pages/pacients/pacient-edit.component';
import { ChangePasswordComponent } from './pages/profile/change-password.component';
import { MeasuresChartComponent } from './pages/pacients/measures-chart.component';

const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivateChild: [ LoginGuard ],
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'pacients', component: PacientsComponent},
            {path: 'pacient-edit/new-pacient', component: PacientEditComponent},
            {path: 'pacient-edit/:id', component: PacientEditComponent},
            {path: 'measures-chart/:id', component: MeasuresChartComponent},
            {path: 'search/pacients/:text', component: PacientsSearchComponent},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},
    {path: 'resetpassword/:recoverPasswordId', component: ResetpasswordComponent},
    {path: '**', component: NopagefoundComponent}
];

// export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot( appRoutes, {useHash: true} );
