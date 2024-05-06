function expandir(categoria) {
    var productos = document.getElementsByClassName(categoria);
    for (var i = 0; i < productos.length; i++) {
        // Alternar clases para mostrar u ocultar elementos
        if (productos[i].classList.contains('oculto')) {
            productos[i].classList.remove('oculto');
            productos[i].classList.add('mostrado');
        } else {
            productos[i].classList.remove('mostrado');
            productos[i].classList.add('oculto');
        }
    }
}