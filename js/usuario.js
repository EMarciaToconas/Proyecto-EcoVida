const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://user91.pythonanywhere.com/usuarios',
            error: false,
            cargando: true,
            usuario: "",
            clave: "",
            sortKey: "",
            sortAsc: true
        };
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

        sesión(event) {
            event.preventDefault();

            // Obtener la clave como cadena
            const clave = this.clave.toString();

            // Buscar el usuario por nombre de usuario y clave
            const usuarioEncontrado = this.usuarios.find(user => {
                return user.usuario === this.usuario && user.clave.toString() === clave;
            });

            if (usuarioEncontrado) {
                // Usuario encontrado, establecer rol en sessionStorage
                sessionStorage.setItem("rol", usuarioEncontrado.rol.toString());

                // Redirigir según el rol del usuario
                if (usuarioEncontrado.rol.toString() === '1') { // Administrador
                    window.location.href = "./productos.html";
                } else {
                    alert('Error: No tiene acceso como administrador');
                }
            } else {
                alert('Usuario o contraseña incorrectos');
            }
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
