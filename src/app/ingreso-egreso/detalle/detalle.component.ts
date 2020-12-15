import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Movement } from 'src/app/models/ingreso-egreso.model';
import { MovementsService } from 'src/app/services/movements.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy{

  //Subscribes
  movementsSubscribe: Subscription;

  movements: Movement[] = [];
  constructor( private store: Store<AppState>,
              private movementsService: MovementsService ) { }

  ngOnInit(): void {
    this.movementsSubscribe = this.store.select('movements')
    .subscribe(({ items }) => this.movements = items );
  }

  ngOnDestroy() {
    this.movementsSubscribe.unsubscribe();
  }

  borrar(uid:string) {
    console.log(uid)
    this.movementsService.deleteMovement(uid)
    .then( response => {
      Swal.fire('Genial!', 'Item eliminado', 'success');
      console.log(response)
    })
    .catch(err => Swal.fire('Ho rayos!', err.message, 'error'));
  }

}
