import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {  Filtro, filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { MultiSelectModule } from 'primeng/multiselect';
import { PromptsService } from 'src/app/servicios/prompts/prompts.service';
import { Prompt } from 'src/app/interfaces/prompts';
import { SliderModule} from 'primeng/slider';

@Component({
  selector: 'app-filtro-procesados',
  templateUrl: './filtro-procesados.component.html',
  styleUrls: ['./filtro-procesados.component.css'],
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MultiSelectModule,
    SliderModule
  ],
})
export class FiltroProcesadosComponent implements OnInit {

  @Output () enviar_filtros = new   EventEmitter<filtro_procesados>();

  filtro_procesados_form: FormGroup = this.formBuilder.group({
    orden: [''],
    categoria: [''],
    prompts: [[]],
    respuestas_carteles: [[]],
  });;

  formData  = this.filtro_procesados_form?.value;

  ordenes: Filtro[] = [];
  categorias: string[] = []
  prompts: Prompt[] = [];
  respuestas_carteles: string[] = [];
  rangos_cuentas: number[] = [0,3];

  constructor(
    private formBuilder: FormBuilder,
    private promptsService: PromptsService
    ) {  }

  ngOnInit(): void {
    // Opciones de ordenado
    this.ordenes = [
      {label: 'Fecha descendente', value: 'date_desc'},
      {label: 'Fecha ascendente', value: 'date_asc'},
      {label: 'Resultado descendente', value: 'result_desc'},      
      {label: 'Resultado ascendente', value: 'result_asc'},      
    ]; 

    // Tipos de procesado
    this.categorias = ['todos','carteles','dispositivos'];

    // Opciones de prompts
    this.promptsService.getAllPrompts().subscribe( 
      ( data: Prompt[] ) => {
        this.prompts = data;
      }); (error: Error) => {
        console.log("error", error);
      }

    // Opciones de IA usada

    // Opciones de respuesta cartel
    this.respuestas_carteles = ['muy alta', 'alta', 'media', 'otro idioma', 'baja', 'muy baja', 'ninguna'];
  }

  enviarFiltroProcesados() {

    this.formData = this.filtro_procesados_form.value;
    const prompts_id: number[] = this.formData.prompts.map( (prompt: Prompt) => prompt.id_prompt );


    const  filtros : filtro_procesados = {
      orden: this.formData.orden.value,
      categoria: this.formData.categoria != "todos" ? this.formData.categoria : '',
      prompts: prompts_id,
      rangos_cuentas: {
        min: this.rangos_cuentas[0],
        max: this.rangos_cuentas[1],
      },
      respuestas_carteles: this.formData.respuestas_carteles
    }

    this.enviar_filtros.emit(filtros);

  }
}


