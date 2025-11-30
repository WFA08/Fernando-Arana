document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los enlaces del navbar
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Seleccionar todas las secciones principales
    const sections = document.querySelectorAll('.main-content-container section');

    // La duración de la transición debe coincidir con el CSS (0.5s)
    const animationDuration = 500; 

    // Función principal para cambiar la sección visible con animación
    function showSection(targetId, currentActiveSection) {
        const targetSection = document.getElementById(targetId);

        if (!targetSection || targetSection === currentActiveSection) {
            return; 
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
        }, currentActiveSection ? animationDuration : 0); 
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
}
)

function abrirCalculadora() {
    const projectsGrid = document.getElementById('projects-grid');
    const projectView = document.getElementById('project-view');
    const projectContent = document.getElementById('project-content');
    const closeBtn = document.getElementById('close-project');
    // Ocultar la cuadrícula de proyectos
    projectsGrid.style.display = 'none';
    // Mostrar la vista del proyecto
    projectView.style.display = 'block';
    // Cargar el contenido de la calculadora
    projectContent.innerHTML = `<iframe src="projects/calculadora/calculadora.html" width="100%" height="500px" style="border:none;"></iframe>`;
}

function cerrarProyecto() {
    const projectsGrid = document.getElementById('projects-grid');
    const projectView = document.getElementById('project-view');
    const projectContent = document.getElementById('project-content');

    // Ocultar la vista del proyecto
    if (projectView) {
        projectView.style.display = 'none';
    }
    
    // Volver a mostrar la grilla
    if (projectsGrid) {
        projectsGrid.style.display = 'grid'; // O 'block', dependiendo de cómo definas 'projects-grid'
    }

    // Opcional: limpiar el contenido incrustado
    if (projectContent) {
        projectContent.innerHTML = '';
    }
};