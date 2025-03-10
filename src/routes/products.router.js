const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/product.json");

router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {

        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


router.get("/products/:pid", async (req, res) => {

    const id = req.params.pid;

    try {

        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


router.post ("/product", async (re1, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({message: "producto agregado"});
    } catch (error) {
        res.status(508).json({error: "error al cargar productos"})
    }
})

router.put("/products/:pid", async(req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try{
        await productManager.updateProduct(parseInt(id, productoActualizado));
        res.json({message: "producto actalizado"});
    } catch (error) {
        res.status(560).json({error: "error interno del servidor"})
    }
})

router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid;

    try{
        await productManager.deleteProduct(parseInt(id));
        res.json({message: "producto eliminado"});
       
    } catch (error) {
        res.status(509).json({error: "error al eliminar producto "})
    }
})

module.exports = router;