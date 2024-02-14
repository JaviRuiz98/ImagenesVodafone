 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Expositor } from 'src/app/interfaces/expositor';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
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

import { regiones } from 'src/app/interfaces/regiones';

@Component({
  selector: 'app-nuevo-expositor',
  templateUrl: './nuevo-expositor.component.html',
  styleUrls: ['./nuevo-expositor.component.css'],
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




export class NuevoExpositorComponent implements OnInit {

  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() mostrarDialogoNuevoExpositor = new EventEmitter<boolean>();

  nuevoExpositor_form: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    activo: new FormControl(false),
    id_region: new FormControl(0, Validators.required),
    id_imagen: new FormControl(0, Validators.required),
    categoria: new FormControl('', Validators.required),
    numero_dispositivos: new FormControl(0),
  });


  formData  = this.nuevoExpositor_form?.value;

  submitted: boolean = false;
  mostrar: boolean = true;
  messages: Message[] | undefined;
  n_dispositivos: number = 0;
  
  nuevoExpositor!: Expositor;
  
  archivoSeleccionado!: File;

  cargando_procesamiento: boolean = false; // ? para el loading

  Dropdown_regiones: string[] = [];
  Dropdown_categorias: string[] = ["Carteles", "Dispositivos"];

  constructor(private formBuilder: FormBuilder, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  AbrirnuevoExpositor() {
    this.nuevoExpositor = {
      id: 0,
      imagenes: {
        url:"",
        id_imagen: 0
      },
      region: {
        id: 0,
        nombre: ''
      },
      nombre: '',
      activo: true,
      categoria: "",
      procesados_imagenes: []
    };
    this.submitted = false;
  }
  
  recibirFile(event: {archivo:File}) {
    this.archivoSeleccionado = event.archivo;
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
    this.cargando_procesamiento = true;
  }

  nuevoGuardar() {
    if(this.nuevoExpositor.nombre == '') {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
      this.submitted = true;
    }else{
      this.expositoresService.guardarExpositor(this.nuevoExpositor.nombre, this.nuevoExpositor.activo, this.archivoSeleccionado).subscribe((expositor) => {
        if(expositor.id> 0) {
          this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Expositor guardado correctamente'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
        }
      })
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
      this.mostrar = false;
      this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
    }

  }

  nuevoCancelar() {
    this.mostrar = false;
    this.submitted = false;
    this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
  }

  onDialogHidden() {
    this.mostrar = false;
    this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
  }


  inicializaDropDownZonas(){
    this.expositoresService.getAllRegiones().subscribe((regiones)=>{
      this.Dropdown_regiones = regiones
    })
  }

 

  ngOnInit(): void {
    this.AbrirnuevoExpositor();
    this.inicializaDropDownZonas();
  }

  get categoria() { return this.nuevoExpositor_form.get('categoria') }
}
