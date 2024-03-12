 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { elementos } from 'src/app/interfaces/elementos';
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

import { regiones } from 'src/app/interfaces/regiones';
import { EnumService } from 'src/app/servicios/enum/enum.service';


@Component({
  selector: 'app-nuevo-elemento',
  templateUrl: './nuevo-elemento.component.html',
  styleUrls: ['./nuevo-elemento.component.css'],
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
 
  
export class NuevoElementoComponent implements OnInit {

  @Input() categoriaPredefinida: number = 0; //sin implementar
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() mostrarDialogoNuevoElemento = new EventEmitter<boolean>();
  @Output() nuevoElementoCreado = new EventEmitter<elementos>();

  nuevoElemento_form: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    region: new FormControl('', [Validators.required, Validators.minLength(2)]), 
    imagen: new FormControl(0, [Validators.required, this.fileValidator]), 
    categoria: new FormControl('', Validators.required ),
  
  });

  formData  = this.nuevoElemento_form?.value;

  submitted: boolean = false;
  mostrar: boolean = true;
  messages: Message[] | undefined;
  n_dispositivos: number = 0;
  
  nuevoElemento!: elementos;

  archivoSeleccionado!: File;
 
  bloqueaCategoria: boolean = false;
  regiones: regiones[] = [];
  Dropdown_regiones: string[] = [];

  categorias_elementos: categorias_elementos[] = [];
  Dropdown_categorias: string[] = [];
  categoriaSeleccionada = 'Carteles';
  constructor(private formBuilder: FormBuilder, private elementosService: ElementosService, private messageService: MessageService, private enumService: EnumService, private confirmationService: ConfirmationService) { }

  AbrirnuevoElemento() {
    if(this.categoriaPredefinida != 0) {
      this.nuevoElemento_form.patchValue({ categoria: this.categoriaPredefinida });
      this.bloqueaCategoria = true;
    } 
  }
  
  recibirFile(event: {archivo:File}) {
    this.nuevoElemento_form.patchValue({ imagen: event.archivo });
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
  }

  onRegionChange(event: any) {
    const selectedRegionValue = this.regiones.find((region) => region.nombre === event.value);
    this.nuevoElemento_form.patchValue({ region: selectedRegionValue });
  }

  onCategoriaChange(event: any) {
    const selectedCategoriaValue = this.categorias_elementos.find((categoria) => categoria.nombre === event.value);
    this.nuevoElemento_form.patchValue({ categoria: selectedCategoriaValue });
  }


  nuevoGuardar() {
    console.log(this.nuevoElemento_form.get('nombre')?.value);
    if(this.nombre?.invalid || this.region?.invalid || this.imagen?.invalid || this.categoria?.invalid ) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Elemento no guardado'});
      this.submitted = true;
    }else{
 
      this.elementosService.guardarElemento(this.nombre?.value,  this.imagen?.value, this.categoria?.value.id).subscribe((elemento) => {
        if(elemento.id> 0) {
          this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Elemento guardado correctamente'});
          this.nuevoElementoCreado.emit(elemento);
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Elemento no guardado'});
        }
      })
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
      this.mostrar = false;
      this.mostrarDialogoNuevoElemento.emit(this.mostrar);
    }
  }

  nuevoCancelar() {
    this.mostrar = false;
    this.submitted = false;
    this.mostrarDialogoNuevoElemento.emit(this.mostrar);
  }

  onDialogHidden() {
    this.mostrar = false;
    this.mostrarDialogoNuevoElemento.emit(this.mostrar);
  }


  inicializaDropDownZonas(){
    this.enumService.getAllRegiones().subscribe((regiones)=>{
      this.regiones = regiones;
  //    this.Dropdown_regiones = regiones.map((region) => region.nombre);
    })
  }

  inicializaCategorias_elementos(){
    this.enumService.getCategorias_elementos().subscribe((categorias: categorias_elementos[])=>{
     // this.Dropdown_categorias = categorias.map((categorias) => categorias.nombre);
      this.categorias_elementos = categorias
    })
  }
  

  ngOnInit(): void {
    this.AbrirnuevoElemento();
    this.inicializaDropDownZonas();
    this.inicializaCategorias_elementos();
  }



  get categoria() { return this.nuevoElemento_form.get('categoria')}
  get nombre() { return this.nuevoElemento_form.get('nombre') }
  get region() { return this.nuevoElemento_form.get('region') }
  get numero_dispositivos() { return this.nuevoElemento_form.get('numero_dispositivos') }
  get imagen() { return this.nuevoElemento_form.get('imagen') }



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