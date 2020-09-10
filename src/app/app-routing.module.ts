import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './demo/producto/producto.component';
import { CategoriaComponent } from './demo/categoria/categoria.component';

const routes: Routes = [
{path:'producto', component:ProductoComponent},
{path:'categoria', component: CategoriaComponent},
{path:'**', redirectTo: '/', pathMatch: 'prefix'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
