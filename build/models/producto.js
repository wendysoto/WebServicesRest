"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//modelar los datos que tendra producto
let productoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, "Nombre obligatorio"] },
    precioUni: { type: Number, required: [true, "Precio Unitario obligatorio"] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Categoria', required: true },
});
//exportar el modelo para ser usado en todo el proyecto
exports.default = mongoose_1.model('Producto', productoSchema);
