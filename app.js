/////////////Definiciones de clases y métodos///////////////
//Definicion clase de cada producto.
class TalleCantidad{
    constructor(talle,stock){
        this.talle=talle
        this.stock=stock
    }
}
class Producto {
    constructor (id, nombre, marca, stock, precio){
        this.id=id;
        this.nombre=nombre;
        this.marca=marca;
        this.stock = [];
        for (let i = 0; i < stock.length; i++) {
            const talleCantidad = new TalleCantidad(stock[i].talle, stock[i].cantidad);
            this.stock.push(talleCantidad);
        }
        this.precio=precio;
    }
}

//Definicion de la clase de la lista de productos y los metodos que la utilizan
class ProductHandler{
    constructor(){
        this.listaProductos = []
    }
    ordenarPorTalles() {
        for(const producto of this.listaProductos){
            producto.stock.sort((talleA, talleB) => talleA.talle - talleB.talle);
            }
    }
    eliminarTalleSinStock(){
        for(const producto of this.listaProductos){
            producto.stock=producto.stock.filter(talle=>talle.stock!==0)
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
            for(let i=0;i<this.listaProductos[index].talles.length;i++){
                console.log(this.listaProductos[index].talles[i]+":"+this.listaProductos[index].stock[i])
            }       
        }
    }
    mostrarStocks(){
        const cantidadProductos = this.listaProductos.length
        for(let i=0;i<=cantidadProductos;i++){
            this.mostrarStock(i)
            console.log("\n")
        }
    }
    agregarStock(){
        let id= parseInt(prompt("Coloque el ID del producto a agregar"))
        let existencia = this.listaProductos.find(producto => producto.id==id)
        console.log(existencia)
        if(existencia){
            //Agrega stock a un producto existente
            let talle = parseInt(prompt("Indique la talle que desee agregar el stock"))
            let cantidad =parseInt(prompt("Indique la cantidad de unidades a agregar de ese talle"))
            let talleExistencia = existencia.stock.findIndex(talleI=>talleI.talle==talle)
            if(talleExistencia!=-1)
                existencia.stock[talleExistencia].stock+=cantidad
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

//Logica del programa 
alert(  "Simulador de E-Commerce:\n")
let option
//Logica del menú
do{
    productos.ordenarStock()
    console.log(productos);
        //MENU INICIAL
    option = prompt(" Escriba el número de la opción que desee realizar:\n"+
                    "  1- Agregar Stock\n"+
                    "  2- Seleccionar productos a comprar\n"+
                    "  3- Ver y modificar el carrito de compras\n"+
                    "  4- Finalizar compra\n"+
                    "  5- Ver Stock\n"+
                    "(Salir del simulador escribiendo \"esc\")\n\n"+
                    "Escriba la opción deseada").toUpperCase()

    switch(option){
        case '1':
            productos.agregarStock()
        break;
        case '2':
        break;
        case '3':
        break;
        case '4':
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