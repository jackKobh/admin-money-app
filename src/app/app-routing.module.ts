import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogginComponent } from './auth/loggin/loggin.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LogginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('./ingreso-egreso/movements.module')
                          .then( m => m.MovementsModule)
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
