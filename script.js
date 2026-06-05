/**
 * APSTI Dashboard - JavaScript Interactivo
 * Funcionalidades: Formulario de contacto, Toast notifications,
 * Tarjetas interactivas, Galería, Calculadora de breakpoints,
 * Notas rápidas, Reloj en tiempo real, Modales
 */

// ============================================
// UTILIDADES
// ============================================

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {string} title - Título opcional
 */
function showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const titles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title || titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);

    // Cerrar al hacer click
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    });
}

/**
 * Muestra u oculta el overlay de carga
 * @param {boolean} show - true para mostrar, false para ocultar
 */
function toggleLoading(show) {
    const overlay = document.getElementById('loadingOverlay');

    overlay.style.display = show ? 'flex' : 'none';
}

/**
 * Abre un modal
 * @param {string} modalId - ID del modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra un modal
 * @param {string} modalId - ID del modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// MENÚ RESPONSIVE
// ============================================

function initMenuToggle() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isHidden = nav.style.display === 'none';
        nav.style.display = isHidden ? 'block' : 'none';
        toggle.classList.toggle('active', isHidden);
        toggle.querySelector('.toggle-text').textContent = isHidden ? 'Cerrar' : 'Menú';
    });

    // En móvil, cerrar nav al hacer click en un enlace
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 600) {
                nav.style.display = 'none';
                toggle.classList.remove('active');
                toggle.querySelector('.toggle-text').textContent = 'Menú';
            }
        });
    });
}

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const section = link.dataset.section;
            showToast(`Navegando a: ${link.textContent.trim()}`, 'info');
        });
    });
}

// ============================================
// TARJETAS INTERACTIVAS
// ============================================

function initCards() {
    const cards = document.querySelectorAll('.card');

    const cardDetails = {
        grid: {
            title: 'CSS Grid Layout',
            content: `
                <p><strong>CSS Grid Layout</strong> es un sistema de diseño bidimensional que maneja tanto filas como columnas simultáneamente.</p>
                <h4>Propiedades clave:</h4>
                <ul>
                    <li><code>display: grid</code> - Activa el grid</li>
                    <li><code>grid-template-columns</code> - Define columnas</li>
                    <li><code>grid-template-rows</code> - Define filas</li>
                    <li><code>gap</code> - Espaciado entre celdas</li>
                    <li><code>grid-area</code> - Asigna áreas nombradas</li>
                </ul>
                <p><strong>Uso ideal:</strong> Layouts de página complejos, dashboards, galerías.</p>
            `
        },
        flexbox: {
            title: 'CSS Flexbox',
            content: `
                <p><strong>CSS Flexbox</strong> es un modelo de layout unidimensional para distribuir elementos en una fila o columna.</p>
                <h4>Propiedades clave:</h4>
                <ul>
                    <li><code>display: flex</code> - Activa flexbox</li>
                    <li><code>justify-content</code> - Alineación horizontal</li>
                    <li><code>align-items</code> - Alineación vertical</li>
                    <li><code>flex-wrap</code> - Permite wrapping</li>
                    <li><code>flex: 1</code> - Factor de crecimiento</li>
                </ul>
                <p><strong>Uso ideal:</strong> Navegación, tarjetas, alineación de componentes.</p>
            `
        },
        media: {
            title: 'Media Queries',
            content: `
                <p><strong>Media Queries</strong> permiten aplicar estilos CSS según las características del dispositivo.</p>
                <h4>Sintaxis común:</h4>
                <ul>
                    <li><code>@media (min-width: 600px)</code> - Tablet</li>
                    <li><code>@media (min-width: 1024px)</code> - Desktop</li>
                    <li><code>@media (max-width: 599px)</code> - Mobile</li>
                    <li><code>@media (orientation: landscape)</code> - Orientación</li>
                </ul>
                <p><strong>Enfoque:</strong> Mobile First - diseñar primero para móvil y escalar hacia arriba.</p>
            `
        },
        mobile: {
            title: 'Mobile First',
            content: `
                <p><strong>Mobile First</strong> es una estrategia de diseño que prioriza la experiencia en dispositivos móviles.</p>
                <h4>Ventajas:</h4>
                <ul>
                    <li>Mejor rendimiento en dispositivos limitados</li>
                    <li>Contenido prioritario primero</li>
                    <li>Progresive enhancement</li>
                    <li>Mejor SEO (Google indexa mobile-first)</li>
                    <li>Menor complejidad de mantenimiento</li>
                </ul>
                <p><strong>Principio:</strong> "Content is king" - el contenido determina el diseño.</p>
            `
        }
    };

    cards.forEach(card => {
        const cardKey = card.dataset.card;
        const actions = card.querySelectorAll('.btn-card-action');

        actions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;

                switch(action) {
                    case 'details':
                        if (cardDetails[cardKey]) {
                            document.getElementById('modalTitle').textContent = cardDetails[cardKey].title;
                            document.getElementById('modalBody').innerHTML = cardDetails[cardKey].content;
                            openModal('detailModal');
                        }
                        break;

                    case 'copy':
                        const codeSnippets = {
                            grid: `.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}`,
                            flexbox: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}`,
                            media: `@media (min-width: 768px) {\n  .container {\n    grid-template-columns: 1fr 1fr;\n  }\n}`,
                            mobile: `/* Mobile First */\n.container {\n  padding: 1rem;\n}\n\n@media (min-width: 768px) {\n  .container {\n    padding: 2rem;\n  }\n}`
                        };

                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(codeSnippets[cardKey] || '').then(() => {
                                showToast('Código copiado al portapapeles', 'success', 'Copiado');
                            });
                        } else {
                            showToast('Código listo para copiar', 'info');
                        }
                        break;

                    case 'favorite':
                        const icon = btn.querySelector('i');
                        const isFav = btn.classList.contains('active');

                        if (isFav) {
                            btn.classList.remove('active');
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                            card.classList.remove('favorite');
                            showToast('Eliminado de favoritos', 'info');
                        } else {
                            btn.classList.add('active');
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                            card.classList.add('favorite');
                            showToast('Agregado a favoritos', 'success', 'Favorito');
                        }
                        break;
                }
            });
        });
    });
}

// ============================================
// GALERÍA INTERACTIVA
// ============================================

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const techInfo = {
        html5: { name: 'HTML5', desc: 'Lenguaje de marcado para estructurar contenido web.', year: '2014' },
        css3: { name: 'CSS3', desc: 'Hojas de estilo en cascada para diseño visual.', year: '2011' },
        grid: { name: 'CSS Grid', desc: 'Sistema de layout bidimensional nativo de CSS.', year: '2017' },
        flexbox: { name: 'Flexbox', desc: 'Modelo de layout unidimensional flexible.', year: '2009' },
        media: { name: 'Media Queries', desc: 'Adaptación de estilos según dispositivo.', year: '2010' },
        rem: { name: 'Rem/Em', desc: 'Unidades relativas escalables para tipografía.', year: 'CSS2' }
    };

    galleryItems.forEach(item => {
        const tech = item.dataset.tech;
        const info = techInfo[tech];

        item.addEventListener('click', () => {
            if (info) {
                document.getElementById('modalTitle').textContent = info.name;
                document.getElementById('modalBody').innerHTML = `
                    <p><strong>${info.name}</strong> ${info.desc}</p>
                    <p><strong>Año de lanzamiento:</strong> ${info.year}</p>
                    <div style="margin-top:1rem;padding:1rem;background:var(--gris-claro);border-radius:var(--radio-sm);">
                        <p style="margin:0;font-size:0.9rem;color:var(--gris-texto);">
                            <i class="fas fa-lightbulb" style="color:var(--naranja-advertencia);"></i> 
                            Haz clic en "Info" dentro de cada tarjeta para más detalles.
                        </p>
                    </div>
                `;
                openModal('detailModal');
            }
        });

        const btnInfo = item.querySelector('.btn-gallery-info');
        if (btnInfo) {
            btnInfo.addEventListener('click', (e) => {
                e.stopPropagation();
                if (info) {
                    showToast(`${info.name}: ${info.desc}`, 'info', info.name);
                }
            });
        }
    });
}

// ============================================
// CALCULADORA DE BREAKPOINTS
// ============================================

function initBreakpointCalculator() {
    const input = document.getElementById('breakpointInput');
    const btn = document.getElementById('calcBreakpoint');
    const result = document.getElementById('breakpointResult');

    if (!input || !btn || !result) return;

    function calculate() {
        const width = parseInt(input.value);

        if (isNaN(width) || width < 0) {
            result.className = 'breakpoint-result show error';
            result.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ingresa un número válido de píxeles.';
            result.style.background = 'var(--rojo-error-claro)';
            result.style.color = 'var(--rojo-error)';
            result.style.border = '1px solid rgba(239,68,68,0.3)';
            return;
        }

        let type, message, icon;

        if (width < 600) {
            type = 'mobile';
            icon = 'fa-mobile-alt';
            message = `
                <strong><i class="fas ${icon}"></i> Mobile First</strong><br>
                Se activa el layout de una sola columna.<br>
                <code>grid-template-columns: 1fr;</code><br>
                <small>Menú hamburguesa visible, navegación vertical.</small>
            `;
        } else if (width < 1024) {
            type = 'tablet';
            icon = 'fa-tablet-alt';
            message = `
                <strong><i class="fas ${icon}"></i> Tablet Layout</strong><br>
                Se activa el layout de 2 columnas.<br>
                <code>grid-template-columns: 200px 1fr;</code><br>
                <small>Sidebar debajo del contenido, navegación lateral.</small>
            `;
        } else {
            type = 'desktop';
            icon = 'fa-desktop';
            message = `
                <strong><i class="fas ${icon}"></i> Desktop Layout</strong><br>
                Se activa el layout de 3 columnas.<br>
                <code>grid-template-columns: 240px 1fr 280px;</code><br>
                <small>Header, nav, content, sidebar y footer en su posición óptima.</small>
            `;
        }

        result.className = `breakpoint-result show ${type}`;
        result.innerHTML = message;
        result.style.background = '';
        result.style.color = '';
        result.style.border = '';
    }

    btn.addEventListener('click', calculate);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnReset = document.getElementById('btnReset');
    const btnNewMessage = document.getElementById('btnNewMessage');
    const successMessage = document.getElementById('successMessage');
    const charCount = document.getElementById('charCount');
    const mensaje = document.getElementById('mensaje');

    if (!form) return;

    // Contador de caracteres
    if (mensaje && charCount) {
        mensaje.addEventListener('input', () => {
            const len = mensaje.value.length;
            charCount.textContent = len;
            if (len >= 450) {
                charCount.style.color = 'var(--rojo-error)';
            } else if (len >= 400) {
                charCount.style.color = 'var(--naranja-advertencia)';
            } else {
                charCount.style.color = 'var(--gris-texto)';
            }
        });
    }

    // Validación en tiempo real
    const fields = ['nombre', 'email', 'asunto', 'mensaje'];

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) return;

        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group && group.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    function validateField(field) {
        const group = field.closest('.form-group');
        if (!group) return true;

        let isValid = true;
        const value = field.value.trim();

        group.classList.remove('error', 'success');

        switch(field.id) {
            case 'nombre':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'asunto':
                isValid = value !== '';
                break;
            case 'mensaje':
                isValid = value.length >= 10;
                break;
        }

        if (value === '') {
            isValid = false;
        }

        if (!isValid && value !== '') {
            group.classList.add('error');
        } else if (isValid && value !== '') {
            group.classList.add('success');
        }

        return isValid;
    }

    function validateForm() {
        let isValid = true;

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });

        // Validar checkbox de privacidad
        const privacidad = document.getElementById('privacidad');
        const privGroup = privacidad?.closest('.form-group');
        if (privacidad && privGroup) {
            privGroup.classList.remove('error');
            if (!privacidad.checked) {
                privGroup.classList.add('error');
                isValid = false;
            }
        }

        return isValid;
    }

    // Envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Por favor corrige los errores en el formulario', 'error', 'Validación');

            // Scroll al primer error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Mostrar estado de carga
        btnSubmit.disabled = true;
        btnSubmit.querySelector('.btn-text').style.display = 'none';
        btnSubmit.querySelector('.btn-loading').style.display = 'flex';

        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mostrar mensaje de éxito
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').options[document.getElementById('asunto').selectedIndex].text,
            mensaje: document.getElementById('mensaje').value.substring(0, 100) + '...'
        };

        document.getElementById('successDetails').innerHTML = `
            <p><strong><i class="fas fa-user"></i> De:</strong> ${formData.nombre}</p>
            <p><strong><i class="fas fa-envelope"></i> Email:</strong> ${formData.email}</p>
            <p><strong><i class="fas fa-tag"></i> Asunto:</strong> ${formData.asunto}</p>
            <p><strong><i class="fas fa-comment"></i> Mensaje:</strong> ${formData.mensaje}</p>
        `;

        form.style.display = 'none';
        successMessage.style.display = 'block';

        showToast('Mensaje enviado correctamente', 'success', '¡Enviado!');

        // Restaurar botón
        btnSubmit.disabled = false;
        btnSubmit.querySelector('.btn-text').style.display = 'flex';
        btnSubmit.querySelector('.btn-loading').style.display = 'none';
    });

    // Reset del formulario
    btnReset?.addEventListener('click', () => {
        form.querySelectorAll('.form-group').forEach(g => {
            g.classList.remove('error', 'success');
        });
        if (charCount) charCount.textContent = '0';
        charCount.style.color = 'var(--gris-texto)';
    });

    // Nuevo mensaje
    btnNewMessage?.addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => {
            g.classList.remove('error', 'success');
        });
        if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = 'var(--gris-texto)';
        }
        form.style.display = 'flex';
        successMessage.style.display = 'none';
    });
}

// ============================================
// RELOJ EN TIEMPO REAL
// ============================================

function initClock() {
    const timeEl = document.getElementById('systemTime');
    const dateEl = document.getElementById('systemDate');

    if (!timeEl || !dateEl) return;

    function updateClock() {
        const now = new Date();

        timeEl.textContent = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        dateEl.textContent = now.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// ============================================
// NOTAS RÁPIDAS
// ============================================

function initNotes() {
    const input = document.getElementById('noteInput');
    const btnAdd = document.getElementById('btnAddNote'); 
    const list = document.getElementById('notesList');

    if (!input || !btnAdd || !list) return;

    // Cargar notas guardadas
    const savedNotes = JSON.parse(localStorage.getItem('apsti_notes') || '[]');
    savedNotes.forEach(note => addNoteToDOM(note));

    function addNoteToDOM(text) {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.innerHTML = `
            <span class="note-text">${escapeHtml(text)}</span>
            <button class="btn-delete-note" title="Eliminar nota">
                <i class="fas fa-times"></i>
            </button>
        `;

        li.querySelector('.btn-delete-note').addEventListener('click', () => {
            li.style.animation = 'fadeIn 0.2s ease reverse forwards';
            setTimeout(() => {
                li.remove();
                saveNotes();
                showToast('Nota eliminada', 'info');
            }, 200);
        });

        list.appendChild(li);
    }

    function saveNotes() {
        const notes = [];
        list.querySelectorAll('.note-text').forEach(el => {
            notes.push(el.textContent);
        });
        localStorage.setItem('apsti_notes', JSON.stringify(notes));
    }

    function addNote() {
        const text = input.value.trim();
        if (!text) {
            showToast('Escribe algo antes de agregar', 'warning');
            return;
        }

        addNoteToDOM(text);
        saveNotes();
        input.value = '';
        input.focus();
        showToast('Nota agregada', 'success');
    }

    btnAdd.addEventListener('click', addNote);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addNote();
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// RECORDATORIOS DE SESIONES
// ============================================

function initReminders() {
    const reminderBtns = document.querySelectorAll('.btn-reminder');

    reminderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('active');
            const sessionItem = btn.closest('.session-item');
            const sessionTitle = sessionItem?.querySelector('.session-title')?.textContent || 'Sesión';

            if (isActive) {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-bell"></i>';
                showToast(`Recordatorio eliminado para: ${sessionTitle}`, 'info');
            } else {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-bell"></i>';
                showToast(`Recordatorio activado para: ${sessionTitle}`, 'success', 'Recordatorio');
            }
        });
    });
}

// ============================================
// MODALES DEL FOOTER
// ============================================

function initFooterModals() {
    const footerLinks = document.querySelectorAll('.footer-link[data-modal]');

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalType = link.dataset.modal;

            switch(modalType) {
                case 'politicas':
                    openModal('policyModal');
                    break;
                case 'terminos':
                    showToast('Términos y condiciones: Uso educativo del dashboard.', 'info', 'Términos');
                    break;
                case 'contacto':
                    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
                    showToast('Desplázate al formulario de contacto', 'info');
                    break;
                case 'soporte':
                    showToast('Soporte técnico disponible de lunes a viernes, 9am - 6pm.', 'info', 'Soporte');
                    break;
            }
        });
    });

    // Cerrar modales
    document.getElementById('modalClose')?.addEventListener('click', () => closeModal('detailModal'));
    document.getElementById('btnModalClose')?.addEventListener('click', () => closeModal('detailModal'));
    document.getElementById('policyModalClose')?.addEventListener('click', () => closeModal('policyModal'));
    document.getElementById('btnPolicyClose')?.addEventListener('click', () => closeModal('policyModal'));

    // Cerrar al hacer click fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id));
        }
    });

    // Link de privacidad en el formulario
    document.querySelector('.link-privacidad')?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('policyModal');
    });
}

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .gallery-item, .session-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initNavigation();
    initCards();
    initGallery();
    initBreakpointCalculator();
    initContactForm();
    initClock();
    initNotes();
    initReminders();
    initFooterModals();
    initScrollAnimations();

    // Toast de bienvenida
    setTimeout(() => {
        showToast('Bienvenido al Dashboard APSTI. Explora las funcionalidades interactivas.', 'info', 'Bienvenido');
    }, 800);
});






