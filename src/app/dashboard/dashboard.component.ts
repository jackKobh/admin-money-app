import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { MovementsService } from '../services/movements.service';

import * as movementsActions from '../ingreso-egreso/movements.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  //Subscriptions
  authSubscription: Subscription;
  movementsSubscribe: Subscription;

  constructor(private store: Store<AppState>,
              private movementsService: MovementsService) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( ({ user }) => {
      this.movementsSubscribe = this.movementsService.initMovementsListener( user.uid )
      .subscribe( movements => {
        this.store.dispatch( movementsActions.setItems({ items: movements}) );
      });
    })
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.movementsSubscribe?.unsubscribe();
  }

}
