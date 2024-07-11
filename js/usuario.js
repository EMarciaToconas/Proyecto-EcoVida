const { createApp } = Vue
  createApp({
    data() {
      return {
        usuarios:[],
        
        url:'https://elidelgado075.pythonanywhere.com/usuarios',  
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        usuario:"", 
        rol:"",
        clave:"",
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
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			        alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let usuario = {
                usuario:this.usuario,
                rol: this.rol,
                clave: this.clave,
            }
            var options = {
                body:JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
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
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    alert(err.message);
                });       
        }
    },
    sesión(event) {
        event.preventDefault();
        clave=this.clave

        var i=0
            while ( i < this.usuarios.length && this.usuarios[i].clave != this.clave  ){
                i++
            }
            if (i<(this.usuarios.length)){
                if (this.usuarios[i].clave==this.clave){
                    if (this.usuarios[i].rol=="1"){
                        sessionStorage.setItem("rol", this.usuarios[i].rol)
                        window.location.href = "./sesión.html";
                    }else{
                        alert('Error')
                    }
                                        
                }else{
                    alert('Error')
                }
            }else{
                alert('Usuario erroneo')
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
        this.fetchData(this.url)
    },
}).mount('#app')