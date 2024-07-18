const { createApp } = Vue
createApp({
    data() {
      return {
        productos:[],
        productosFiltrados:[],
        
        url:'https://user912.pythonanywhere.com/productos', 
        //url:'https://mcerda.pythonanywhere.com/productos', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        stock:0,
        precio:0,
        tipoproducto:0

    }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
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
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                stock: this.stock,
                tipoproducto: this.tipoproducto,
                imagen:this.imagen,
                descripcion:this.descripcion

            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Producto Guardado")
                    window.location.href = "./productos.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Guardar")  // puedo mostrar el error tambien
                })      
        },

        filtro(tipoproducto) {
            this.datosFiltrados = this.datos.filter(nombre => nombre.tipoproducto === tipoproducto);
          },
      
          getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
          }

        
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')