// Seleccionamos todos los botones para abrir modales
const openButtons = document.querySelectorAll('.open-modal');
// Seleccionamos todos los modales
const modals = document.querySelectorAll('.modal');
// Seleccionamos todos los botones de cerrar
const closeButtons = document.querySelectorAll('.modal-content .close');

// Función para abrir un modal con animación
openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal; // obtiene el id del modal
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';       // muestra el modal
        requestAnimationFrame(() => {       // asegura animación
            modal.classList.add('show');    // activa animación CSS
        });
    });
});

// Función para cerrar un modal con animación inversa
closeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = e.target.closest('.modal');
        modal.classList.remove('show'); // inicia animación de cierre
        setTimeout(() => {
            modal.style.display = 'none'; // oculta modal tras animación
        }, 500); // debe coincidir con la duración de tu transition CSS
    });
});

// Cerrar modal al hacer click fuera del contenido
modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    });
});

// Selecciona todos los botones del acordeón
const buttons = document.querySelectorAll(".acordeon-btn");

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling; // contenido del acordeón

        // Lista de animaciones compatibles con tu CSS
        const animaciones = [
            "blur-in",
            "flip-vertical",
            "flip-horizontal",
            "accordion-wave",
            "slide-fade",
            "stretch-opacity"
        ];

        // Cerrar otros acordeones
        document.querySelectorAll(".acordeon-contenido").forEach(c => {
            if (c !== content) {
                c.style.height = "0"; // cerrar
                c.classList.remove("show", ...animaciones);
                c.previousElementSibling.classList.remove("active");
            }
        });

        // Alternar acordeón actual
        if (content.style.height && content.style.height !== "0px") {
            // Si está abierto → cerrarlo
            content.style.height = "0";
            content.classList.remove("show", ...animaciones);
            btn.classList.remove("active");
        } else {
            // Si está cerrado → abrirlo

            // Resetear animación
            content.classList.remove(...animaciones);
            void content.offsetWidth; // reinicia animación

            // Aplicar clase show y animación
            content.classList.add("show");
            btn.classList.add("active");
            const animacion = animaciones[index % animaciones.length];
            content.classList.add(animacion);

            // Asignar altura real del contenido
            content.style.height = content.scrollHeight + "px";

            // Ajuste final para que funcione si hay contenido dinámico
            const resizeObserver = new ResizeObserver(() => {
                content.style.height = content.scrollHeight + "px";
            });
            resizeObserver.observe(content);
        }
    });
});
