document.addEventListener("DOMContentLoaded", function() {
    const rol = sessionStorage.getItem("rol");
    if (rol) {
        if (rol === '1') {
            window.location.href = "./productos.html"; // Redirige al administrador a productos.html
        } else {
            // Aquí podrías redirigir a otra página para usuarios comunes si fuera necesario
            // window.location.href = "./index.html"; // Redirige al usuario común al index.html, por ejemplo
        }
    }
});