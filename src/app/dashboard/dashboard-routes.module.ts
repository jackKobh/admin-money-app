import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
/* import { AuthGuard } from '../services/auth.guard'; */
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent ,
    children: dashboardRoutes,
    /* canActivate: [ AuthGuard ] */
  },
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild( childRoutes ),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
