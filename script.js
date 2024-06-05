const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "ecovida.json",
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
          const categoria = this.getQueryParam('categoria');
          console.log(categoria)
          this.filtro(categoria);
          console.log(this.datosFiltrados)
          
        })
        .catch(error => {
          console.log("Error:" + error);
          this.error = true;
        });
    },

    filtro(categoria) {
      this.datosFiltrados = this.datos.filter(producto => producto.categoría === categoria);
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
