/////////////Definiciones de clases y métodos///////////////
//Definicion clase de cada producto.
class TalleCantidad{
    constructor(talle,cantidad){
        this.talle=talle
        this.cantidad=cantidad
    }
}
class Producto {
    constructor (id, nombre, marca, stock, precio){
        this.id=id
        this.nombre=nombre
        this.marca=marca
        this.stock = []
        for (let i = 0; i < stock.length; i++) {
            const talleCantidad = new TalleCantidad(stock[i].talle, stock[i].cantidad);//tiene que ir cantidad
            this.stock.push(talleCantidad)
        }
        this.precio=precio;
    }
}
class ProductoCarrito {
    constructor(id,talle,cantidad){
        this.id=id
        this.talle=talle
        this.cantidad=cantidad
    }
}
//Definicion de la clase de la lista de productos y los metodos que la utilizan
class ProductHandler{
    constructor(){
        this.listaProductos = []
        this.carritoCompra = []
        this.precioTotal
    }
    ordenarPorTalles() {
        for(const producto of this.listaProductos){
            producto.stock.sort((talleA, talleB) => talleA.talle - talleB.talle);
            }
    }
    eliminarTalleSinStock(){
        for(const producto of this.listaProductos){
            producto.stock=producto.stock.filter(talle=>talle.cantidad!==0)
        }
    }
    //Ordena la lista de productos por ID, luego los talles de mayor a menor y ademas retira los talles con stock 0
    ordenarStock(){
        this.listaProductos.sort((idA,idB)=>idA.id-idB.id)
        this.ordenarPorTalles()
        this.eliminarTalleSinStock()
    }
    mostrarStock(id){
        const index=this.listaProductos.findIndex(producto=>producto.id==id)
        if(id!=0){
            console.log("ID:"+this.listaProductos[index].id+"\nNombre:"+this.listaProductos[index].nombre+"\nMarca:"+this.listaProductos[index].marca+"\nStock(talle:cantidad):")
            for(let talle of this.listaProductos[index].stock)
                console.log(talle.talle+":"+talle.cantidad)
        }
        else{
            console.log("No se encontró un producto con esa ID");
        } 
    }
    mostrarCatalogo(){
        for(let i=0;i<this.listaProductos.length;i++){
            let talles = []
            for(let j=0;j<this.listaProductos[i].stock.length;j++){
                talles.push(this.listaProductos[i].stock[j].talle)
            }
            console.log("ID:"+this.listaProductos[i].id+"\nNombre:"+this.listaProductos[i].nombre+"\nMarca:"+this.listaProductos[i].marca+"\nTalle:"+talles+"\nPrecio:"+this.listaProductos[i].precio+"\n____________________________________\n")
        }
    }
    mostrarCatalogoFiltrado(){
        alert("Opcion aun no terminada")
        //let option = prompt(`Indique que tipo de filtro desea realizar:\n`)

    }

    calcularMontoTotal(){
        let indexID
        this.precioTotal=0
        for(let productoCarrito of this.carritoCompra){
            indexID=this.listaProductos.findIndex(producto => producto.id==productoCarrito.id)
            this.precioTotal+=(this.listaProductos[indexID].precio*productoCarrito.cantidad)
        }
    }
    consumirStock(){
        let indexID
        let indexTalle
        for(let productoCarrito of this.carritoCompra){
            indexID=this.listaProductos.findIndex(producto => producto.id==productoCarrito.id)
            indexTalle=this.listaProductos[indexID].stock.findIndex(producto => producto.talle==productoCarrito.talle)
            this.listaProductos[indexID].stock[indexTalle].cantidad-=productoCarrito.cantidad
        }
    }
    agregarStock(){
        let id= parseInt(prompt("Coloque el ID del producto a agregar"))
        let existencia = this.listaProductos.find(producto => producto.id==id)
        if(existencia){
            //Agrega stock a un producto existente
            let talle = parseInt(prompt("Indique la talle que desee agregar el stock"))
            let cantidad =parseInt(prompt("Indique la cantidad de unidades a agregar de ese talle"))
            let talleExistencia = existencia.stock.findIndex(talleI=>talleI.talle==talle)
            if(talleExistencia!=-1)
                existencia.stock[talleExistencia].cantidad+=cantidad
            else{
                const talleCantidad = new TalleCantidad(talle,cantidad);
                existencia.stock.push(talleCantidad);
            }
        }
        else{
            const nombre = prompt("Nuevo producto: Indique el nombre del Producto")
            const marca = prompt("Indique la marca del producto")
            const precio = parseInt(prompt("Indique el valor del producto"))
            const talle = parseInt(prompt("Indique el talle a agregar"))
            const cantidad = parseInt(prompt("Indique la cantidad de stock"))
            const newProduct = new Producto(id,nombre,marca,[{talle:talle,cantidad:cantidad}],precio)
            this.listaProductos.push(newProduct)
        }
        this.mostrarStock(id)
    }    
    //Funcion para elegir los productos a comprar. Posee sistema de verificacion de dato ingresado OK
    llenarCarrito(){
        this.mostrarCatalogo()
        let id
        let indexID
        do{
            id = prompt("Selecciona el ID del artículo a comprar \n (Escriba filtrar para realizar un filtrado)")
            if(id=="filtrar")
            {
                this.mostrarCatalogoFiltrado()
            }
            else{
                if(!this.listaProductos.find(producto => producto.id==id))
                    alert("No hay productos con esa ID")
                else
                    indexID = this.listaProductos.findIndex(producto=>producto.id==id)
            }
        }while(!this.listaProductos.find(producto => producto.id==id))
        console.clear()
        this.mostrarStock(id)
        let talle
        let indexTalle
        do{
            talle= parseInt(prompt("Selecione el talle deseado"))
            if(!this.listaProductos[indexID].stock.find(producto => producto.talle===talle))
                alert("El producto no posee ese talle en stock")
            else
                indexTalle = this.listaProductos[indexID].stock.findIndex(producto=>producto.talle==talle)
        }while(!this.listaProductos[indexID].stock.find(producto => producto.talle===talle))
        let cantidad
        do{
            cantidad = parseInt(prompt("Seleccione la cantidad"))
            if(cantidad> this.listaProductos[indexID].stock[indexTalle].cantidad)
                alert("La cantidad excede al stock disponible para ese talle")
            if(cantidad<=0)
                alert("La cantidad tiene que ser mayor a 0")
        }while(cantidad> this.listaProductos[indexID].stock[indexTalle].cantidad || cantidad<=0)
        const newCompra = new ProductoCarrito(id,talle,cantidad)
        this.carritoCompra.push(newCompra)
        console.clear()
    }
    modificarCarrito(){
        if(this.carritoCompra.length==0)
            alert("El carrito esta vacio")
        else
        {
            for(let producto of this.carritoCompra){
                console.log(`ID:${producto.id}
                Talle:${producto.talle}
                Cantidad:${producto.cantidad}`);
            }
            this.calcularMontoTotal()
            console.log(`Total de la compra: $${this.precioTotal}`)
            let id
            let indexIDcC
            let indexIDlC
            let indexTalle
            do{
                id=prompt("Escriba el ID del producto a modificar")
                indexIDcC = this.carritoCompra.findIndex(producto=>producto.id==id)
                if(indexIDcC ==-1)
                    alert("El producto del ID ingresado no se encuentra dentro del carrito")
            }while(indexIDcC ==-1)
            let option
            do{
                console.clear()
                console.log(`ID:${this.carritoCompra[indexIDcC].id}
                Talle:${this.carritoCompra[indexIDcC].talle}
                Cantidad:${this.carritoCompra[indexIDcC].cantidad}`)
                option = prompt(`Elija la opcion que desee:
                1- Cambiar la cantidad
                2- Eliminar el producto
                (sale del menu con ESC)`).toUpperCase()
                indexIDlC= this.listaProductos.findIndex(producto=>producto.id==id)
                indexTalle = this.listaProductos[indexIDlC].stock.findIndex(producto=>producto.talle==this.carritoCompra[indexIDcC].talle)
                switch(option){
                    case '1':
                        let newCantidad
                            do{
                                newCantidad = parseInt(prompt("Seleccione la nueva cantidad"))
                                if(newCantidad> this.listaProductos[indexIDlC].stock[indexTalle].cantidad)
                                    alert("La cantidad excede al stock disponible para ese talle")
                                if(newCantidad<=0)
                                    alert("La cantidad tiene que ser mayor a 0")
                            }while(newCantidad> this.listaProductos[indexIDlC].stock[indexTalle].cantidad || newCantidad<=0)
                        this.carritoCompra[indexIDcC].cantidad=newCantidad
                        option="ESC"
                    break;
                    case '2':
                        this.carritoCompra.splice(indexIDcC,1)
                        option="ESC"
                    break;
                    default:
                        if(option!="ESC")
                            alert("No se detecto una opcion valida")
                    break;
                }
            }while(option!=="ESC")
            console.clear()
        }
    }
    finalizarCompra(){
        this.calcularMontoTotal()
        let option
        do{
            option = prompt(`El monto total a pagar es: $${this.precioTotal}\n    Desea finalizar la compra? Escriba "si" para aceptar, "esc" para salir`).toUpperCase()
            if(option=="SI"){
                this.consumirStock()
                this.carritoCompra.splice(0,this.carritoCompra.length)
                alert("La operacion fue un exito. Muchas gracias por su compra")
            }
        }while(option!="SI"&& option!="ESC")
        
    }
    mostrarStocks(){
        this.ordenarStock()
        for(let i=0;i<this.listaProductos.length;i++){
            console.log("ID:"+this.listaProductos[i].id+"\nNombre:"+this.listaProductos[i].nombre+"\nMarca:"+this.listaProductos[i].marca+"\nStock(talle:cantidad):")
            for(let talle of this.listaProductos[i].stock)
                console.log(talle.talle+":"+talle.cantidad)
            console.log("____________________________________")
        }
    }
}
//Base de datos del stock (Se colocaron en desorden los ID  y talles para mostrar como funciona el metodo que ordena el stock)
//                        ID      NOMBRE                   MARCA                                         TALLE/CANTIDAD                                                                                         PRECIO                  
let prod1 =new Producto ( 15,  "AirMax Excee",            "Nike",     [{talle:39,cantidad:10},{talle:40,cantidad:5},{talle:41,cantidad:6},{talle:42 ,cantidad:7}],                                              49000)
let prod2 =new Producto ( 2,   "Legend Essential",        "Nike",     [{talle:38,cantidad:1},{talle:39,cantidad:5},{talle:41,cantidad:8},{talle: 42,cantidad:10},{talle: 43,cantidad:4}],                       31200)
let prod3 =new Producto ( 3,   "Downshifter",             "Nike",     [{talle:39,cantidad:3},{talle:40,cantidad:4},{talle:41,cantidad:1}],                                                                      30800)
let prod4 =new Producto ( 4,   "Revolution 6 Next Nature","Nike",     [{talle:40,cantidad:9},{talle:42,cantidad:10}],                                                                                           27000)
let prod5 =new Producto ( 18,  "Waffle Debut",            "Nike",     [{talle:38,cantidad:1},{talle:40,cantidad:5},{talle:42,cantidad:6},{talle:44,cantidad:3}],                                                28000)
let prod6 =new Producto ( 6,   "Royal Glide",             "Reebok",   [{talle:39,cantidad:5},{talle:42,cantidad:3},{talle:43,cantidad:2}],                                                                      22700)
let prod7 =new Producto ( 7,   "Flexagon Energy Train",   "Reebok",   [{talle:40,cantidad:10},{talle:42,cantidad:8},{talle:41,cantidad:6},{talle:43,cantidad:5}],                                               18000)
let prod8 =new Producto ( 10,  "Energylux 3.0",           "Reebok",   [{talle:39,cantidad:3},{talle:40,cantidad:0}],                                                                                            21000)
let prod9 =new Producto ( 9,   "Royal Techque",           "Reebok",   [{talle:35,cantidad:8},{talle:36,cantidad:5},{talle:37,cantidad:6}],                                                                      23700)
let prod10=new Producto ( 8,   "Court Royale 2",          "Nike",     [{talle:38,cantidad:1},{talle:39,cantidad:6},{talle:41,cantidad:5},{talle:40,cantidad:3},{talle:42,cantidad:8}],                          27600)
let prod11=new Producto (11,   "Terrex Ax4 Gtx",          "Adidas",   [{talle:38,cantidad:10},{talle:42,cantidad:10},{talle:40,cantidad:10}],                                                                   55000)
let prod12=new Producto (12,   "Grand Court",             "Adidas",   [{talle:38,cantidad:3},{talle:39,cantidad:2},{talle:40,cantidad:0}],                                                                      26000)
let prod13=new Producto (13,   "Runfalcon 2.0",           "Adidas",   [{talle:40,cantidad:2},{talle:41,cantidad:1},{talle:42,cantidad:5}],                                                                      18000)
let prod14=new Producto (14,   "Ultraboost 22",           "Adidas",   [{talle:38,cantidad:4},{talle:39,cantidad:2},{talle:40,cantidad:1},{talle:41,cantidad:3},{talle:42,cantidad:4},{talle:43,cantidad:5}],    58000)
let prod15=new Producto ( 1,   "Eq21",                    "Adidas",   [{talle:40,cantidad:10},{talle:42,cantidad:8},{talle:43,cantidad:5}],                                                                     28000)
let prod16=new Producto (16,   "Formula",                 "Diadora",  [{talle:34,cantidad:1},{talle:35,cantidad:3},{talle:38,cantidad:4},{talle:36,cantidad:12}],                                               17800)
let prod17=new Producto (17,   "Corigliano",              "Diadora",  [{talle:39,cantidad:8},{talle:42,cantidad:5},{talle:43,cantidad:3}],                                                                      17300)
let prod18=new Producto ( 5,   "Graviton Pro",            "Puma",     [{talle:40,cantidad:5},{talle:42,cantidad:5}],                                                                                            28600)
let prod19=new Producto (19,   "Solarsmash Rct",          "Puma",     [{talle:35,cantidad:8},{talle:36,cantidad:8},{talle:38,cantidad:3},{talle:37,cantidad:5}],                                                28600)
let prod20=new Producto (20,   "Gel-Rebound",             "Asics",    [{talle:40,cantidad:3},{talle:41,cantidad:3},{talle:42,cantidad:3}],                                                                      25800)



//Creo y cargo el objeto que contara con un array que poseerá dentro la lista de todos los objetos producto de la "base de datos"
let productos = new ProductHandler
productos.listaProductos=[prod1,prod2,prod3,prod4,prod5,prod6,prod7,prod8,prod9,prod10,prod11,prod12,prod13,prod14,prod15,prod16,prod17,prod18,prod19,prod20]

//Creo y cargo objetos en el array carritoCompra para hacer pruebas
let compra1=new ProductoCarrito(12,38,2)
let compra2=new ProductoCarrito(20,40,3)
let compra3=new ProductoCarrito(15,39,2)
productos.carritoCompra=[compra1,compra2,compra3]

//Logica del programa 
alert(  "Simulador de E-Commerce:\n")
let option
//Logica del menú
do{
    productos.ordenarStock()
        //MENU INICIAL
    option = prompt(`Escriba el número de la opción que desee realizar:
        1- Agregar Stock
        2- Seleccionar productos a comprar
        3- Ver y modificar el carrito de compras
        4- Finalizar compra
        5- Ver Stock
    (Salir del simulador escribiendo "esc")\n
    Escriba la opción deseada`).toUpperCase()

    switch(option){
        case '1':
            productos.agregarStock()
        break;
        case '2':
            productos.llenarCarrito()
        break;
        case '3':
            productos.modificarCarrito()
        break;
        case '4':
            productos.finalizarCompra()
        break;
        case '5':
            productos.mostrarStocks()
        break;
        default:
            if(option!="ESC")
            alert("La opcion ingresada no es valida")
        break;
    }
}while(option!="ESC")