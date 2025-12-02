// ============================
// MENU HAMBURGUESA
// ============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show"); // coincide con tu CSS responsive
    });
}

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

modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 500);
        }
    });
});

// ============================
// ACORDEÓN
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
