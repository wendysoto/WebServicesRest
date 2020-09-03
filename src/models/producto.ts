import {Schema,model} from 'mongoose';

//modelar los datos que tendra producto

let productoSchema=new Schema(
    {
        nombre:{type:String,required:[true,"Nombre obligatorio"]},

        precioUni:{type:Number,required:[true,"Precio Unitario obligatorio"]},

        descripcion:{type:String,required:false},

        disponible:{type:Boolean,required:true, default:true},

        categoria:{type:Schema.Types.ObjectId,ref: 'Categoria', required:true},

    }
);
    //exportar el modelo para ser usado en todo el proyecto
    export default model ('Producto', productoSchema);
