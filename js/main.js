// ============================
// MENU HAMBURGUESA
// ============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show"); // coincide con tu CSS responsive
});

// ============================
// MODALES
// ============================
// Botones para abrir modales
const openButtons = document.querySelectorAll('.open-modal');
// Todos los modales
const modals = document.querySelectorAll('.modal');
// Botones de cerrar
const closeButtons = document.querySelectorAll('.modal-content .close');

// Abrir modal
openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal; 
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    });
});

// Cerrar modal
closeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = e.target.closest('.modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
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

// ============================
// ACORDEÓN
// ============================
const buttons = document.querySelectorAll(".acordeon-btn");

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;

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
                c.style.height = "0";
                c.classList.remove("show", ...animaciones);
                c.previousElementSibling.classList.remove("active");
            }
        });

        // Alternar acordeón actual
        if (content.style.height && content.style.height !== "0px") {
            content.style.height = "0";
            content.classList.remove("show", ...animaciones);
            btn.classList.remove("active");
        } else {
            content.classList.remove(...animaciones);
            void content.offsetWidth; // reinicia animación
            content.classList.add("show");
            btn.classList.add("active");
            const animacion = animaciones[index % animaciones.length];
            content.classList.add(animacion);
            content.style.height = content.scrollHeight + "px";

            // Ajuste dinámico si el contenido cambia
            const resizeObserver = new ResizeObserver(() => {
                content.style.height = content.scrollHeight + "px";
            });
            resizeObserver.observe(content);
        }
    });
});
