    document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inicioform");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        const usuario = document.getElementById("usuario").value;
        const clave = document.getElementById("clave").value;



        // Lógica de autenticación
        if (usuario === "admin" && clave === "5555") {
            sessionStorage.setItem("rol", "1");
        }
        else {
            sessionStorage.setItem("rol", "2");
        }

        // Ejecuta el redireccionamiento basado en el rol
        const rol = sessionStorage.getItem("rol");
        if (rol === '1') {
            window.location.href = "./productos.html";
        } else {
            window.location.href = "./index.html";
        }

    }
    );
});