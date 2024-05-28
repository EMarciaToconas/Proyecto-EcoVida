document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Evitar el envío del formulario
    event.preventDefault();
  
    // Limpiar mensajes de error anteriores
    document.getElementById('errorNombre').textContent = '';
    document.getElementById('errorApellido').textContent = '';
    document.getElementById('errorMail').textContent = '';
    document.getElementById('errorMensaje').textContent = '';
  
    // Obtener valores de los campos
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let mail = document.getElementById('mail').value.trim();
    let mensaje = document.getElementById('mensaje').value.trim();
  
    // Validar los campos
    let isValid = true;
  
    if (nombre === '') {
        document.getElementById('errorNombre').textContent = 'El nombre es obligatorio';
        isValid = false;
    }
  
    if (apellido === '') {
        document.getElementById('errorApellido').textContent = 'El apellido es obligatorio';
        isValid = false;
    }
  
    if (mail === '') {
        document.getElementById('errorMail').textContent = 'El e-mail es obligatorio';
        isValid = false;
    } else if (!validateEmail(mail)) {
        document.getElementById('errorMail').textContent = 'El e-mail no es válido';
        isValid = false;
    }
  
    if (mensaje === '') {
        document.getElementById('errorMensaje').textContent = 'El mensaje es obligatorio';
        isValid = false;
    }
  
    // Si todos los campos son válidos, se puede enviar el formulario
    if (isValid) {
        alert('Formulario enviado con éxito!');
        this.submit();
    }
  });
  
  function validateEmail(email) {
    // Expresión regular para validar e-mail
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }