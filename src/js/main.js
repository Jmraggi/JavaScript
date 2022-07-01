//----------------ARRAYS-----------------------

//Mates

const productos = [
    {id:0, nombre: "Alpaca", precio: 1500, img: "../src/media/mateAlpaca.jpg"},   
    {id:1, nombre: "Cuerno", precio: 500, img: "../src/media/mateCuerno.jpg"},
    {id:2, nombre: "Tapa", precio: 4000, img: "../src/media/mateTapa.jpg"},  
    {id:3, nombre: "Uruguayo", precio: 2500, img: "../src/media/mateUru.png"},
]

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
            <button id="compra" onclick="compra(${producto.id})" class="btn btn-primary">Comprar</button>
        </div>
    </div>
    `
    cards.append(card)
});

//----------------NAVBAR-----------------------

//----------FUNCIONES DEL PROYECTO-------------

const compra = (x) => {
carrito.push(productos[x])
carrito.forEach(producto => {
    let table = document.createElement("div")
    table.innerHTML = `
    <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <th>${producto.nombre}</th>
                <th>${producto.precio}</th>
            </tr>
          </tbody>
    </div>
    `
    listaCarrito.append(table)
})}

