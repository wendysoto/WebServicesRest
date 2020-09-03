"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//lamar a los modelos creados
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
class Producto {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    //GET
    async getProducto(req, res) {
        //res.send("GET-PRODUCTOS")
        try {
            let productoDB = await producto_1.default.find({});
            categoria_1.default.populate(productoDB, { path: "categoria", select: 'nombre' });
            let conteo = await producto_1.default.countDocuments({});
            res.json({
                producto: productoDB,
                //contar num de registros
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    } //fin get
    //GETID
    async getProductoId(req, res) {
        //res.send("GET-ID-PRODUCTOS");
        try {
            let idurl = req.params.id;
            let productoDB = await producto_1.default.findById(idurl);
            res.json({
                ok: true,
                producto: productoDB
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: false,
                dato: "Producto no encontrado",
                message: error
            });
        }
    } //fin GETID
    //POST
    async postProducto(req, res) {
        //res.send("GET-POST-PRODUCTOS");
        try {
            let bodycabecera = req.body;
            console.log(req.body);
            let producto = new producto_1.default({
                nombre: bodycabecera.nombre,
                precioUni: bodycabecera.precioUni,
                descripcion: bodycabecera.descripcion,
                categoria: bodycabecera.categoria,
            });
            let productoDB = await producto.save();
            res.json({
                producto: productoDB
            });
        }
        catch (error) {
            return res.status(500).json({
                dato: error
            });
        }
    } //fin POST
    //PUT
    async putProducto(req, res) {
        //res.send("GET-PUT-PRODUCTOS")
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let productoDB = await producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true,
                context: 'query' });
            res.json({
                producto: productoDB
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    //DELETE
    async deleteProducto(req, res) {
        //res.send("GET-DELETE-PRODUCTOS")
        try {
            let idurl = req.params.id;
            let productoDB = await producto_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "PRODUCTO ELIMINADO",
                producto: productoDB
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Producto no encontrado",
                dato: error
            });
        }
    }
    exponerRutas() {
        // this.router.get('/',(req, res)=> { res.send ("PRODUCTO")});
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
}
const producto = new Producto();
exports.default = producto.router;
