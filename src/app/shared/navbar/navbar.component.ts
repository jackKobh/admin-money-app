import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  userName: string = '';
  //subscribes
  userSubscribe: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscribe = this.store.select('auth')
    .pipe(
      filter(({ user }) => user != null)
    )
    .subscribe( ({ user }) => this.userName = user.nombre );
  }

}
