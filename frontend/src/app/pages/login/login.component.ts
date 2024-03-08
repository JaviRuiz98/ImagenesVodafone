import { Component, OnInit } from '@angular/core';
import { credenciales } from '../../interfaces/login';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credenciales: credenciales = {} as credenciales;

  constructor(private LoginService: LoginService) {}

  iniciarSesion(){
    this.LoginService.verificarUsuario(this.credenciales).subscribe(usuarioVerificado => {
      console.log(usuarioVerificado);
    })
  }
}
