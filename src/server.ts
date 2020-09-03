//LLamado al modulo de express
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose  from 'mongoose';
import compression from 'compression';
import cors from 'cors';

//LLMAR RUTAS
import producto from './routes/producto';
import categoria from './routes/categoria';


//clase
class Server
{
//especificar el tipo de dato para la variable app
public app: express.Application;

constructor(){
    this.app=express();
    this.config();
    this.routes();
}
config(){
    //inicializa el puerto de Express
    this.app.set('port',process.env.PORT || 4000);

    //ver las rutas de que solicita
    this.app.use(morgan('dev'));
    //proteccion del backend
    this.app.use(helmet());

    //CONEXION A LA BDD
    const MONGO_URI='mongodb://wendy:S568EfpejSkXgfZ@cluster0-shard-00-00.xu8da.mongodb.net:27017,cluster0-shard-00-01.xu8da.mongodb.net:27017,cluster0-shard-00-02.xu8da.mongodb.net:27017/prueba?ssl=true&replicaSet=atlas-11e9td-shard-0&authSource=admin&retryWrites=true&w=majority' 

    mongoose.connect(MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true, 
      useCreateIndex:true}).then(()=>{console.log("BASE DATOS OK")});
      
      //COMPRESION DE LAS RESPUESTAS
this.app.use (compression());
//PARA LA CONEXION DEL FRONTEND
this.app.use(cors());

//para recibir y enviar las respuestas de tipo Json
this.app.use(express.json());

//soporte para el envio de formularios
this.app.use(express.urlencoded({extended:false}));
}


routes(){
    this.app.get('/',(req,res)=>{res.send("BIENVENIDOS A MI SERVIDOR SOY WENDY")});
    this.app.use('/api/producto',producto);
    this.app.use('/api/categoria',categoria);
}

start(){

    //inicializa el servidor express
    this.app.listen(this.app.get('port'),()=>{
        console.log("SERVIDOR FUNCIONANDO RESTFUL");
    });
}
}
//instancia la clase
const server=new Server();
server.start();