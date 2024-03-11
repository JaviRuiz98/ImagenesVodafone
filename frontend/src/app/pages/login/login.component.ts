import { Component, OnInit } from '@angular/core';
import { credenciales } from '../../interfaces/login';
import { LoginService } from 'src/app/servicios/login/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { nuevoUsuario } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credenciales: credenciales = {} as credenciales;
  crearUsuario: boolean = false;
  nuevoUsuario: nuevoUsuario = {} as nuevoUsuario;

  constructor(private LoginService: LoginService, private messageService: MessageService, private router: Router) {}

  iniciarSesion(){
    this.LoginService.verificarUsuario(this.credenciales).subscribe(usuarioVerificado => {
      console.log(usuarioVerificado);
      if (usuarioVerificado === 'El usuario no existe.'){ 
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: usuarioVerificado });
      } else if(usuarioVerificado === 'La contraseña es incorrecta.'){
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: usuarioVerificado });
      }
      

      else{
        this.router.navigate(['/home']);
      }
    })
  }
  vistaCrearNuevoUsuario(){
    this.crearUsuario = true;
    this.nuevoUsuario = {} as nuevoUsuario;
  }
  registrarNuevoUsuario(){
    this.LoginService.crearUsuario(this.nuevoUsuario).subscribe(respuesta =>{
      console.log(respuesta);
    })
  }
}
