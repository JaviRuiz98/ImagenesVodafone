import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { UniformesComponent } from './uniformes.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';  
import{ DataViewLayoutOptions } from 'primeng/dataview';


@NgModule({
    declarations: [
        UniformesComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        ToastModule,
        DataViewModule, 
    ],
    providers: [
        MessageService,
        DataViewLayoutOptions
    ], 
})
export class UniformesModule { }