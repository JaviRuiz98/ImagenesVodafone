 
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

  @Input() categoriaPredefinida: string = ''; //sin implementar
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() mostrarDialogoNuevoExpositor = new EventEmitter<boolean>();
  @Output() nuevoExpositorCreado = new EventEmitter<Expositor>();

  nuevoExpositor_form: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    activo: new FormControl(false),
    region: new FormControl('', [Validators.required, Validators.minLength(2)]),  // interfaz
    imagen: new FormControl(0, [Validators.required, this.fileValidator]), // interfaz ?
    categoria: new FormControl('', Validators.required ),                                            //////// POR AQUI
    numero_dispositivos: new FormControl(0), 
  });


  formData  = this.nuevoExpositor_form?.value;

  submitted: boolean = false;
  mostrar: boolean = true;
  messages: Message[] | undefined;
  n_dispositivos: number = 0;
  
  nuevoExpositor!: Expositor;
  
  archivoSeleccionado!: File;
 
  bloqueaCategoria: boolean = false;
  regiones: regiones[] = [];
  Dropdown_regiones: string[] = [];
  Dropdown_categorias: string[] = ["Carteles", "Dispositivos"];

  constructor(private formBuilder: FormBuilder, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  AbrirnuevoExpositor() {
    if(this.categoriaPredefinida != '') {
      this.nuevoExpositor_form.patchValue({ categoria: this.categoriaPredefinida });
      this.bloqueaCategoria = true;
    } 
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
      categoria: this.categoriaPredefinida,
      procesados_imagenes: []
    };
    this.submitted = false;
  }
  
  recibirFile(event: {archivo:File}) {
    this.nuevoExpositor_form.patchValue({ imagen: event.archivo });
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
  }

  onRegionChange(event: any) {
    const selectedRegionValue = this.regiones.find((region) => region.nombre === event.value);
    this.nuevoExpositor_form.patchValue({ region: selectedRegionValue });
  }

  nuevoGuardar() {
    console.log(this.nuevoExpositor_form.get('nombre')?.value);
    if(this.nuevoExpositor_form.get('nombre')?.value == '') {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Expositor no guardado'});
      this.submitted = true;
    }else{
      this.expositoresService.guardarExpositor(this.nombre?.value, this.nuevoExpositor.activo, this.region?.value, this.imagen?.value, this.categoria?.value, this.numero_dispositivos?.value).subscribe((expositor) => {
        if(expositor.id> 0) {
          this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Expositor guardado correctamente'});
          this.nuevoExpositorCreado.emit(expositor);
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
      this.regiones = regiones;
      this.Dropdown_regiones = regiones.map((region) => region.nombre);
    })
  }

 

  ngOnInit(): void {
    this.AbrirnuevoExpositor();
    this.inicializaDropDownZonas();
  }



  get categoria() { return this.nuevoExpositor_form.get('categoria')}
  get nombre() { return this.nuevoExpositor_form.get('nombre') }
  get region() { return this.nuevoExpositor_form.get('region') }
  get numero_dispositivos() { return this.nuevoExpositor_form.get('numero_dispositivos') }
  get imagen() { return this.nuevoExpositor_form.get('imagen') }



 fileValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value;
    if (file instanceof File) {
      return null; // Es un tipo File válido
    } else {
      return { 'invalidFile': true }; // No es un tipo File válido
    }
  }


  validateNumeroDispositivos(control: FormControl): {[key: string]: any} | null {
    if (!control.parent || !control.parent.get('categoria')) {
      return null; // No hay control 'categoria' padre
    }
  
    const categoriaValor = control.parent.get('categoria')?.value;
    if (categoriaValor === 'Dispositivos' && control.value <= 0) {
      return {'invalido': true};
    }
  
    return null;
  }

 


}
