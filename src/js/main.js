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


//--------------CALIFICACIONES-----------------

class Opiniones {
  constructor(nombre, puntaje,opinion) {
    this.nombre = nombre,
    this.puntaje = puntaje,
    this.opinion = opinion
  }
  
}

const arrayOpinion = JSON.parse( localStorage.getItem("array")) || [];

window.addEventListener("load", () => {
  if (arrayOpinion.length > 0) {
    generarInterfaz(arrayOpinion)
  }
})
let bandera = false
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault()

  let nodo = e.target.children;

  if(bandera) {
    console.log("actualizando");
    editarCampos()
    bandera = false
  }else{
    const Opinion = new Opiniones (nodo[0].value,nodo[1].value,nodo[2].value,nodo[3].value)
    arrayOpinion.push(Opinion)
    generarInterfaz(arrayOpinion)
  }
  localStorage.setItem("array", JSON.stringify(arrayOpinion))
  console.log(arrayOpinion);
  form.reset()
})


const generarInterfaz = (arr) => {
  let containerOpiniones = document.getElementById("containerOpiniones")
containerOpiniones.innerHTML = "";
  arr.map( el => containerOpiniones.innerHTML += `
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 mt-2">
        <div class="card id="${el.nombre}">
        <div class="card-body">
          <h5 class="card-title">${el.nombre}</h5>
          <p class="card-text">${el.puntaje}</p>
          <p class="card-text">${el.opinion}</p>
          <button type="button" class="btn btn-danger btn_eliminar">Borrar</button>
          <button type="button" class="btn btn-primary btn_actualizar">Actualizar</button>
          </div>
        </div>                
      </div>
    </div>
</div>
    `
  )

  eliminar()
  actualizar()
}

const eliminar = () => {
  let btnEliminar = document.querySelectorAll(".btn_eliminar")
  for (const btn of btnEliminar) {
    btn.addEventListener("click", (event) => {
      let nodo = event.path[2]
      let buscar = arrayOpinion.findIndex( el => el.nombre == nodo.id);
      arrayOpinion.splice(buscar, 1)
      console.log(arrayOpinion);
      nodo.remove()
    })
  }
}

const actualizar = () => {
  let btnActualizar = document.querySelectorAll(".btn_actualizar");
  for (const btn of btnActualizar) {
    btn.addEventListener("click", (e) => {
        bandera = true;
        let nodo = e.path[2];
        console.log(e.path);
        let buscar = arrayOpinion.find( el => el.nombre == nodo.id);
        console.log(nodo);
        document.getElementById("nombre").value = buscar.nombre;
        document.getElementById("puntaje").value = buscar.puntaje;
        document.getElementById("opinion").value = buscar.opinion;
    })
  }

}

const editarCampos = () => {
  let id = document.getElementById("nombre").value 
  console.log(id);
  let buscar = arrayOpinion.findIndex(el => el.nombre == id)
  console.log(arrayOpinion);
  console.log(buscar);
  console.log( arrayOpinion[buscar] );
  arrayOpinion[buscar].puntaje =  document.getElementById("puntaje").value
  arrayOpinion[buscar].opinion =  document.getElementById("opinion").value
  generarInterfaz(arrayOpinion)
}

let input_search = document.getElementById("input_search");


