import {Router,Request,Response} from 'express';
import { request } from 'http';

//lamar a los modelos creados
import ProductoModel from '../models/producto';
import CategoriaModel from '../models/categoria';

class Producto{
    router:Router;
    constructor(){
        this.router=Router();
        this.exponerRutas();
    }

    //GET
     async getProducto(req: Request,res:Response){
        //res.send("GET-PRODUCTOS")
        
            try{

                let productoDB=await ProductoModel.find({});
                CategoriaModel.populate(productoDB,{path:"categoria", select:'nombre'});
                let conteo=await ProductoModel.countDocuments({});
                res.json(
                    {
                        producto:productoDB,
                        //contar num de registros
                        conteo:conteo
                    }
                );

            }catch(error){
                return res.status(400).json(
                    {
                        dato:error
                    }
                );

            }
        
    } //fin get

    //GETID
    async getProductoId(req:Request,res:Response){
        //res.send("GET-ID-PRODUCTOS");
        try{

            let idurl=req.params.id;
            let productoDB=await ProductoModel.findById(idurl);
            res.json(
                {
                    ok:true,
                    producto:productoDB
                }
            );

        }catch(error){
            return res.status(400).json(
                {
                    ok:false,
                    dato:"Producto no encontrado",
                    message:error
                }
            );

        }
    } //fin GETID

    //POST
    async postProducto(req:Request,res:Response){
        //res.send("GET-POST-PRODUCTOS");
        try{

            let bodycabecera=req.body;
            console.log(req.body);
            let producto=new ProductoModel(
                {
                    nombre:bodycabecera.nombre,
                    precioUni:bodycabecera.precioUni,
                    descripcion:bodycabecera.descripcion,
                    categoria:bodycabecera.categoria,

                });
            let productoDB=await producto.save();
            res.json(
                {
                    producto:productoDB
                });           

        }catch(error){
            return res.status(500).json(
                {
                    dato:error
                });
        }        
    }//fin POST

    //PUT

    async putProducto(req: Request,res:Response){
        //res.send("GET-PUT-PRODUCTOS")
        try{

            let idurl=req.params.id;
            let bodycabecera=req.body;
            let productoDB=await ProductoModel.findByIdAndUpdate(idurl,bodycabecera,{new:true, runValidators:true,
                context:'query'});
            res.json(
                {
                    
                    producto:productoDB
                }
            );

        }catch(error){
            return res.status(400).json(
                {
                    ok:"ERROR",                    
                    dato:error
                });
        }
    }

    //DELETE
    async deleteProducto(req: Request,res:Response){
        //res.send("GET-DELETE-PRODUCTOS")
        try{

            let idurl=req.params.id;
            let productoDB=await ProductoModel.findByIdAndRemove(idurl);
            res.json(
                {
                    mensaje:"PRODUCTO ELIMINADO",
                    producto:productoDB
                }
            );
        }catch(error){
            return res.status(400).json(
                {
                   message:"Producto no encontrado",
                    dato:error
                });
        }  }


    exponerRutas(){
       // this.router.get('/',(req, res)=> { res.send ("PRODUCTO")});
        this.router.get('/',this.getProducto);
        this.router.get('/:id',this.getProductoId);
        this.router.post('/',this.postProducto);
        this.router.put('/:id',this.putProducto);
        this.router.delete('/:id',this.deleteProducto);
    }
}

const producto=new Producto();
export default producto.router;
