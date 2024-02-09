 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Expositor } from 'src/app/interfaces/expositor';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Add this import 
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
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
    ButtonModule,
    ToastModule
  ],

})




export class NuevoExpositorComponent implements OnInit {

  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() mostrarDialogoNuevoExpositor = new EventEmitter<boolean>();
  
  mostrar: boolean = true;
  messages: Message[] | undefined;
  
  nuevoExpositor!: Expositor;
  
  archivoSeleccionado!: File;

  cargando_procesamiento: boolean = false; // ? para el loading


  constructor( private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  AbrirnuevoExpositor() {
    this.nuevoExpositor = {
      id_expositor: 0,
      nombre: '',
      activo: true,
      imagenes: {
        url:"",
        id_imagen: 0
      },
      procesados_imagenes: []
    };
  }
  
  recibirFile(event: {archivo:File}) {
    this.archivoSeleccionado = event.archivo;
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
    this.cargando_procesamiento = true;
  }

  nuevoGuardar() {
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

  nuevoCancelar() {
    this.mostrar = false;
    this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
  }

  onDialogHidden() {
    this.mostrar = false;
    this.mostrarDialogoNuevoExpositor.emit(this.mostrar);
  }


  ngOnInit(): void {
    this.AbrirnuevoExpositor();
 
  }

}
