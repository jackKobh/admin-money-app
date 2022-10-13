import { Routes } from "@angular/router";
import { ConfiguracionesComponent } from "../ingreso-egreso/configuraciones/configuraciones.component";
import { DetalleComponent } from "../ingreso-egreso/detalle/detalle.component";
import { EstadisticaComponent } from "../ingreso-egreso/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "../ingreso-egreso/ingreso-egreso.component";


export const dashboardRoutes: Routes = [
  { path: '', component: EstadisticaComponent},
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'configuraciones', component: ConfiguracionesComponent }
]
