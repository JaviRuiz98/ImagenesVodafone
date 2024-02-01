import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorComponent } from './pages/validador/validador.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [

  { path: "", component: ValidadorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
