import { Component, OnInit } from '@angular/core';
import {ClientenodeService} from 'src/app/service/clientenode.service';
import { Categoria } from 'src/app/service/Categoria';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  title="CATEGORIA"
catego:any;
myFormCategoria:FormGroup;

  constructor(public servc:ClientenodeService) { 
    this.servc.getCategorias().subscribe(r=>{       
this.catego=r.categorias;
console.table(r);
    })
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    
    this.myFormCategoria = new FormGroup({
      nombreF: new FormControl(''),
      
    });
  }

  obtenerCategorias(){
    this.servc.getCategorias().subscribe(r=>{
      console.table(r.categorias)
      return this.catego=r.categorias
     })  }

     
     ingresarCategoria(){
      let nombre = this.myFormCategoria.value.nombreF;
  
      this.servc.addCategoria(nombre)
      .subscribe(r =>{
        this.obtenerCategorias()
        this.myFormCategoria = new FormGroup({
          nombreF: new FormControl('')
        });
      })
  }


}
