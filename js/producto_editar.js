console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        stock:0,
        precio:0,
        descripcion:"",
        categoria:0,
        tipoproducto:0,

        //url:'https://mcerda.pythonanywhere.com/productos/'+id,
        url:'https://user912.pythonanywhere.com/productos'+id, 
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre
                    this.imagen=data.imagen
                    this.stock=data.stock
                    this.precio=data.precio 
                    this.descripcion=data.descripcion
                    this.categoria=data.categoria
                    this.tipoproducto=data.tipoproducto
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                descripcion: this.descripcion,
                categoria: this.categoria,
                tipoproducto: this.tipoproducto
            }
            console.log("Datos del producto a modificar:", producto); // Registro de los datos
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app') 	
