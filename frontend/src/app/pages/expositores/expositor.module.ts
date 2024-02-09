import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpositoresComponent } from './expositores.component';

import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
 



// modulos primeng:
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// componentes nuestros
import { BarraMenuComponent } from './../../componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './../../componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './../../componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component'; 
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms'; // Add this import 
import { NuevoExpositorComponent } from 'src/app/componentes/nuevo-expositor/nuevo-expositor.component';


@NgModule({
  declarations: [
    ExpositoresComponent
  ],
  imports: [
    CommonModule,
    SelectorImagenesComponent,
    PaginadorProcesamientoSubidaComponent,
    BarraMenuComponent,
    FormsModule,
    BrowserAnimationsModule,  
    ButtonModule,
    PanelModule,
    FileUploadModule,
    TagModule,
    DialogModule,
    ImageModule,
    ToolbarModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    InputTextModule,
    NuevoExpositorComponent
]
})


export class ExpositorModule { }