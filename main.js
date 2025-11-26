document.addEventListener('DOMContentLoaded', () => {
    // Animación de habilidades
    const skills = ["HTML", "CSS", "JAVA", "JavaScript", "Batch", "Lua"];
    const skillText = document.getElementById('skill-text');
    let index = 0;

    function updateSkill() {
        // Eliminar clase para reiniciar la animación
        skillText.classList.remove('animate__fadeInOut'); 
        void skillText.offsetWidth; // Trigger reflow para reiniciar
        skillText.textContent = skills[index];
        skillText.classList.add('animate__fadeInOut'); // Añadir clase de animación
        index = (index + 1) % skills.length;
    }

    // Define la animación CSS con keyframes si no está ya en style.css
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes fadeInOutSkill {
            0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
            10% { opacity: 1; transform: translateY(0); filter: blur(0); }
            40% { opacity: 1; transform: translateY(0); filter: blur(0); }
            50% { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
            100% { opacity: 0; }
        }
    `, styleSheet.cssRules.length);

    // Aplica la animación al elemento directamente
    skillText.style.animation = 'fadeInOutSkill 2.5s infinite';

    // Inicia la actualización de habilidades
    updateSkill(); // Mostrar la primera habilidad de inmediato
    setInterval(updateSkill, 2500); // Cambiar habilidad cada 2.5 segundos

    // Animación de elementos al hacer scroll (Ejemplo básico con Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Cuando el 10% del elemento esté visible
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observar secciones y tarjetas
    document.querySelectorAll('.section h3, .section p.subtitle, .service-item, .lang-card').forEach(el => {
        el.classList.add('animate-on-scroll'); // Clase base para animación
        observer.observe(el);
    });

    // Añadir regla CSS para la animación de fade-in-up
    styleSheet.insertRule(`
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.fade-in-up {
            opacity: 1;
            transform: translateY(0);
        }
    `, styleSheet.cssRules.length);

});
