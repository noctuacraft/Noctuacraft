// ============================================
// DATOS INICIALES DE LAS IMPRESIONES 3D
// ============================================

let printData = {
    1: {
        title: "Benchy de Calibración",
        img: "assets/img/Noctuacraft3D/Benchy.jpg",
        time: "1 h 45 min",
        material: "PLA - 13g",
        weight: "13g",
        category: "tecnico",
        desc: "Modelo clásico de prueba impreso en PLA para calibración de impresoras 3D. Perfecto para evaluar nivelación, retracción, precisión dimensional y calidad de superficies curvas.",
        specs: {
            "Resolución": "0.16mm",
            "Relleno": "20%",
            "Soportes": "No",
            "Temperatura": "200°C"
        }
    },
    2: {
        title: "Oruga Mecánica Articulada",
        img: "assets/img/Noctuacraft3D/Oruga.jpg",
        time: "7 h 20 min",
        material: "PLA+ - 58g",
        weight: "58g",
        category: "funcional",
        desc: "Robot articulado impreso en PLA+ con tolerancias ajustadas para movimiento modular fluido. Fabricado en una sola pieza sin ensamblaje adicional.",
        specs: {
            "Resolución": "0.2mm",
            "Relleno": "15%",
            "Soportes": "No",
            "Temperatura": "205°C"
        }
    },
    3: {
        title: "Llavero Noctuacraft Personalizado",
        img: "assets/img/Noctuacraft3D/Noctuacraft_Llavero.jpg",
        time: "0 h 50 min",
        material: "PLA - 9g",
        weight: "9g",
        category: "personalizado",
        desc: "Llavero personalizado con relieve del logotipo oficial de Noctuacraft, impreso con capas de 0.16mm para acabado suave y profesional.",
        specs: {
            "Resolución": "0.16mm",
            "Relleno": "100%",
            "Soportes": "No",
            "Temperatura": "200°C"
        }
    },
    4: {
        title: "Figura Michi Decorativa",
        img: "assets/img/Noctuacraft3D/Michi.jpg",
        time: "3 h 40 min",
        material: "PLA Silk - 35g",
        weight: "35g",
        category: "decorativo",
        desc: "Figura felina decorativa impresa con filamento PLA Silk para acabado brillante. Curvas suaves y proporciones redondeadas.",
        specs: {
            "Resolución": "0.16mm",
            "Relleno": "15%",
            "Soportes": "Sí",
            "Temperatura": "210°C"
        }
    },
    5: {
        title: "PortaLapicero Hexagonal",
        img: "assets/img/Noctuacraft3D/PortaLapicero.jpg",
        time: "5 h 55 min",
        material: "PETG - 72g",
        weight: "72g",
        category: "funcional",
        desc: "Organizador geométrico con estructura hexagonal minimalista, impreso en PETG para resistencia térmica y durabilidad.",
        specs: {
            "Resolución": "0.2mm",
            "Relleno": "20%",
            "Soportes": "No",
            "Temperatura": "235°C"
        }
    },
    6: {
        title: "Snitch Dorada de Harry Potter",
        img: "assets/img/Noctuacraft3D/HP.jpg",
        time: "2 h 15 min",
        material: "PLA Dorado - 17g",
        weight: "17g",
        category: "decorativo",
        desc: "Réplica precisa de la icónica Snitch Dorada de Quidditch, impresa en PLA dorado con detalles finos en las alas.",
        specs: {
            "Resolución": "0.12mm",
            "Relleno": "10%",
            "Soportes": "Sí",
            "Temperatura": "200°C"
        }
    }
};

// ============================================
// VARIABLES GLOBALES DEL SISTEMA
// ============================================

let currentProjects = JSON.parse(JSON.stringify(printData)); // Copia profunda
let secretAccess = false;
let secretSequence = [];
const secretCode = ['KeyN', 'KeyO', 'KeyC', 'KeyT', 'KeyU', 'KeyA'];
let sheetJSLoaded = false;
let excelData = null;
let backupData = null;
let tempChanges = null;

// ============================================
// FUNCIONES PRINCIPALES DEL SITIO
// ============================================

// Pantalla de carga optimizada
function simulateLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    console.log("Iniciando carga...");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    console.log("Carga completada, generando galería...");
                    // GENERAR LA GALERÍA INMEDIATAMENTE
                    generateGallery();
                }, 500);
            }, 300);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 150);
}

// Generar galería dinámica - VERSIÓN CORREGIDA
function generateGallery() {
    console.log("Generando galería...");
    const galleryContainer = document.getElementById('dynamicGallery');
    
    if (!galleryContainer) {
        console.error("ERROR: No se encontró #dynamicGallery");
        return;
    }
    
    console.log("Proyectos disponibles:", Object.keys(printData).length);
    
    // Limpiar galería
    galleryContainer.innerHTML = '';
    
    // Verificar que haya proyectos
    if (Object.keys(printData).length === 0) {
        galleryContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: rgba(233, 226, 214, 0.5);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                <h3>No hay proyectos disponibles</h3>
                <p>Sube un archivo Excel para comenzar</p>
            </div>
        `;
        return;
    }
    
    // Ordenar proyectos por ID
    const sortedProjects = Object.entries(printData).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    
    console.log("Creando tarjetas...");
    
    // Crear tarjetas
    sortedProjects.forEach(([id, project], index) => {
        const card = createPrintCard(id, project);
        galleryContainer.appendChild(card);
        
        // Animación de entrada escalonada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Configurar eventos
    setTimeout(() => {
        setupGalleryFilters();
        setupPrintModal();
        setupFilamentCounter();
        console.log("Galería generada exitosamente");
    }, 500);
}

// Crear tarjeta individual
function createPrintCard(id, project) {
    const card = document.createElement('div');
    card.className = 'print-card';
    card.setAttribute('data-print', id);
    card.setAttribute('data-category', project.category || 'decorativo');
    
    // Configurar estilos iniciales para animación
    card.style.cssText = `
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    `;
    
    const badgeText = getBadgeForCategory(project.category);
    const imgSrc = project.img || 'assets/img/Noctuacraft3D/default.jpg';
    
    card.innerHTML = `
        <div class="print-badge">${badgeText}</div>
        <img src="${imgSrc}" alt="${project.title}" class="print-img" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYjI2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg=='">
        <div class="print-info">
            <h3 class="print-title">${project.title}</h3>
            <p class="print-desc">${project.desc.substring(0, 100)}${project.desc.length > 100 ? '...' : ''}</p>
            <div class="print-meta">
                <span class="print-time">⏱️ ${project.time}</span>
                <span class="print-material">🧵 ${project.material}</span>
            </div>
            <span class="print-more">Ver detalles →</span>
        </div>
    `;
    
    return card;
}

// Configurar filtros - VERSIÓN SIMPLIFICADA
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const printCards = document.querySelectorAll('.print-card');
    
    if (!filterBtns.length || !printCards.length) {
        console.log("No hay filtros o tarjetas para configurar");
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al actual
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            printCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Forzar reflow para animación
                    void card.offsetWidth;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Configurar modal
function setupPrintModal() {
    const modal = document.getElementById('printModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalClose) return;
    
    document.querySelectorAll('.print-card').forEach(card => {
        card.addEventListener('click', function() {
            const printId = this.getAttribute('data-print');
            const data = printData[printId];
            
            if (!data) {
                console.error("No se encontraron datos para el proyecto:", printId);
                return;
            }
            
            // Actualizar contenido del modal
            const modalImg = document.getElementById('modalImg');
            modalImg.src = data.img || '';
            modalImg.alt = data.title;
            
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDesc').textContent = data.desc;
            
            // Crear detalles
            const modalDetails = document.getElementById('modalDetails');
            modalDetails.innerHTML = '';
            
            const details = [
                { label: 'Tiempo de impresión', value: data.time, icon: '⏱️' },
                { label: 'Material usado', value: data.material, icon: '🧵' },
                { label: 'Peso aproximado', value: data.weight, icon: '⚖️' },
                { label: 'Categoría', value: getCategoryName(data.category), icon: '🏷️' }
            ];
            
            if (data.specs && typeof data.specs === 'object') {
                Object.entries(data.specs).forEach(([key, value]) => {
                    details.push({ label: key, value: value, icon: '⚙️' });
                });
            }
            
            details.forEach(detail => {
                const div = document.createElement('div');
                div.className = 'detail-item';
                div.innerHTML = `
                    <div class="detail-label">${detail.icon} ${detail.label}</div>
                    <div class="detail-value">${detail.value}</div>
                `;
                modalDetails.appendChild(div);
            });
            
            // Configurar botón de cotización
            document.getElementById('quoteBtn').onclick = () => {
                const message = `¡Hola! Me interesa una cotización para el modelo: "${data.title}". ¿Podrías darme más información?`;
                window.open(`https://wa.me/5491133511065?text=${encodeURIComponent(message)}`, '_blank');
            };
            
            // Mostrar modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Contador de filamento
function setupFilamentCounter() {
    const filamentUsed = document.getElementById('filamentUsed');
    const floatingDuck = document.getElementById('floatingDuck');
    
    if (!filamentUsed) return;
    
    // Calcular total de filamento
    let total = 0;
    Object.values(printData).forEach(project => {
        const weight = parseInt(project.weight) || 0;
        total += weight;
    });
    
    filamentUsed.textContent = total;
    
    // Interacción con el pato
    if (floatingDuck) {
        floatingDuck.addEventListener('click', () => {
            total += 5;
            filamentUsed.textContent = total;
            
            // Efecto visual
            floatingDuck.style.transform = 'scale(1.3)';
            floatingDuck.textContent = '🖨️';
            setTimeout(() => {
                floatingDuck.style.transform = '';
                floatingDuck.textContent = '🐤';
            }, 300);
        });
    }
}

// Sistema de cotización
function setupQuoteSystem() {
    const form = document.getElementById('quoteForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projectType = document.getElementById('projectType').value;
        const material = document.getElementById('material').value;
        const quantity = document.getElementById('quantity').value;
        const urgency = document.getElementById('urgency').value;
        const description = document.getElementById('description').value;
        
        // Validación básica
        if (!projectType || !material || !description) {
            showNotification('Por favor, completá todos los campos.', 'error');
            return;
        }
        
        // Construir mensaje
        const urgencyText = {
            'normal': 'Normal (5-7 días)',
            'urgent': 'Urgente (2-3 días)',
            'express': 'Express (24 horas)'
        }[urgency] || 'Normal (5-7 días)';
        
        const message = `¡Hola! Solicito cotización para impresión 3D:

📋 Tipo de Proyecto: ${projectType}
🧵 Material: ${material}
🔢 Cantidad: ${quantity} unidades
⏰ Urgencia: ${urgencyText}

📝 Descripción:
${description}`;
        
        // Abrir WhatsApp
        window.open(`https://wa.me/5491133511065?text=${encodeURIComponent(message)}`, '_blank');
        
        // Resetear formulario
        form.reset();
        
        // Mostrar confirmación
        showNotification('¡Cotización enviada! Te contactaré pronto por WhatsApp.', 'success');
    });
}

// ============================================
// SISTEMA DE ADMINISTRACIÓN 
// ============================================

// Configurar acceso 
function setupSecretAccess() {
    document.addEventListener('keydown', (e) => {
        // Ignorar si está en un campo de entrada
        const activeElement = document.activeElement;
        const isInput = activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' || 
            activeElement.tagName === 'SELECT'
        );
        
        if (isInput) return;
        
        // Agregar tecla a la secuencia
        secretSequence.push(e.code);
        
        // Mantener solo las últimas 6 teclas
        if (secretSequence.length > 6) {
            secretSequence.shift();
        }
        
        // Verificar si coincide con "NOCTUA"
        if (secretSequence.join(',') === secretCode.join(',')) {
            activateSecretMode();
            secretSequence = []; // Resetear secuencia
        }
    });
}

// Activar modo 
function activateSecretMode() {
    secretAccess = true;
    
    // Mostrar notificación
    showNotification('Admin detectado: Bienvenido', 'info');
    
    // Crear botón flotante
    createSecretButton();

}

// Crear botón flotante 
function createSecretButton() {
    // Verificar si ya existe
    if (document.getElementById('secretAdminBtn')) return;
    
    const secretBtn = document.createElement('button');
    secretBtn.id = 'secretAdminBtn';
    secretBtn.innerHTML = '🔧';
    secretBtn.title = 'Panel de Administración';
    secretBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #4ecdc4, #00a8ff);
        color: #0a0e17;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        animation: float 3s ease-in-out infinite;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    secretBtn.addEventListener('click', showSecretAdminPanel);
    document.body.appendChild(secretBtn);
    
    // Efecto hover
    secretBtn.addEventListener('mouseenter', () => {
        secretBtn.style.transform = 'scale(1.1) rotate(15deg)';
        secretBtn.style.background = 'linear-gradient(135deg, #ff6b35, #4ecdc4)';
    });
    
    secretBtn.addEventListener('mouseleave', () => {
        secretBtn.style.transform = 'scale(1) rotate(0deg)';
        secretBtn.style.background = 'linear-gradient(135deg, #4ecdc4, #00a8ff)';
    });
}

// Mostrar panel de administración
async function showSecretAdminPanel() {
    if (!secretAccess) return;
    
    try {
        // Verificar SheetJS
        if (typeof XLSX === 'undefined') {
            showNotification('Error: La biblioteca Excel no está cargada', 'error');
            return;
        }
        sheetJSLoaded = true;
        
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.id = 'verlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        `;
        
        overlay.innerHTML = `
            <div style="
                background: #121826;
                border-radius: 15px;
                width: 100%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                border: 2px solid #4ecdc4;
                box-shadow: 0 0 30px rgba(78, 205, 196, 0.3);
            ">
                <div style="padding: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h2 style="color: #4ecdc4; font-size: 1.8rem; margin: 0;">🔧 Panel de Administración</h2>
                        <button id="closeSecretPanel" style="
                            background: none;
                            border: none;
                            color: #e9e2d6;
                            font-size: 1.8rem;
                            cursor: pointer;
                            padding: 0 10px;
                            line-height: 1;
                        ">&times;</button>
                    </div>
                    
                    <!-- Pestañas -->
                    <div style="display: flex; background: rgba(10, 14, 23, 0.5); border-radius: 8px; margin-bottom: 2rem; overflow: hidden; border: 1px solid rgba(78, 205, 196, 0.2);">
                        <button class="secret-tab active" data-tab="upload" style="
                            flex: 1;
                            padding: 1rem;
                            background: rgba(78, 205, 196, 0.2);
                            border: none;
                            color: #4ecdc4;
                            cursor: pointer;
                            font-family: 'Bree Serif', serif;
                            font-weight: 600;
                        ">📤 Cargar Excel</button>
                        <button class="secret-tab" data-tab="download" style="
                            flex: 1;
                            padding: 1rem;
                            background: none;
                            border: none;
                            color: #e9e2d6;
                            cursor: pointer;
                            font-family: 'Bree Serif', serif;
                            font-weight: 600;
                        ">📥 Descargar Excel</button>
                        <button class="secret-tab" data-tab="manage" style="
                            flex: 1;
                            padding: 1rem;
                            background: none;
                            border: none;
                            color: #e9e2d6;
                            cursor: pointer;
                            font-family: 'Bree Serif', serif;
                            font-weight: 600;
                        ">🛠️ Gestionar</button>
                    </div>
                    
                    <!-- Contenido de pestañas -->
                    <div id="secretUploadTab" class="secret-tab-content" style="display: block;">
                        <div id="secretUploadArea" style="text-align: center; padding: 3rem 2rem; border: 2px dashed rgba(78, 205, 196, 0.3); border-radius: 10px; background: rgba(10, 14, 23, 0.3); margin-bottom: 2rem;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                            <h3 style="color: #4ecdc4; margin-bottom: 0.5rem;">Subir Archivo Excel</h3>
                            <p style="color: rgba(233, 226, 214, 0.7); margin-bottom: 1rem;">
                                Arrastra y suelta tu archivo Excel (.xlsx) aquí o haz clic para seleccionar
                            </p>
                            <p style="color: rgba(233, 226, 214, 0.5); font-size: 0.9rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                                <strong>Formato requerido:</strong> ID, Título, Imagen, Tiempo, Material, Peso, Categoría, Descripción
                            </p>
                            
                            <input type="file" id="secretExcelFile" accept=".xlsx,.xls" style="display: none;">
                            <button id="secretSelectFileBtn" style="
                                background: linear-gradient(135deg, #4ecdc4, #36b9a8);
                                color: #0a0e17;
                                border: none;
                                padding: 0.8rem 2rem;
                                border-radius: 5px;
                                font-family: 'Bree Serif', serif;
                                font-weight: 600;
                                cursor: pointer;
                                font-size: 1rem;
                                margin-bottom: 1rem;
                            ">Seleccionar Archivo</button>
                            
                            <div id="secretFileInfo" style="display: none; margin-top: 2rem; padding: 1.5rem; background: rgba(10, 14, 23, 0.5); border-radius: 8px; border: 1px solid rgba(78, 205, 196, 0.3);">
                                <p style="color: #e9e2d6; margin-bottom: 1rem;"><strong>Archivo:</strong> <span id="secretFileName" style="color: #4ecdc4;"></span></p>
                                <p style="color: #e9e2d6; margin-bottom: 1.5rem;"><strong>Tamaño:</strong> <span id="secretFileSize" style="color: #4ecdc4;"></span></p>
                                <button id="secretProcessBtn" style="
                                    background: linear-gradient(135deg, #ff6b35, #ff8c42);
                                    color: white;
                                    border: none;
                                    padding: 0.8rem 2rem;
                                    border-radius: 5px;
                                    font-family: 'Bree Serif', serif;
                                    font-weight: 600;
                                    cursor: pointer;
                                    width: 100%;
                                ">Procesar Excel</button>
                            </div>
                        </div>
                        
                        <div id="secretUploadSummary" style="display: none; margin-top: 2rem; padding: 2rem; background: rgba(10, 14, 23, 0.5); border-radius: 10px; border: 1px solid rgba(78, 205, 196, 0.2);">
                            <h4 style="color: #e9e2d6; text-align: center; margin-bottom: 1.5rem;">Resumen de Cambios</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0;">
                                <div style="text-align: center; padding: 1.5rem; border-radius: 8px; background: rgba(10, 14, 23, 0.3); border: 2px solid rgba(78, 205, 196, 0.5);">
                                    <span id="secretNewCount" style="display: block; font-size: 2.5rem; font-weight: 700; color: #4ecdc4; margin-bottom: 0.5rem;">0</span>
                                    <span style="font-size: 0.9rem; color: rgba(233, 226, 214, 0.8);">Nuevos</span>
                                </div>
                                <div style="text-align: center; padding: 1.5rem; border-radius: 8px; background: rgba(10, 14, 23, 0.3); border: 2px solid rgba(255, 193, 7, 0.5);">
                                    <span id="secretUpdatedCount" style="display: block; font-size: 2.5rem; font-weight: 700; color: #ffc107; margin-bottom: 0.5rem;">0</span>
                                    <span style="font-size: 0.9rem; color: rgba(233, 226, 214, 0.8);">Actualizados</span>
                                </div>
                                <div style="text-align: center; padding: 1.5rem; border-radius: 8px; background: rgba(10, 14, 23, 0.3); border: 2px solid rgba(255, 107, 53, 0.5);">
                                    <span id="secretDeletedCount" style="display: block; font-size: 2.5rem; font-weight: 700; color: #ff6b35; margin-bottom: 0.5rem;">0</span>
                                    <span style="font-size: 0.9rem; color: rgba(233, 226, 214, 0.8);">Eliminados</span>
                                </div>
                            </div>
                            
                            <div style="margin: 2rem 0; padding: 1.5rem; background: rgba(10, 14, 23, 0.7); border-radius: 8px; border: 1px solid rgba(255, 107, 53, 0.3);">
                                <label style="display: block; color: #e9e2d6; margin-bottom: 0.5rem; font-weight: 500;">Contraseña de Confirmación</label>
                                <div style="position: relative;">
                                    <input type="password" id="adminPassword" placeholder="Ingresa la contraseña para actualizar" style="
                                        width: 100%;
                                        padding: 0.8rem 3rem 0.8rem 1rem;
                                        background: rgba(10, 14, 23, 0.9);
                                        border: 2px solid rgba(78, 205, 196, 0.3);
                                        border-radius: 5px;
                                        color: #e9e2d6;
                                        font-family: 'Bree Serif', serif;
                                        margin-bottom: 1rem;
                                        font-size: 1rem;
                                    ">
                                    <button type="button" id="togglePasswordBtn" style="
                                        position: absolute;
                                        right: 15px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        background: none;
                                        border: none;
                                        color: #e9e2d6;
                                        cursor: pointer;
                                        font-size: 1.2rem;
                                        padding: 5px;
                                    ">👁️</button>
                                </div>
                                <button id="secretConfirmBtn" style="
                                    background: linear-gradient(135deg, #4ecdc4, #36b9a8);
                                    color: #0a0e17;
                                    border: none;
                                    padding: 1rem 2rem;
                                    border-radius: 5px;
                                    font-family: 'Bree Serif', serif;
                                    font-weight: 600;
                                    cursor: pointer;
                                    width: 100%;
                                    font-size: 1rem;
                                ">🔒 Confirmar Cambios</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="secretDownloadTab" class="secret-tab-content" style="display: none;">
                        <div style="text-align: center; padding: 3rem 2rem;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">⬇️</div>
                            <h3 style="color: #00a8ff; margin-bottom: 1rem;">Descargar Base de Datos</h3>
                            <p style="color: rgba(233, 226, 214, 0.7); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                                Descarga un archivo Excel con todos los proyectos actuales para editarlos offline.
                            </p>
                            
                            <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
                                <button id="secretDownloadCurrentBtn" style="
                                    background: linear-gradient(135deg, #00a8ff, #0097e6);
                                    color: white;
                                    border: none;
                                    padding: 1rem 2rem;
                                    border-radius: 5px;
                                    font-family: 'Bree Serif', serif;
                                    font-weight: 600;
                                    cursor: pointer;
                                    min-width: 200px;
                                    font-size: 1rem;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 8px;
                                ">📥 Descargar Excel Actual</button>
                                
                                <button id="secretDownloadTemplateBtn" style="
                                    background: linear-gradient(135deg, #ff6b35, #ff8c42);
                                    color: white;
                                    border: none;
                                    padding: 1rem 2rem;
                                    border-radius: 5px;
                                    font-family: 'Bree Serif', serif;
                                    font-weight: 600;
                                    cursor: pointer;
                                    min-width: 200px;
                                    font-size: 1rem;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 8px;
                                ">📋 Descargar Plantilla</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="secretManageTab" class="secret-tab-content" style="display: none;">
                        <div style="margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                                <h3 style="color: #e9e2d6; margin: 0; font-size: 1.3rem;">Proyectos Actuales</h3>
                                <span id="secretProjectCount" style="color: #4ecdc4; font-weight: 600; background: rgba(78, 205, 196, 0.1); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid rgba(78, 205, 196, 0.3); font-size: 0.9rem;">
                                    ${Object.keys(currentProjects).length} proyectos
                                </span>
                            </div>
                            
                            <div style="max-height: 300px; overflow-y: auto; border: 1px solid rgba(78, 205, 196, 0.2); border-radius: 8px; background: rgba(10, 14, 23, 0.3); padding: 10px;" id="secretProjectsList">
                                <!-- Los proyectos se cargarán aquí -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        initSecretPanel();
        updateSecretProjectsList();
        
    } catch (error) {
        showNotification('Error al cargar el panel', 'error');
        console.error(error);
    }
}

// Inicializar panel 
function initSecretPanel() {
    console.log("Inicializando panel ...");
    
    // Configurar pestañas
    const tabs = document.querySelectorAll('.secret-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover active de todas
            tabs.forEach(t => {
                t.style.background = 'none';
                t.style.color = '#e9e2d6';
            });
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.secret-tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Activar pestaña clickeada
            this.style.background = 'rgba(78, 205, 196, 0.2)';
            this.style.color = '#4ecdc4';
            
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`secret${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Tab`).style.display = 'block';
        });
    });
    
    // Configurar selección de archivo
    document.getElementById('secretSelectFileBtn').addEventListener('click', () => {
        document.getElementById('secretExcelFile').click();
    });
    
    // Configurar carga de archivo
    document.getElementById('secretExcelFile').addEventListener('change', handleSecretFileSelect);
    
    // Configurar procesamiento
    document.getElementById('secretProcessBtn').addEventListener('click', processSecretExcelFile);
    
    // Configurar confirmación
    document.getElementById('secretConfirmBtn').addEventListener('click', confirmSecretChanges);
    
    // Configurar visibilidad de contraseña
    document.getElementById('togglePasswordBtn').addEventListener('click', function() {
        const input = document.getElementById('adminPassword');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.textContent = input.type === 'password' ? '👁️' : '🙈';
    });
    
    // Configurar descargas
    document.getElementById('secretDownloadCurrentBtn').addEventListener('click', downloadSecretCurrentExcel);
    document.getElementById('secretDownloadTemplateBtn').addEventListener('click', downloadSecretTemplateExcel);
    
    // Configurar cierre
    document.getElementById('closeSecretPanel').addEventListener('click', () => {
        document.getElementById('verlay').remove();
    });
    
    // Cerrar al hacer clic fuera
    document.getElementById('verlay').addEventListener('click', (e) => {
        if (e.target.id === 'verlay') {
            e.target.remove();
        }
    });
}

// Actualizar lista de proyectos en el panel
function updateSecretProjectsList() {
    const container = document.getElementById('secretProjectsList');
    if (!container) return;
    
    if (Object.keys(currentProjects).length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: rgba(233, 226, 214, 0.5);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">📭</div>
                <p>No hay proyectos cargados</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    Object.entries(currentProjects).forEach(([id, project]) => {
        html += `
            <div class="secret-project-item" data-id="${id}" style="
                background: rgba(10, 14, 23, 0.5);
                border: 1px solid rgba(78, 205, 196, 0.2);
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div style="flex: 1;">
                    <h4 style="color: #e9e2d6; margin: 0 0 0.3rem 0; font-size: 1rem; font-weight: 600;">${project.title}</h4>
                    <p style="color: rgba(233, 226, 214, 0.7); margin: 0; font-size: 0.8rem; line-height: 1.4;">
                        ${getCategoryName(project.category)} • ${project.time} • ${project.material}
                    </p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="secret-edit-btn" data-id="${id}" title="Editar proyecto" style="
                        background: none;
                        border: 1px solid rgba(78, 205, 196, 0.3);
                        color: #e9e2d6;
                        width: 32px;
                        height: 32px;
                        border-radius: 5px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                    ">✏️</button>
                    <button class="secret-delete-btn" data-id="${id}" title="Eliminar proyecto" style="
                        background: none;
                        border: 1px solid rgba(255, 107, 53, 0.3);
                        color: #e9e2d6;
                        width: 32px;
                        height: 32px;
                        border-radius: 5px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                    ">🗑️</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Actualizar contador
    const countElement = document.getElementById('secretProjectCount');
    if (countElement) {
        countElement.textContent = `${Object.keys(currentProjects).length} proyectos`;
    }
}

// ============================================
// FUNCIONES DEL SISTEMA EXCEL
// ============================================

// Manejar selección de archivo
function handleSecretFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log("Archivo seleccionado:", file.name);
    
    // Validar tipo
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
        showNotification('Solo se permiten archivos Excel (.xlsx o .xls)', 'error');
        return;
    }
    
    // Validar tamaño
    if (file.size > 10 * 1024 * 1024) {
        showNotification('Archivo demasiado grande (máximo 10MB)', 'error');
        return;
    }
    
    // Mostrar información
    document.getElementById('secretFileName').textContent = file.name;
    document.getElementById('secretFileSize').textContent = formatFileSize(file.size);
    document.getElementById('secretFileInfo').style.display = 'block';
    
    // Ocultar resumen anterior
    document.getElementById('secretUploadSummary').style.display = 'none';
    
    // Guardar archivo
    excelData = file;
}

// Procesar archivo Excel
async function processSecretExcelFile() {
    if (!excelData) {
        showNotification('Selecciona un archivo primero', 'error');
        return;
    }
    
    if (!sheetJSLoaded) {
        showNotification('Error: La biblioteca Excel no está cargada', 'error');
        return;
    }
    
    try {
        showNotification('Procesando archivo Excel...', 'info');
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                console.log("Datos leídos del Excel:", jsonData);
                
                if (!jsonData || jsonData.length === 0) {
                    throw new Error('El archivo Excel está vacío');
                }
                
                // Validar estructura básica
                if (!validateExcelStructure(jsonData[0])) {
                    throw new Error('Estructura del archivo incorrecta');
                }
                
                // Analizar cambios
                const changes = analyzeExcelChanges(jsonData);
                
                // Mostrar resumen
                showUploadSummary(changes);
                showNotification('Archivo procesado correctamente', 'success');
                
            } catch (error) {
                showNotification(`Error: ${error.message}`, 'error');
                console.error("Error procesando Excel:", error);
            }
        };
        
        reader.onerror = function() {
            showNotification('Error al leer el archivo', 'error');
        };
        
        reader.readAsArrayBuffer(excelData);
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
        console.error(error);
    }
}

// Validar estructura del Excel
function validateExcelStructure(firstRow) {
    const keys = Object.keys(firstRow || {});
    const required = ['id', 'título', 'imagen', 'tiempo', 'material', 'peso', 'categoría', 'descripción'];
    
    // Verificar que tenga al menos algunas de las columnas necesarias
    const lowerKeys = keys.map(k => k.toLowerCase());
    const hasRequired = required.some(req => 
        lowerKeys.some(key => key.includes(req))
    );
    
    return hasRequired;
}

// Analizar cambios
function analyzeExcelChanges(excelProjects) {
    console.log("Analizando cambios...");
    
    const changes = {
        new: [],
        updated: [],
        deleted: []
    };
    
    const excelIds = new Set();
    
    // Procesar cada proyecto del Excel
    excelProjects.forEach(excelProject => {
        // Extraer datos (insensible a mayúsculas)
        let id, title, img, time, material, weight, category, desc;
        
        Object.keys(excelProject).forEach(key => {
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes('id')) id = excelProject[key];
            else if (lowerKey.includes('título') || lowerKey.includes('titulo')) title = excelProject[key];
            else if (lowerKey.includes('imagen')) img = excelProject[key];
            else if (lowerKey.includes('tiempo')) time = excelProject[key];
            else if (lowerKey.includes('material')) material = excelProject[key];
            else if (lowerKey.includes('peso')) weight = excelProject[key];
            else if (lowerKey.includes('categoría') || lowerKey.includes('categoria')) category = excelProject[key];
            else if (lowerKey.includes('descripción') || lowerKey.includes('descripcion')) desc = excelProject[key];
        });
        
        // Validar ID
        if (!id && id !== 0) {
            console.warn("Proyecto sin ID, omitiendo:", excelProject);
            return;
        }
        
        const idStr = id.toString();
        excelIds.add(idStr);
        
        const currentProject = currentProjects[idStr];
        
        if (currentProject) {
            // Verificar si hay cambios
            const hasChanges = 
                (title && currentProject.title !== title) ||
                (img && currentProject.img !== img) ||
                (time && currentProject.time !== time) ||
                (material && currentProject.material !== material) ||
                (weight && currentProject.weight !== weight) ||
                (category && currentProject.category !== category.toLowerCase()) ||
                (desc && currentProject.desc !== desc);
            
            if (hasChanges) {
                changes.updated.push({
                    id: idStr,
                    current: currentProject,
                    excel: { title, img, time, material, weight, category, desc }
                });
                console.log(`Proyecto actualizado: ${idStr} - ${title}`);
            }
        } else {
            // Nuevo proyecto
            changes.new.push({
                id: idStr,
                data: {
                    title: title || 'Sin título',
                    img: img || '',
                    time: time || '0 h 0 min',
                    material: material || 'PLA - 0g',
                    weight: weight || '0g',
                    category: (category || 'decorativo').toLowerCase(),
                    desc: desc || 'Sin descripción',
                    specs: {
                        "Resolución": "0.2mm",
                        "Relleno": "20%",
                        "Soportes": "No",
                        "Temperatura": "200°C"
                    }
                }
            });
            console.log(`Nuevo proyecto: ${idStr} - ${title}`);
        }
    });
    
    // Identificar proyectos a eliminar (están en current pero no en Excel)
    Object.keys(currentProjects).forEach(id => {
        if (!excelIds.has(id)) {
            changes.deleted.push({
                id: id,
                data: currentProjects[id]
            });
            console.log(`Proyecto a eliminar: ${id} - ${currentProjects[id].title}`);
        }
    });
    
    console.log("Cambios detectados:", changes);
    return changes;
}

// Mostrar resumen de cambios
function showUploadSummary(changes) {
    document.getElementById('secretNewCount').textContent = changes.new.length;
    document.getElementById('secretUpdatedCount').textContent = changes.updated.length;
    document.getElementById('secretDeletedCount').textContent = changes.deleted.length;
    document.getElementById('secretUploadSummary').style.display = 'block';
    
    // Guardar cambios temporalmente
    tempChanges = changes;
    
    const total = changes.new.length + changes.updated.length + changes.deleted.length;
    if (total === 0) {
        showNotification('No se detectaron cambios en el archivo', 'info');
    } else {
        showNotification(`Se detectaron ${total} cambios`, 'info');
    }
}

// Confirmar cambios
function confirmSecretChanges() {
    const password = document.getElementById('adminPassword').value.trim();
    
    if (password !== 'patrocloadmin') {
        showNotification('Contraseña incorrecta', 'error');
        return;
    }
    
    if (!tempChanges) {
        showNotification('No hay cambios para aplicar', 'info');
        return;
    }
    
    try {
        console.log("Aplicando cambios...");
        
        // Crear respaldo
        backupData = JSON.parse(JSON.stringify(currentProjects));
        
        // Aplicar nuevos proyectos
        tempChanges.new.forEach(item => {
            currentProjects[item.id] = item.data;
        });
        
        // Aplicar actualizaciones
        tempChanges.updated.forEach(item => {
            const current = item.current;
            const excel = item.excel;
            
            currentProjects[item.id] = {
                ...current,
                title: excel.title || current.title,
                img: excel.img || current.img,
                time: excel.time || current.time,
                material: excel.material || current.material,
                weight: excel.weight || current.weight,
                category: (excel.category || current.category).toLowerCase(),
                desc: excel.desc || current.desc
            };
        });
        
        // Eliminar proyectos
        tempChanges.deleted.forEach(item => {
            delete currentProjects[item.id];
        });
        
        // ACTUALIZAR LOS DATOS PRINCIPALES Y LA GALERÍA
        printData = JSON.parse(JSON.stringify(currentProjects));
        
        // Regenerar la galería completa
        generateGallery();
        
        // Actualizar panel admin
        updateSecretProjectsList();
        
        // Limpiar formulario
        document.getElementById('adminPassword').value = '';
        document.getElementById('secretUploadSummary').style.display = 'none';
        document.getElementById('secretFileInfo').style.display = 'none';
        document.getElementById('secretExcelFile').value = '';
        
        // Limpiar datos temporales
        excelData = null;
        tempChanges = null;
        
        const totalChanges = tempChanges ? 
            (tempChanges.new.length + tempChanges.updated.length + tempChanges.deleted.length) : 0;
        
        showNotification(`✅ ${totalChanges} cambios aplicados correctamente. La galería se ha actualizado.`, 'success');
        
        // Cerrar panel después de 3 segundos
        setTimeout(() => {
            const overlay = document.getElementById('verlay');
            if (overlay) overlay.remove();
        }, 3000);
        
    } catch (error) {
        console.error("Error aplicando cambios:", error);
        showNotification(`Error: ${error.message}`, 'error');
    }
}

// Descargar Excel actual
function downloadSecretCurrentExcel() {
    if (!sheetJSLoaded) {
        showNotification('Error: La biblioteca Excel no está cargada', 'error');
        return;
    }
    
    try {
        // Preparar datos
        const excelDataArray = Object.entries(currentProjects).map(([id, project]) => ({
            'ID': id,
            'Título': project.title || '',
            'Imagen': project.img || '',
            'Tiempo': project.time || '',
            'Material': project.material || '',
            'Peso': project.weight || '',
            'Categoría': getCategoryName(project.category),
            'Descripción': project.desc || ''
        }));
        
        // Crear libro
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelDataArray);
        XLSX.utils.book_append_sheet(wb, ws, 'Proyectos 3D');
        
        // Generar nombre
        const date = new Date().toISOString().split('T')[0];
        const fileName = `noctuacraft_3d_${date}.xlsx`;
        
        // Descargar
        XLSX.writeFile(wb, fileName);
        
        showNotification('✅ Archivo descargado correctamente', 'success');
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
        console.error(error);
    }
}

// Descargar plantilla
function downloadSecretTemplateExcel() {
    if (!sheetJSLoaded) {
        showNotification('Error: La biblioteca Excel no está cargada', 'error');
        return;
    }
    
    try {
        // Datos de ejemplo
        const templateData = [
            {
                'ID': '7',
                'Título': 'Ejemplo de Proyecto Nuevo',
                'Imagen': 'assets/img/Noctuacraft3D/ejemplo.jpg',
                'Tiempo': '2 h 30 min',
                'Material': 'PLA - 20g',
                'Peso': '20g',
                'Categoría': 'DECORATIVO',
                'Descripción': 'Descripción detallada del proyecto aquí...'
            },
            {
                'ID': '8',
                'Título': 'Otro Proyecto Ejemplo',
                'Imagen': 'assets/img/Noctuacraft3D/ejemplo2.jpg',
                'Tiempo': '1 h 15 min',
                'Material': 'PLA+ - 15g',
                'Peso': '15g',
                'Categoría': 'FUNCIONAL',
                'Descripción': 'Otra descripción de ejemplo para un proyecto funcional'
            }
        ];
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(templateData);
        XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');
        
        XLSX.writeFile(wb, 'plantilla_noctuacraft_3d.xlsx');
        
        showNotification('✅ Plantilla descargada correctamente', 'success');
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
        console.error(error);
    }
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

function getBadgeForCategory(category) {
    const badges = {
        'decorativo': 'DECORATIVO',
        'funcional': 'FUNCIONAL',
        'personalizado': 'PERSONALIZADO',
        'tecnico': 'TÉCNICO'
    };
    return badges[category] || category?.toUpperCase() || 'PROYECTO';
}

function getCategoryName(category) {
    const categories = {
        'decorativo': 'Decorativo',
        'funcional': 'Funcional',
        'personalizado': 'Personalizado',
        'tecnico': 'Técnico'
    };
    return categories[category] || category;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(message, type = 'info') {
    // Crear elemento
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón cerrar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Añadir estilos CSS para animaciones
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Noctuacraft 3D...');
    
    // Configurar año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Iniciar pantalla de carga
    simulateLoading();
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Configurar scroll suave
    setupSmoothScroll();
    
    // Configurar sistema de cotización
    setupQuoteSystem();
    
    // Configurar acceso 
    setupSecretAccess();
    
    // Verificar SheetJS
    if (typeof XLSX !== 'undefined') {
        sheetJSLoaded = true;
        console.log('✅ SheetJS cargado correctamente');
    }
});

// Función para menú móvil
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en enlaces
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú con overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Función para scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}