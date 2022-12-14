// PRODUCTOS
const productos = [
    {
        id: "cama-01",
        titulo: "Cama 'Camilo'",
        imagen: "./imgs/cama-uno.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-02",
        titulo: "Cama 'Matias'",
        imagen: "./imgs/cama-dos.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-03",
        titulo: "Cama 'Alonso'",
        imagen: "./imgs/cama-diez.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-04",
        titulo: "Cama 'Milo'",
        imagen: "./imgs/cama-nueve.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-05",
        titulo: "Cama 'Homero'",
        imagen: "./imgs/cama-cinco.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-06",
        titulo: "Cama 'Benito'",
        imagen: "./imgs/cama-doce.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-07",
        titulo: "Cama 'Ferxxo'",
        imagen: "./imgs/cama-once.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
    {
        id: "cama-08",
        titulo: "Cama 'Nina'",
        imagen: "./imgs/cama-ocho.webp",
        categoria: {
            nombre: "Camas",
            id: "camas"
        },
        precio: 1000
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

//Apend de productos
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

// botonesCategorias.forEach(boton => {
//     boton.addEventListener("click", (e) => {

//         botonesCategorias.forEach(boton => boton.classList.remove("active"));
//         e.currentTarget.classList.add("active");

        // if (e.currentTarget.id != "todos") {
        //     const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        //     tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        //     const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        //     cargarProductos(productosBoton);
        // } else {
        //     tituloPrincipal.innerText = "Todos los productos";
        //     cargarProductos(productos);
        // }

//     })
// });

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}