import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Filtro_procesados, Filtro } from 'src/app/interfaces/filtro_procesados';
import { MultiSelectModule } from 'primeng/multiselect';

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
    MultiSelectModule
  ],
})
export class FiltroProcesadosComponent implements OnInit {

  filtro_procesados_form: FormGroup = new FormGroup({});

  ordenes: Filtro[] = [];
  prompts: Filtro[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ordenes = [
      {label: 'Fecha descendente', value: 'date_desc'},
      {label: 'Fecha ascendente', value: 'date_asc'},
      {label: 'Resultado descendente', value: 'result_desc'},      
      {label: 'Resultado ascendente', value: 'result_asc'},      
    ];

    this.prompts = [
      {label: 'Prompt 1', value: 'prompt1'},
      {label: 'Prompt 2', value: 'prompt2'},
    ]

    this.filtro_procesados_form = this.formBuilder.group({
      ordenes: this.ordenes[0].value,
      prompts: this.prompts[0].value
    });
  }

  enviarFiltroProcesados() {
    const formData = this.filtro_procesados_form = this.formBuilder.group({
      ordenes: this.ordenes.values,
      prompts: this.prompts.values
    });
    
    console.log("formData", formData);
  }
}


