// ============================
// MENU HAMBURGUESA RESPONSIVE
// ============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}

// Cerrar menu al hacer click en un enlace (MÓVIL)
const navLinks = document.querySelectorAll('.nav-menu li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});

// ============================
// MODALES
// ============================
const openButtons = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-content .close');

openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            requestAnimationFrame(() => modal.classList.add('show'));
        }
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 500);
        }
    });
});

// Cerrar modal al hacer click fuera del contenido
modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 500);
        }
    });
});

// ============================
// ACORDEÓN LIBRE (sin orden)
// ============================
const acordeonButtons = document.querySelectorAll(".acordeon-btn");

acordeonButtons.forEach((btn, index) => {
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

        // Ya NO cerramos los otros acordeones.
        const isOpen = content.classList.contains("show");

        if (isOpen) {
            // Cerrar solo este
            content.style.height = "0";
            content.classList.remove("show", ...animaciones);
            btn.classList.remove("active");
        } else {
            // Abrir solo este
            content.classList.remove(...animaciones);
            void content.offsetWidth;

            btn.classList.add("active");
            content.classList.add("show");

            const animacion = animaciones[index % animaciones.length];
            content.classList.add(animacion);

            content.style.height = content.scrollHeight + "px";

            const resizeObserver = new ResizeObserver(() => {
                content.style.height = content.scrollHeight + "px";
            });
            resizeObserver.observe(content);
        }
    });
});

