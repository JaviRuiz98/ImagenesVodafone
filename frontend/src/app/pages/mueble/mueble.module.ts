import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';

import { ReactiveFormsModule } from '@angular/forms' //para formularios de creación y edición de muebles
import { FormsModule } from '@angular/forms'; //select button


import { MuebleComponent } from './mueble.component';
import { IrArribaComponent } from 'src/app/componentes/ir-arriba/ir-arriba.component';

import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectorImagenesComponent } from 'src/app/componentes/selector-imagenes/selector-imagenes.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { FormMuebleComponent } from './components/formMueble/formMueble.component';
import { AsignarHuecosComponent } from './components/asignarHuecos/asignarHuecos.component';
import { HistorialExpositoresComponent } from './components/historialExpositores/historialExpositores.component';


import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DragDropModule } from 'primeng/dragdrop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
//import {DragDropModule} from '@angular/cdk/drag-drop'


import { Paso1FormComponent } from './components/formMueble/Paso1Form/Paso1Form.component';
import { PasoHuecosFormComponent } from './components/formMueble/PasoHuecosForm/PasoHuecosForm.component';
import { PasoAsignarElementoFormComponent } from './components/formMueble/PasoAsignarElementoForm/PasoAsignarElementoForm.component';
import { ArrastrarElementoComponent } from './components/arrastrarElemento/arrastrarElemento.component';
import { NuevoElementoComponent } from 'src/app/componentes/nuevo-elemento/nuevo-elemento.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ImageModule,
    SelectButtonModule,
    ToastModule,
    ButtonModule,
    ToolbarModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    DialogModule,
    PanelModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    DropdownModule,
    DragDropModule,
    ScrollPanelModule,
    DividerModule,
    StepsModule,
    OverlayPanelModule,
    DataViewModule,
    AccordionModule,
    

    ReactiveFormsModule,
    FormsModule,

    IrArribaComponent,
    SelectorImagenesComponent, 
    NuevoElementoComponent
    
    
  ],
  declarations: [
     MuebleComponent,
     FormMuebleComponent,
     HistorialExpositoresComponent,
     AsignarHuecosComponent,
     ArrastrarElementoComponent,
   
     Paso1FormComponent,
     PasoHuecosFormComponent, 
     PasoAsignarElementoFormComponent
    ], 
  providers: [MessageService, DialogService],
})
export class MuebleModule { }
