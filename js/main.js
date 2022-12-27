let lista_productos = [
  { nombre: "cacerola18", precio: 45000 },
  { nombre: "cacerola24", precio: 65000 },
  { nombre: "mate", precio: 3500 },
  { nombre: "sarten18", precio: 35000 },
  { nombre: "sarten24", precio: 55000 },
  { nombre: "wok", precio: 68000 }
]



class producto {
  constructor(nombre, precio, cantidad) {
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
  }
 
  getNombre() {
      return this.nombre;
  }
  agregoCantidad(num) {
      this.cantidad = this.cantidad + num;
  }
  agregoUno() {
      this.cantidad = this.cantidad + 1;
  }
}


let carrito = [];



let ollas = document.getElementsByClassName("button-carr");
for (const bota of ollas) {
  bota.addEventListener("click", agregoCarrito);
}


let btnClear = document.getElementById("btn_borrar_todo");
btnClear.addEventListener("click", borrarCarrito);

let carritoRecuperado = localStorage.getItem("carrito");
let carritioTransformado = JSON.parse(carritoRecuperado);
if (carritioTransformado != null && carritioTransformado.length !== 0) {
 
  for (const ele of carritioTransformado) {
      carrito.push(new producto(ele.nombre,ele.precio,ele.cantidad));
  }
  for (const elem of carrito) {
      agregoCarritoHTML(elem);
  }
  totales();
}


function agregoCarrito(event) {
  if (carrito.some((elem) => elem.nombre == event.target.value)) {
      const indiceCarrito = (elem) => elem.nombre == event.target.value;
      let indice = carrito.findIndex(indiceCarrito);
      carrito[indice].agregoUno();
      agregoCarritoRepetido(carrito[indice]);
      carritoStorage();
      totales()
  } else {
      let elemento = lista_productos.find((elem) => elem.nombre == event.target.value);
      let nuevoproducto = new producto(elemento.nombre, elemento.precio, 1);
      agregoCarritoHTML(nuevoproducto);
      carrito.push(nuevoproducto);
      carritoStorage();
      totales()
  }
  console.log(carrito);
}


function agregoCarritoHTML(producto) {
  let divitems = document.getElementById("items_compra");

  let divItemBoton = document.createElement("div");
  divItemBoton.setAttribute("class", "item_resumen_compras")

  let item = document.createElement("p");
  item.innerText = producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
  item.setAttribute("id", producto.nombre)

  let btnborrar = document.createElement("button");
  btnborrar.innerText = "x";
  btnborrar.setAttribute("class", "boton_borrar");
  btnborrar.setAttribute("value", producto.nombre);

  
  btnborrar.addEventListener("click", () => {
      document.getElementById(producto.nombre).parentElement.remove();
      const indiceCarrito = (elem) => elem.nombre == producto.nombre;
      let indice = carrito.findIndex(indiceCarrito);
      carrito.splice(indice, 1);
      console.log(carrito);
      carritoStorage();
  })


  divItemBoton.appendChild(item);
  divItemBoton.appendChild(btnborrar);
  divitems.appendChild(divItemBoton);

}



function agregoCarritoRepetido(producto) {
  let itemrepetido = document.getElementById(producto.nombre);
  itemrepetido.innerText = producto.nombre + "\t" + " x " + producto.cantidad + "\t .Precio Unidad:" + producto.precio;
}


function carritoStorage() {
  let unCarrito = JSON.stringify(carrito);
  localStorage.setItem("carrito", unCarrito);
}


function borrarCarrito() {
  localStorage.clear();
  carrito = [];
  console.log(carrito);
  let borraCarrito = document.getElementById("items_compra");
  borraCarrito.innerHTML = '';
  totales()
}

function totales(){
  if(carrito.length===0){
      document.getElementById("totales").innerText='';
  }else {
      let total=0;
      for (const elem of carrito) {
          total=total + (elem.precio*elem.cantidad);
      }
      let tot=document.getElementById("totales");
      tot.innerText="Total sin IVA: "+ total.toString() + "\n" + "IVA: " +(total*0.21).toString() + "\n" + "TOTAL con IVA: " + (total*1.21).toString();
  }
}