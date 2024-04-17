



function groc(element) {
    element.style.color = '#CFCB29';
}
function blanc(element) {
    element.style.color = 'white'
}



////////////////////////////////N A V - B A R ///////////////////////////////////


  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
      const navbar = document.getElementById('navbarS');
      const toggler = document.querySelector('.navbar-toggler');

      if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
        navbar.classList.remove('show');
      }
    });
  });






///////////////////////////////////// C O N T A C T O  ///////////////////////////////////////////


function parpadear() {
    var garResp = document.getElementById('garResp');
    var amarillo = true;

    setInterval(function () {
        if (amarillo) {
            garResp.style.color = '#CFCB29';
        } else {
            garResp.style.color = 'white';
        }
        amarillo = !amarillo;
    }, 550);
}

document.addEventListener('DOMContentLoaded', function () {
    parpadear();
});

//fin codigo texto parpadeo



////////////////// R E G I S T R O  / VALIDACIÓN MENSAJE ENVIADO ////////////////////////////// 

document.addEventListener('DOMContentLoaded', function () {
    // Event listener para abrir el modal de registro
    document.getElementById('abrirModalReg').addEventListener('click', function (event) {
        event.preventDefault();
        abrirModalRegistro();
    });

    // Event listener para el botón de registro dentro del modal
    document.getElementById('registrarBtn').addEventListener('click', function (event) {
        event.preventDefault();
        realizarRegistro();
    });

    function abrirModalRegistro() {
        console.log('Modal de registro abierto');
    }

    function realizarRegistro() {

        var nombreRegistro = document.getElementById('nombreRegistro').value;
        var apellidos = document.getElementById('apellidos').value;
        var email = document.getElementById('email').value;
        var usuarioRegistro = document.getElementById('usuarioRegistro').value;
        var contrasena = document.getElementById('contrasena').value;
        var contrasenaB = document.getElementById('contrasenaB').value;

        console.log('Nombre Registro:', nombreRegistro);
        console.log('Apellidos:', apellidos);
        console.log('Email:', email);
        console.log('Usuario Registro:', usuarioRegistro);
        console.log('Contraseña:', contrasena);
        console.log('Contraseña B:', contrasenaB);

        // validaciones
        if (nombreRegistro.trim() === '' || apellidos.trim() === '' || email.trim() === '' || usuarioRegistro.trim() === '' || contrasena.trim() === '' || contrasenaB.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        if (contrasena !== contrasenaB) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        function limpiarModalRegistro() {
            document.getElementById('nombreRegistro').value = '';
            document.getElementById('apellidos').value = '';
            document.getElementById('email').value = '';
            document.getElementById('usuarioRegistro').value = '';
            document.getElementById('contrasena').value = '';
            document.getElementById('contrasenaB').value = '';
        }

        function limpiarModalRegistroPassword() {
            
            document.getElementById('contrasena').value = '';
            document.getElementById('contrasenaB').value = '';
        }

    
        fetch('/registrar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreRegistro: nombreRegistro,
                apellidos: apellidos,
                email: email,
                usuarioRegistro: usuarioRegistro,
                contrasena: contrasena
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);

            if (data.status === 'success') {
                alert('Registro exitoso!');
                limpiarModalRegistro();
                modalRegistro.style.display = 'none';

            } else if (data.status === 'error') {
                limpiarModalRegistroPassword();
                alert(data.message);
                

            } else {
                console.error('Respuesta inesperada del servidor:', data);
            }
        })
        .catch(error => {
            console.error('Error al registrar usuario:', error);
        });
    }
});

////////////////// C O N T A C T O / VALIDACIÓN MENSAJE ENVIADO ////////////////////////////// 


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('enviarBtn').addEventListener('click', function (event) {
        event.preventDefault();

        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var mensaje = document.getElementById('mensaje').value;

        if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Enviar la solicitud POST
        fetch('/enviar_mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            // Manejar la respuesta del servidor
            alert('Mensaje enviado correctamente!');
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        });
    });
});




//////////////////////// MULTI-HTML //////////////////

function wordFlick(selector, words, initialWord = '') {
    var part,
        i = 0,
        offset = 0,
        len = words.length,
        forwards = true,
        skip_count = 0,
        skip_delay = 15,
        speed = 70;


    document.querySelector(selector).textContent = initialWord;

    setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        document.querySelector(selector).textContent = part;
    }, speed);
}

document.addEventListener('DOMContentLoaded', function () {
    wordFlick('.word', ['No lo dudes', 'Contacta con nosotros', 'Sin compromiso!'], 'Palabra Inicial');
    wordFlick('.word2', ['Otra palabra', 'Más palabras'], 'Somos Expertos en ');
});






/////////////////T E A M ///////////////////


var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};






////////////////////////////////////////////////// Ventana modal ACCESO //////////////////////////////////////////////////

var modalAcceso = document.getElementById("ventanaModal");
var botonAcceso = document.getElementById("abrirModal");
var spanAcceso = document.getElementsByClassName("cerrar")[0];

botonAcceso.addEventListener("click", function () {
    modalAcceso.style.display = "block";
});

spanAcceso.addEventListener("click", function () {
    modalAcceso.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modalAcceso) {
        modalAcceso.style.display = "none";
    }
});





////////////////////////////////////////////////// Ventana modal Registro //////////////////////////////////////////////////

var modalRegistro = document.getElementById("ventanaModalReg");
var botonRegistro = document.getElementById("abrirModalReg");
var spanRegistro = document.getElementsByClassName("cerrar")[1]; // Use [1] for the second modal

botonRegistro.addEventListener("click", function () {
    modalRegistro.style.display = "block";
    modalAcceso.style.display = "none"; // Oculta el primer modal al abrir el segundo modal
});

spanRegistro.addEventListener("click", function () {
    modalRegistro.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modalRegistro) {
        modalRegistro.style.display = "none";
    }
});





//////////////////////////////////// N A V - B A R /////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbarS');
  
    // Manejar clics en enlaces dentro del navbar
    navbar.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        // Cierra el menú
        navbar.classList.remove('show');
      }
    });
  });
  