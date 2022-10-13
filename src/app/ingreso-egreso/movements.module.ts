import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { MovementsOrderPipe } from '../pipes/movements-order.pipe';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { movementsReducer } from './movements.reducer';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';



@NgModule({
  declarations: [

    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,



    MovementsOrderPipe,



    ConfiguracionesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('movements', movementsReducer ),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule
  ]
})
export class MovementsModule { }
