import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
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

import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
  providers: [ MessageService, ConfirmationService],
  standalone: true,
  imports: [
    DialogModule,
    SelectorImagenesComponent,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    DropdownModule,
    InputNumberModule
  ],
})




export class NuevoProductoComponent implements OnInit {

  formulario: FormGroup;
  
  dropdownGeneros: any[];


  constructor(private fb: FormBuilder, private uniformesService: UniformesService, private messageService: MessageService, private confirmationService: ConfirmationService) { 
   
    this.formulario = this.fb.group({
      producto: this.fb.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
        precio: new FormControl('', [Validators.required, Validators.minLength(2)]), 
        descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
        imagen: new FormControl(0, [Validators.required, this.fileValidator]), 
        caracteristicas_productos: this.fb.array([]) // Ahora es un FormArray
      }),
     
    });
    this.dropdownGeneros = [
      { name: 'Hombre', code: 'M' },
      { name: 'Mujer', code: 'F' },
      { name: 'Unisex', code: 'U' }
    ];
   
  }


  ngOnInit(): void {

  }

  get genero() { return this.formulario.get('genero') }


  fileValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value;
    if (file instanceof File) {
      return null; // Es un tipo File válido
    } else {
      return { 'invalidFile': true }; // No es un tipo File válido
    }
  }


}
