import express from 'express'
import { ProductManager } from "./ProductManager.js";

const app = express()
const PORT = 8080
const PATH_TXT = './info.txt'
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager(PATH_TXT)

//productos + limit
app.get('/products', async (req, res) =>{
    //Leer txt
    const products = await productManager.getProducts()
    //limit
    let limit = req.query.limit
    if(!limit){
        return res.send(products)
    }
    const productsLimit = products.slice(0, req.query.limit)
    return res.send(productsLimit)
})

//producto por id
app.get('/products/:pid', async (req, res) =>{
    let id = req.params.pid
    //Leer txt
    const products = await productManager.getProductById(id)
    res.send(products)
})

app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})