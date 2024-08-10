$(document).ready(function () {
   
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let tablaProductos = $('#tablaProductos').DataTable();
    let tablaCarrito = $('#tablaCarrito').DataTable();

   
    function actualizarTablaProductos() {
        tablaProductos.clear().draw();
        productos.forEach((producto, index) => {
            tablaProductos.row.add([
                producto.codigo,
                producto.nombre,
                producto.cantidad,
                `$${producto.precio}`,
                `<button class="btn btn-success btn-sm agregarCarrito" id="agregarCarrito" data-index="${index}">Agregar al Carrito</button>`,
                `<button class="btn btn-danger btn-sm eliminarProducto" id="eliminarProducto" data-index="${index}">Eliminar</button>`
            ]).draw();
        });
    }
        
    function actualizarTablaCarrito() {
        tablaCarrito.clear().draw();
        carrito.forEach((producto, index) => {
            const total = producto.cantidad * producto.precio;
            tablaCarrito.row.add([
                producto.codigo,
                producto.nombre,
                producto.cantidad,
                `$${producto.precio}`,
                `$${total}`,
                `<button class="btn btn-danger btn-sm eliminarCarrito" data-index="${index}">Eliminar</button>`
            ]).draw();
        });
    }

   
    $('#formProducto').submit(function (e) {
        e.preventDefault();
        const codigo = $('#codigoProducto').val();
        const nombre = $('#nombreProducto').val();
        const cantidad = $('#cantidadProducto').val();
        const precio = $('#precioProducto').val();
        productos.push({ codigo, nombre, cantidad, precio });
        localStorage.setItem('productos', JSON.stringify(productos));
        $('#modalProducto').modal('hide');
        actualizarTablaProductos();
        this.reset();
    });

    $('#btn-close-modal').click(function () {
        $('#modalProducto').modal('hide');
    });

   
    $('#tablaProductos').on('click', '#agregarCarrito', function () {
        const index = $(this).data('index');
        mostrarAlerta('¡Producto agregado al carrito!', 'success');
        carrito.push(productos[index]);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarTablaCarrito();
    });

    
    $('#tablaProductos').on('click', '#eliminarProducto', function () {
        const index = $(this).data('index');
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        actualizarTablaProductos();
    });

    
    $('#tablaCarrito').on('click', '.eliminarCarrito', function () {
        const index = $(this).data('index');
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarTablaCarrito();
    });

    
    if (window.location.pathname.includes('index.html')) {
        actualizarTablaProductos();
    } else if (window.location.pathname.includes('carrito.html')) {
        actualizarTablaCarrito();
    }

    function mostrarAlerta(mensaje, tipo) {
        const alerta = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $('#alertContainer').html(alerta);       
    }

});
