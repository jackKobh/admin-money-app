import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styles: [
  ]
})
export class LogginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    })
   }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm);
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
    if ( this.loginForm.invalid ) return;


    Swal.fire({
      title: 'Espere por favor!',

      didOpen: () => {
        Swal.showLoading()
      }
    });



    const { correo, password } = this.loginForm.value;
    this.authService.login( correo, password)
    .then( credenciales => {
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/']);
    } )
    .catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
    }))
  }

}
