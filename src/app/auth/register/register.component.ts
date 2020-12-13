import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email] ],

      password: ['', Validators.required ]
    })
  }

  ngOnInit(): void {

  }

  crearUsuario() {
    if ( this.registroForm.invalid ) return;

    Swal.fire({
      title: 'Espere por favor!',

      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.createUser(nombre, correo, password)
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
