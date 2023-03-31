/////////////Definiciones de clases y métodos///////////////
//Definicion clase de cada producto
class Producto {
    constructor (id, nombre, marca, talles, stock, precio){
        this.id=id;
        this.nombre=nombre;
        this.marca=marca;
        this.talles=talles;
        this.stock=stock;
        this.precio=precio;
    }
}

//Definicion de la clase de la lista de productos y los metodos que la utilizan
class ProductHandler{
    constructor(){
        this.listaProductos = []
    }
    mostrarStock(id){
        const index=this.listaProductos.findIndex(producto=>producto.id==id)
        console.log(index);
        if(id!=0){
            console.log(`
            ID: ${this.listaProductos[index].id}\n
            Nombre: ${this.listaProductos[index].nombre}\n
            Marca: ${this.listaProductos[index].marca}\n
            Stock:\n
            Talle (cantidad):

            `);
        }
    }
    agregarStock(){
        const id= prompt("Coloque el ID del producto a agregar")
        const existencia = this.listaProductos.find(producto => producto.id==id)
        console.log(existencia)
        if(existencia){
            //Agrega stock a un producto existe
            const talle = prompt("Indique la talle que desee agregar el stock")
            const cantidad =parseInt(prompt("Indique la cantidad de unidades a agregar de ese talle"))
            existencia.stock[existencia.talles.findIndex(talleI=>talleI==talle)]+=cantidad
            console.log(existencia);
        }
        else
            console.log("Se encontro el ID");
        
    }
}
//Base de datos del stock
//                        ID      NOMBRE                   MARCA          TALLE             STOCK         PRECIO                  
let prod1=new Producto  ( 1,   "AirMax Excee",            "Nike",     [39,40,41,42],      [10,5,6,7],     49000)
let prod2=new Producto  ( 2,   "Legend Essential",        "Nike",     [38,39,41,42,43],   [1,5,8,10,4],   31200)
let prod3=new Producto  ( 3,   "Downshifter",             "Nike",     [39,40,41],         [3,4,1],        30800)
let prod4=new Producto  ( 4,   "Revolution 6 Next Nature","Nike",     [40,42],            [9,10],         27000)
let prod5=new Producto  ( 5,   "Waffle Debut",            "Nike",     [38,40,42,44],      [1,5,6,3],      28000)
let prod6=new Producto  ( 6,   "Royal Glide",             "Reebok",   [39,42,43],         [5,3,2],        22700)
let prod7=new Producto  ( 7,   "Flexagon Energy Train",   "Reebok",   [40,41,42,43],      [10,8,6,5],     18000)
let prod8=new Producto  ( 8,   "Energylux 3.0",           "Reebok",   [39],               [3],            21000)
let prod9=new Producto  ( 9,   "Royal Techque",           "Reebok",   [35,36,37],         [8,5,6],        23700)
let prod10=new Producto (10,   "Court Royale 2",          "Nike",     [38,39,40,41,42],   [1,6,5,3,8],    27600)
let prod11=new Producto (11,   "Terrex Ax4 Gtx",          "Adidas",   [38,40,42],         [10,10,10],     55000)
let prod12=new Producto (12,   "Grand Court",             "Adidas",   [38,39]             [3,2],          26000)
let prod13=new Producto (13,   "Runfalcon 2.0",           "Adidas",   [40,41,42],         [2,1,5],        18000)
let prod14=new Producto (14,   "Ultraboost 22",           "Adidas",   [38,39,40,41,42,43],[4,2,1,3,4,5],  58000)
let prod15=new Producto (15,   "Eq21",                    "Adidas",   [40,42,43],         [10,8,5],       28000)
let prod16=new Producto (16,   "Formula",                 "Diadora",  [34,35,36,38],      [1,3,4,12],     17800)
let prod17=new Producto (17,   "Corigliano",              "Diadora",  [39,42,43],         [8,5,3],        17300)
let prod18=new Producto (18,   "Graviton Pro",            "Puma",     [40,42],            [5,5],          28600)
let prod19=new Producto (19,   "Solarsmash Rct",          "Puma",     [35,36,37,38],      [8,8,5,3],      28600)
let prod20=new Producto (20,   "Gel-Rebound",             "Asics",    [40,41,42],         [3,3,3],        25800)



//Creo y cargo el objeto que contara con un array que poseerá dentro la lista de todos los objetos producto de la "base de datos"
let productos = new ProductHandler
productos.listaProductos=[prod1,prod2,prod3,prod4,prod5,prod6,prod7,prod8,prod9,prod10,prod11,prod12,prod13,prod14,prod15,prod16,prod17,prod18,prod19,prod20]
console.log(productos)
productos.mostrarStock(15)
//productos.agregarStock(30)
// //Logica del programa 
// alert(  "Simulador de E-Commerce:\n")
// let option
// //Logica del menú
// do{
//         //MENU INICIAL
//     option = prompt(" Escriba el número de la opción que desee realizar:\n"+
//                     "  1- Agregar Stock\n"+
//                     "  2- Seleccionar productos a comprar\n"+
//                     "  3- Ver y modificar el carrito de compras\n"+
//                     "  4- Finalizar compra\n"+
//                     "  5- Ver Stock\n"+
//                     "(Salir del simulador escribiendo \"esc\")\n\n"+
//                     "Escriba la opción deseada").toUpperCase()

//     switch(option){
//         case '1':
//         break;
//         case '2':
//         break;
//         case '3':
//         break;
//         case '4':
//         break;
//         case '5':
//         break;
//         default:
//             if(option!="ESC")
//             alert("La opcion ingresada no es valida")
//         break;
//     }
// }while(option!="ESC")