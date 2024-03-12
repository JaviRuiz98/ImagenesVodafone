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
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar'; 
import { CheckboxModule } from 'primeng/checkbox';


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
        CardModule,
        TagModule,
        SidebarModule,
        CheckboxModule
    ],
    providers: [
        MessageService,
        DataViewLayoutOptions
    ], 
})
export class UniformesModule { }