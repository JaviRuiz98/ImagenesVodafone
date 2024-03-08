import { Component, OnInit } from '@angular/core';
import { credenciales } from '../../interfaces/login';
import { LoginService } from 'src/app/servicios/login/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credenciales: credenciales = {} as credenciales;

  constructor(private LoginService: LoginService, private messageService: MessageService) {}

  iniciarSesion(){
    this.LoginService.verificarUsuario(this.credenciales).subscribe(usuarioVerificado => {
      console.log(usuarioVerificado);
      if (usuarioVerificado === 'El usuario no existe.'){ 
        this.messageService.add({ severity: 'error', summary: 'ERROR!', detail: usuarioVerificado });
      }
    })
  }
}
