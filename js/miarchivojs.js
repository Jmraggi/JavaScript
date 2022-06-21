precioCosto = 1000;
precio = precioCosto.toFixed(2);
stock = parseInt(15);


//Objeto producto

function Mate(precio,stock,descripcion){
    this.precio = precio;
    this.stock = stock;
    this.descripcion = descripcion;
    this.vender = function venta(){
        this.stock--; return this;
    }
}
const mateAlpaca = new Mate (1500, 10,"mate de buena calidad");
const mateCuerno = new Mate (800, 10,"mate de calidad media");
const mateTapa = new Mate (3000, 10,"mate de muy buena calidad");
const mateUru = new Mate (1000, 10,"mate normal");


var lista = [];
lista.push(mateAlpaca);
lista.push(mateCuerno);
lista.push(mateTapa);
lista.push(mateUru);
console.log(lista);



//Calcular el producto en cuotas
function calculoCuotas(){

    let entrada = prompt("Ingrese la cantidad de cuotas (3/6/12), para salir escribir ESC");

    while (entrada != "ESC"){

        switch (entrada) {

            case "3":
                tresCuotas = (precioCosto / 3);
                alert("El valor de las cuotas es: " + tresCuotas);
                break;

            case "6":
                seisCuotas = (precioCosto / 6) * 1.30;
                alert("El valor de las cuotas es: " + seisCuotas);
                break;

            case "12":
                doceCuotas = (precioCosto / 12) * 1.40;
                alert("El valor de las cuotas es: " + doceCuotas);
                break;

            default:
                alert("No estariamos entendiendo... no te di esas cuotas")
                break;


        }
        entrada = prompt("Ingrese la cantidad de cuotas (3/6/12), para salir escribir ESC");
    }

}

//Arturito te da plata
function prestamista(){
    prestamo = parseInt(prompt("Humano por favor, cuando deseas que te preste?: "));
    
    if (prestamo <= 150000){
        cuotas = (prestamo / 120) * 1.10;
    }else{
      cuotas = (prestamo / 120) * 1.05;   
    }

    alert("El prestamo fue de: " + prestamo);
    alert("Las cuotas fijas en un año seran de: " + cuotas);
}

//Agregarle IVA al producto
function ivaProducto (precioCosto) {
    return (precioCosto * 0.21)
}
function mostrarIva(){

    var iva = ivaProducto(precioCosto);
    ivaM = iva.toFixed(2);

    precioCosto = precioCosto.toFixed (2);
    var conIva = parseFloat(precioCosto) + parseFloat(ivaM); 
    conIvaInclu = conIva.toFixed(2);

  alert("El IVA del producto es: " + ivaM);
  alert("El precio final del producto: " + conIvaInclu);
}

//Ver STOCK

