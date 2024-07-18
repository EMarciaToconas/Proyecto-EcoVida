const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "https://user912.pythonanywhere.com/productos",
      //url: "https://mcerda.pythonanywhere.com/productos",
      datos: [],
      datosFiltrados: [],
      error: false,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.datos = data;
          console.log(this.datos)
          const tipoproducto = this.getQueryParam('tipoproducto');
          console.log(tipoproducto)
          this.filtro(tipoproducto);
          console.log(this.datosFiltrados)
          
        })
        .catch(error => {
          console.log("Error:" + error);
          this.error = true;
        });
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
    this.fetchData(this.url);
  }
}).mount('#app');
