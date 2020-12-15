import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName:string = '';

  //subscribes
  userSubscribe: Subscription;
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscribe = this.store.select('auth')
    .pipe(
      filter(({ user }) => user != null)
    )
    .subscribe( ({ user }) => this.userName = user.nombre );
  }

  ngOnDestroy() {
    this.userSubscribe.unsubscribe();
  }

  logout() {
    this.authService.logout()
    .then( () => {
      this.router.navigate(['/login']);
    })
  }

}
