 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { productos } from 'src/app/interfaces/productos';
// import { carrito } from 'src/app/interfaces/carrito';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, FormControl, Validators  } from '@angular/forms';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { SidebarModule } from 'primeng/sidebar';
import { regiones } from 'src/app/interfaces/regiones';
import { EnumService } from 'src/app/servicios/enum/enum.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [ MessageService, ConfirmationService],
  standalone: true,
  imports: [
    DialogModule,
    SelectorImagenesComponent,
    InputTextModule,
    SidebarModule,
  ]
})



export class CarritoComponent implements OnInit{

  @Input() sidebarVisible: boolean = false; //sin implementar
  // @Input() elemento: elementos = {} as elementos;
  @Output() mostrarDialogoNuevoElemento = new EventEmitter<boolean>();
  // @Output() nuevoElementoCreado = new EventEmitter<elementos>();
 




  ngOnInit(): void {
 
  }






}
