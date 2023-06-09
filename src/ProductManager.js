import {promises as fs} from 'fs'

const TXT_PATH = '../info.txt'

export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    // Métodos
    async addProduct(product){
        //Confirmar que producto no está en el array
        if(this.products.some(el => el.code === product.code)){
            console.log("El producto ya se encuentra en el array.")
        }else{
        //Agregar producto
            this.products.push(product)
        //Escribir txt
        await fs.writeFile(this.path, JSON.stringify(this.products))
        }
    }
    async getProducts(){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        return productsJSON
    }
    async getProductById(id){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        //Buscar producto por Id
        const element = productsJSON.find(el => el.id === parseInt(id))
        if(element){
            return element
        }else{
            return "El elemento no existe."
        }
    }

    async updateProduct(id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        const element = productsJSON.find(el => el.id === parseInt(id))
        if(element){
            const index = productsJSON.map(productToUpdate => {
                return productToUpdate.id
            }).indexOf(id)
            productsJSON[index].title = newTitle
            productsJSON[index].description = newDescription
            productsJSON[index].price = newPrice
            productsJSON[index].thumbnail = newThumbnail
            productsJSON[index].code = newCode
            productsJSON[index].stock = newStock
            //Escribir txt
            return await fs.writeFile(this.path, JSON.stringify(productsJSON))
        }else{
            return "El elemento no existe."
        }
    }

    async deleteProduct(id){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        const element = productsJSON.find(el => el.id === parseInt(id))
        if(element){
            const index = productsJSON.map(productToDelete => {
                return productToDelete.id
            }).indexOf(id)
            productsJSON.splice(index, 1)
            //Escribir txt
            return await fs.writeFile(this.path, JSON.stringify(productsJSON))
        }else{
            return "El elemento no existe."
        }
    }
}

//-----------------------

class Product {
    constructor (title = "", description = "", price = 0, thumbnail = "", code = "", stock = 0){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
        this.id = Product.incrementID()
    }

    static incrementID(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

// fn: ficción, in: infantil, ac = académico
const product1 = new Product("Lord of the Rings", "Paperback", 7000, "No Image", "fn01", 10)
const product2 = new Product("Before the Coffee Gets Cold", "Paperback", 3250, "No Image", "fn02", 20)
const product3 = new Product("The Wizard of Oz", "Paperback", 7500, "No Image", "fn03", 15)
const product4 = new Product("Santa Post", "Paperback", 6500, "No Image", "in01", 8)
const product5 = new Product("The Tiger Who Came to Tea", "Paperback", 2700, "No Image", "in02", 18)
const product6 = new Product("Giraffes Can't Dance", "Paperback", 3100, "No Image", "in03", 10)
const product7 = new Product("Biology AS A Level Workbook", "Paperback", 6000, "No Image", "ac01", 10)
const product8 = new Product("Environmental Management", "Paperback", 8000, "No Image", "ac02", 5)
const product9 = new Product("The Very Hungry Caterpillar", "Paperback", 3400, "No Image", "in04", 8)
const product10 = new Product("The Mirror and the Light", "Paperback", 5200, "No Image", "fn04", 15)


