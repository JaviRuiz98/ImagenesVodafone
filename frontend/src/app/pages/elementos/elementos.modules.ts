import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 



// modulos primeng:
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

// componentes nuestros
import { BarraMenuComponent } from './../../componentes/barra-menu/barra-menu.component';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './../../componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component'; 
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms'; // Add this import 
import { NuevoElementoComponent } from 'src/app/componentes/nuevo-elemento/nuevo-elemento.component';
import { ElementosComponent } from './elementos.component';

import { RemarcarExpositorComponent } from 'src/app/componentes/remarcar-expositor/remarcar-expositor.component';
@NgModule({
  declarations: [
    ElementosComponent
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
    NuevoElementoComponent,
    OverlayPanelModule,
    DropdownModule,
    SelectButtonModule,
    RemarcarExpositorComponent
]
})


export class ElementosModule { }