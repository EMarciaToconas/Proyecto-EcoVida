const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://elidelgado075.pythonanywhere.com/usuarios',
            error: false,
            cargando: true,
            usuario: "",
            rol: "",
            clave: "",
            sortKey: "",
            sortAsc: true
        }
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = `${this.url}/${id}`;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Registro Eliminado');
                    location.reload();
                });
        },
        grabar() {
            let usuario = {
                usuario: this.usuario,
                rol: this.rol,
                clave: this.clave,
            };
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.url, options)
                .then(response => {
                    if (response.status === 201) {
                        return response.json();
                    } else if (response.status === 409) {
                        throw new Error("El usuario ya existe");
                    } else {
                        throw new Error("Error al crear usuario");
                    }
                })
                .then(data => {
                    alert("Registro grabado");
                    // Redireccionar según el rol del usuario
                    if (data.rol === '1') {
                        window.location.href = "./productos.html"; // Redirige al administrador a productos.html
                    } else {
                        window.location.href = "./sesion.html"; // Redirige al usuario común a sesion.html
                    }
                })
                .catch(err => {
                    alert(err.message);
                });
        },
        sort(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = true;
            }
        }
    },

    computed: {
        sortedUsuarios() {
            return this.usuarios.slice().sort((a, b) => {
                let modifier = this.sortAsc ? 1 : -1;
                if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
                if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
                return 0;
            });
        }
    },

    created() {
        this.fetchData(this.url);
    }
}).mount('#app');