import { Component, OnInit } from '@angular/core';
import { credenciales } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credenciales: credenciales = {} as credenciales;

  constructor() { }
  
  ngOnInit(): void {
      
  }
}
