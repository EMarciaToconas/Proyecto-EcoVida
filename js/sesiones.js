document.addEventListener("DOMContentLoaded", function() {
    const rol = sessionStorage.getItem("rol");
    if (rol) {
        if (rol === '1') {
            window.location.href = "./productos.html"; // Redirige al administrador a productos.html
        } else {
            window.location.href = "./index.html"; // Redirige al usuario común al index.html
        }
    }
});