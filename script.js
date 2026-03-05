/**
 * LÓGICA DE INTERACCIÓN PARA EL EMPRENDIMIENTO
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MANEJO DEL FORMULARIO DE CONTACTO CON ENVÍO REAL
    const formulario = document.querySelector('.formulario-contacto');

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue
            
            const boton = formulario.querySelector('button');
            const status = document.createElement('p'); // Para mostrar mensajes de éxito/error
            
            // Bloqueamos el botón mientras se envía
            boton.disabled = true;
            boton.innerText = "Enviando...";

            const datos = new FormData(formulario);

            try {
                const response = await fetch(formulario.action, {
                    method: formulario.method,
                    body: datos,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
                    formulario.reset();
                } else {
                    alert("Oops! Hubo un problema al enviar. Por favor, intenta de nuevo.");
                }
            } catch (error) {
                alert("Error de conexión. Revisa tu internet e intenta de nuevo.");
            } finally {
                // Restauramos el botón
                boton.disabled = false;
                boton.innerText = "Solicitar Informes";
            }
        });
    }

    // 2. PERSONALIZACIÓN DINÁMICA DE WHATSAPP
    // Si el usuario escribe su nombre en el formulario, lo usamos en el link de WhatsApp
    const btnWhatsapp = document.querySelector('.btn-whatsapp');
    const inputNombre = document.getElementById('nombre');

    if (btnWhatsapp && inputNombre) {
        btnWhatsapp.addEventListener('click', (e) => {
            const nombreUsuario = inputNombre.value.trim();
            if (nombreUsuario !== "") {
                const mensajePersonalizado = encodeURIComponent(`Hola, soy ${nombreUsuario}. Me interesa saber más sobre sus servicios de consultoría.`);
                // Reemplaza los ceros con tu número real
                btnWhatsapp.href = `https://wa.me/528281488009?text=${mensajePersonalizado}`;
            }
        });
    }

    // 3. EFECTO DE REVELACIÓN AL HACER SCROLL (Intersection Observer)
    const secciones = document.querySelectorAll('section');
    
    const opcionesObserver = {
        threshold: 0.15 // Se activa cuando el 15% de la sección es visible
    };

    const aparecerSeccion = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Deja de observar una vez que ya apareció
            }
        });
    }, opcionesObserver);

    secciones.forEach(seccion => {
        // Estado inicial para el efecto (Podrías poner esto en el CSS también)
        seccion.style.opacity = "0";
        seccion.style.transform = "translateY(30px)";
        seccion.style.transition = "all 0.8s ease-out";
        aparecerSeccion.observe(seccion);
    });

});