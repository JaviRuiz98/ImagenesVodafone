 
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
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';

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
    DropdownModule
  ],

})




export class NuevoExpositorComponent implements OnInit {

  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() mostrarDialogoNuevoExpositor = new EventEmitter<boolean>();
  

  filtro_procesados_form: FormGroup = this.formBuilder.group({
    nombre: '',
    zona:'',
    prompts: [[]],
    respuestas_carteles: [[]],
  });;


  submitted: boolean = false;
  mostrar: boolean = true;
  messages: Message[] | undefined;
  
  nuevoExpositor!: Expositor;
  
  archivoSeleccionado!: File;

  cargando_procesamiento: boolean = false; // ? para el loading

  dropDownZonas: string[] = [];

  constructor(private formBuilder: FormBuilder, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  AbrirnuevoExpositor() {
    this.nuevoExpositor = {
      id: 0,
      nombre: '',
      activo: true,
      imagenes: {
        url:"",
        id_imagen: 0
      },
      categoria: "cartel",
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
<<<<<<< Updated upstream
    this.expositoresService.guardarExpositor(this.nuevoExpositor.nombre, this.nuevoExpositor.activo, this.archivoSeleccionado).subscribe((expositor) => {
      if(expositor.id > 0) {
        this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Expositor guardado correctamente'});
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
      }
    })
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    this.mostrar = false;
    this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
=======
    if(this.nuevoExpositor.nombre == '') {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
      this.submitted = true;
    }else{
      this.expositoresService.guardarExpositor(this.nuevoExpositor.nombre, this.nuevoExpositor.activo, this.archivoSeleccionado).subscribe((expositor) => {
        if(expositor.id_expositor > 0) {
          this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Expositor guardado correctamente'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
        }
      })
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
      this.mostrar = false;
      this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
    }

>>>>>>> Stashed changes
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
    this.expositoresService.getAllZonas().subscribe((zonas)=>{
      this.dropDownZonas = zonas
    })


  }

  ngOnInit(): void {
    this.AbrirnuevoExpositor();
 
  }

}
