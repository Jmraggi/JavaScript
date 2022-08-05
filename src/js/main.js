
//------------------ DECLARACION DE VARIABLES -----------------------
const carrito = []

let listaCarrito = document.getElementById("listaCarrito")
let valorFinal = document.getElementById("precio")


const lista = document.querySelector("#listado")
let productos = []

let cards = document.getElementById("cartaProducto")




//--------------NAVBAR--------------------
let nav = document.getElementById("nav")
nav.innerHTML=`
<nav class="navbar navbar-dark navbar-expand-lg bg-dark pt-3">
      <div class="container-fluid">
        <a class="navbar-brand ms-5" href="#"><img img src="src/media/mate.png" width="38" height="30" class="me-3" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        </div>
        <div class="me-5">
          <button class="btn btn-primary position-relative">
          <i class="fa fa-shopping-cart" style="font-size:30px; color: #ffffff;"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            0
          </span>
        </button>
          </div>
        </div>
      </div>
    </nav>
`


//-----------------   CARTAS DE PRODUCTOS   ----------

$( document ).ready(function() {

  fetch("./mates.json")
  .then ( (res) => res.json())
  .then ( (data) =>{
    productos = data;

    data.forEach((producto) => {
      let card = document.createElement("div")
      card.className = "col-sm-3 py-5"
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
    
    })
});




//---------------- SALUDOS ACTUALIZANDO -----------------------

var tiempo=3000
var saludos=new Array(4)
saludos[0]="Los mejores mates de la costa"
saludos[1]="Bienvenidos a mateMania"
saludos[2]="Solo brindamos calidad"
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

//----------FUNCION DE COMPRA -------------

const compra = (x) => {
carrito.push(productos[x])
$("div.carro").remove();

let total = carrito.reduce((acc, item)=>{
  return acc + item.precio}, 0)

carrito.forEach(producto => {
    let table = document.createElement("div");
    table.classList.add("carro");
    table.innerHTML = "";
    table.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body" style="color: black;">
        <h2 class="card-title">${producto.nombre}</h2>
        <p class="card-text" style="font-size: 15px;">Calidad: ${producto.calidad}</p>
        <p class="card-text" style="font-size: 15px;">Precio: $${producto.precio}</p>
      </div>
    </div>
  </div>
</div>
`;
    swal.fire({
      title:'Agregado al carrito'
    })
    listaCarrito.appendChild(table)
})}




//--------------CALIFICACIONES EN LOCAL STORAGE-----------------

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
          </div>
        </div>                
      </div>
    </div>
</div>
    `
  )

  eliminar()
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


