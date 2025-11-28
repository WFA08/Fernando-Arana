document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionar todos los enlaces del navbar
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Seleccionar todas las secciones principales
    const sections = document.querySelectorAll('.main-content-container section');

    // CRÍTICO: Selectores para la animación de scroll de 'Sobre Mí'
    const aboutSection = document.getElementById('seccion-sobremi');
    const blocks = document.querySelectorAll('#seccion-sobremi .about-section-block');
    
    // La duración de la transición debe coincidir con el CSS (0.5s)
    const animationDuration = 500; 
    
    // Puntos de scroll (en píxeles) para ocultar cada bloque secuencialmente.
    // Ajusta estos valores si necesitas más o menos scroll para el efecto.
    const scrollOffsets = [
        100, // Bloque 1 se oculta/muestra después de 100px de scroll
        300, // Bloque 2 se oculta/muestra después de 300px de scroll
        500  // Bloque 3 se oculta/muestra después de 500px de scroll
    ];


    // Función principal para cambiar la sección visible con animación
    function showSection(targetId, currentActiveSection) {
        const targetSection = document.getElementById(targetId);

        if (!targetSection || targetSection === currentActiveSection) {
            return; 
        }
        
        // --- 0. GESTIÓN DEL SCROLL LISTENER (CRÍTICO) ---
        // Si la sección saliente era 'Sobre Mí', removemos el listener.
        if (currentActiveSection && currentActiveSection.id === 'seccion-sobremi') {
            window.removeEventListener('scroll', handleScrollFade);
        }

        // --- 1. TRANSICIÓN DE SALIDA (Fade Out) ---
        if (currentActiveSection) {
            // Inicia el desvanecimiento de la sección saliente
            currentActiveSection.classList.remove('active-section'); 
            
            // Oculta el elemento después de la duración de la transición
            setTimeout(() => {
                currentActiveSection.classList.add('hidden-section');
            }, animationDuration);
        }
        
        // --- 2. TRANSICIÓN DE ENTRADA (Fade In) ---
        // Espera a que la sección saliente se haya ocultado (si aplica)
        setTimeout(() => {
            // Quita la clase de ocultamiento y aplica la clase de animación
            targetSection.classList.remove('hidden-section'); 
            targetSection.classList.add('active-section');
            
            // IMPORTANTE: Resetear el scroll a la cima para el efecto
            window.scrollTo(0, 0); 
            
            // 3. Si la sección entrante es 'Sobre Mí', añadimos el listener y forzamos la ejecución.
            if (targetId === 'seccion-sobremi') {
                window.addEventListener('scroll', handleScrollFade);
                
                // Aseguramos que todos los bloques estén visibles al entrar en la sección
                blocks.forEach(block => block.classList.remove('is-hidden'));
                
                // Inicializar la animación inmediatamente (por si el scroll ya es > 0)
                handleScrollFade(); 
            }
            
        }, currentActiveSection ? animationDuration : 0); 
    }

    /* ================================================= */
    /* === FUNCIÓN: OCULTAR/MOSTRAR BLOQUES AL SCROLL === */
    /* ================================================= */

    function handleScrollFade() {
        // Solo ejecuta la lógica si la sección "Sobre Mí" está activa
        if (!aboutSection || !aboutSection.classList.contains('active-section')) {
            return;
        }

        // scrollPosition es la distancia scrolleada dentro de la sección actual.
        const scrollPosition = window.scrollY; 

        // Bloque 1: Presentación
        if (scrollPosition > scrollOffsets[0]) {
            blocks[0].classList.add('is-hidden'); // Ocultar
        } else {
            blocks[0].classList.remove('is-hidden'); // Mostrar (scroll up)
        }

        // Bloque 2: Stack y Proyectos
        if (scrollPosition > scrollOffsets[1]) {
            blocks[1].classList.add('is-hidden');
        } else {
            blocks[1].classList.remove('is-hidden');
        }

        // Bloque 3: Ciberseguridad
        if (scrollPosition > scrollOffsets[2]) {
            blocks[2].classList.add('is-hidden');
        } else {
            blocks[2].classList.remove('is-hidden');
        }
    }


    // Manejador de eventos para los clics en el navbar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.getAttribute('data-target');
            const currentActiveSection = document.querySelector('.active-section'); 
            
            showSection(targetId, currentActiveSection);

            // Actualizar la clase 'active' del navbar
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Inicialización: Asegurar que la sección de inicio es visible al cargar
    const initialSection = document.getElementById('seccion-inicio');
    if (initialSection) {
        initialSection.classList.remove('hidden-section');
        initialSection.classList.add('active-section');
    }
    
    // Si la página inicia directamente en la sección "Sobre Mí" (útil para el preview), activa el listener.
    if (aboutSection && aboutSection.classList.contains('active-section')) {
         window.addEventListener('scroll', handleScrollFade);
         handleScrollFade();
    }
});