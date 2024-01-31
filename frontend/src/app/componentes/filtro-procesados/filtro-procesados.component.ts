import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Filtro } from 'src/app/interfaces/filtro_procesados';
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

  filtro_procesados_form: FormGroup = this.formBuilder.group({
    orden: [''],
    prompts: [0],
    respuestas_carteles: [''],
    rango_cuentas: []
  });;

  ordenes: Filtro[] = [];
  prompts: Prompt[] = [];
  respuestas_carteles: string[] = [];
  rangos_cuentas: number[] = [];

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

    // Opciones de prompts
    this.promptsService.getAllPrompts().subscribe( 
      ( data: Prompt[] ) => {
        this.prompts = data;
        console.log(this.prompts)
      }); (error: Error) => {
        console.log("error", error);
      }

    // Opciones de IA usada

    // Opciones de respuesta cartel
    this.respuestas_carteles = ['muy alta', 'alta', 'media', 'otro idioma', 'baja', 'muy baja', 'ninguna'];

    // Opciones de respuesta dispositivos
    this.rangos_cuentas = [0, 3];
  }

  enviarFiltroProcesados() {
    const formData = this.filtro_procesados_form?.value

    formData.prompts = formData.prompts.map( (prompt: Prompt) => prompt.id_prompt );

    console.log("formData", formData);    
  }
}


