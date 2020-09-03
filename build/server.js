"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//LLamado al modulo de express
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//LLMAR RUTAS
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
//clase
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //inicializa el puerto de Express
        this.app.set('port', process.env.PORT || 4000);
        //ver las rutas de que solicita
        this.app.use(morgan_1.default('dev'));
        //proteccion del backend
        this.app.use(helmet_1.default());
        //CONEXION A LA BDD
        const MONGO_URI = 'mongodb://wendy:S568EfpejSkXgfZ@cluster0-shard-00-00.xu8da.mongodb.net:27017,cluster0-shard-00-01.xu8da.mongodb.net:27017,cluster0-shard-00-02.xu8da.mongodb.net:27017/prueba?ssl=true&replicaSet=atlas-11e9td-shard-0&authSource=admin&retryWrites=true&w=majority';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,
            useCreateIndex: true }).then(() => { console.log("BASE DATOS OK"); });
        //COMPRESION DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        //PARA LA CONEXION DEL FRONTEND
        this.app.use(cors_1.default());
        //para recibir y enviar las respuestas de tipo Json
        this.app.use(express_1.default.json());
        //soporte para el envio de formularios
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get('/', (req, res) => { res.send("BIENVENIDOS A MI SERVIDOR SOY WENDY"); });
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    }
    start() {
        //inicializa el servidor express
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO RESTFUL");
        });
    }
}
//instancia la clase
const server = new Server();
server.start();
