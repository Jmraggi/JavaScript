//----------------ARRAYS-----------------------

//Mates

const productos = [
    {id:0, nombre: "Alpaca", precio: 1500, img: "src/media/mateAlpaca.jpg"},   
    {id:1, nombre: "Cuerno", precio: 500, img: "src/media/mateCuerno.jpg"},
    {id:2, nombre: "Tapa", precio: 4000, img: "src/media/mateTapa.jpg"},  
    {id:3, nombre: "Uruguayo", precio: 2500, img: "src/media/mateUru.png"},
]

//PopPup iva
function mostrarPrecioConIva(precio){
  let precioFinal = precio * 1.21;
  alert("El precio es " + precioFinal);
}

//Carrito
const carrito = []

let listaCarrito = document.getElementById("listaCarrito")
let valorFinal = document.getElementById("precio")


//----------------DOM--------------------------

//-----------------Carta de Productos----------
let cards = document.getElementById("cartaProducto")

productos.forEach(producto => {
    let card = document.createElement("div")
    card.className = "col-sm-3"
    card.innerHTML = `
    <div class="card border-dark text-center" style="width: 18rem;">
      <img src="${producto.img}" class="img-thumbnail" alt="..">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text fs-3">$${producto.precio}</p>
            <button id="compra" onclick="mostrarPrecioConIva(${producto.precio})" class="btn btn-primary">Precio Con Iva</button>
            <button id="compra" onclick="compra(${producto.id})" class="btn btn-primary">Comprar</button>
        </div>
    </div>
    `
    cards.append(card)
});

//----------------NAVBAR-----------------------

var tiempo=3000
var saludos=new Array(4)
saludos[0]="Los mejores mates de la costa"
saludos[1]="Bienvenidos a mateMania"
saludos[2]="Nose que decir"
saludos[3]="Comprando el mate te regalamos la bombilla"
var indice_saludos=0

function cambiar_saludos(){
  $("div.saludos").remove();
  if (indice_saludos>=saludos.length-1)
  indice_saludos=0
  indice_saludos++
  setTimeout("cambiar_saludos()",tiempo)
  var container = document.getElementsByClassName("saludo");
  var saludo = document.createElement("div");
  saludo.classList.add("saludos");
  saludo.innerHTML = `
    <p>${saludos[indice_saludos]}</p>
  `;
  container[0].appendChild(saludo)
}


//----------FUNCIONES DEL PROYECTO-------------

const compra = (x) => {
carrito.push(productos[x])
$("div.carro").remove();
carrito.forEach(producto => {
    let table = document.createElement("div");
    table.classList.add("carro");
    table.innerHTML = "";
    table.innerHTML = `
                <th>${producto.nombre}</th>
                <th>${producto.precio}</th>

    `;
    listaCarrito.appendChild(table)
})}

