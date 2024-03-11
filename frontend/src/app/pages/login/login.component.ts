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
  nuevoUsuario: nuevoUsuario = {} as nuevoUsuario;
  crearUsuario: boolean = false;

  constructor(private LoginService: LoginService, private messageService: MessageService, private router: Router) {}

  iniciarSesion(){
    this.LoginService.verificarUsuario(this.credenciales).subscribe(usuarioVerificado => {
      if (usuarioVerificado === 'El usuario no existe.'){ 
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: usuarioVerificado });
      } else if(usuarioVerificado === 'Contraseña incorrecta!'){
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: usuarioVerificado });
      } else{
        this.router.navigate(['/home']);
      }
    })
  }
  vistaCrearNuevoUsuario(){
    this.crearUsuario = true;
    this.nuevoUsuario = {
      usuario: '',
      repiteUsuario: '',
      password: '',
      repitePassword: '',
    } 
  }
  registrarNuevoUsuario(){
    if(this.nuevoUsuario.password === this.nuevoUsuario.repitePassword && this.nuevoUsuario.usuario === this.nuevoUsuario.repiteUsuario){
      this.LoginService.crearUsuario(this.nuevoUsuario).subscribe(respuesta =>{
        if(respuesta === 'El usuario ya existe.'){
          this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: respuesta });
        } else{
          this.messageService.add({ severity: 'success', summary: 'Confirmado!', detail: respuesta });
          this.router.navigate(['/home']);
        }
      })
    } else{
      this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: 'Las contraseñas o los usuarios no coinciden.' });
    }
  }
}
