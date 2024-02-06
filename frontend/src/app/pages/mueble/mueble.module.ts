import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuebleComponent } from './mueble.component';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ImageModule
    
  ],
  declarations: [MuebleComponent]
})
export class MuebleModule { }
