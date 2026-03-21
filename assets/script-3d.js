// ============================================
// CONEXIÓN CON FIREBASE - GALERÍA EN TIEMPO REAL
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config (MISMA que admin)
const firebaseConfig = {
    apiKey: "AIzaSyCETIGd2eehtCA7I4MAcNyr-cFmIoBDLfU",
    databaseURL: "https://noctua-stock-default-rtdb.firebaseio.com",
    projectId: "noctua-stock",
    appId: "1:812703979866:web:1bbce7166ed1b738af3b63"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const productosRef = ref(db, 'productos');

// Variable global para almacenar productos
let productosFirebase = {};

// ============================================
// FUNCIONES DE LA GALERÍA (Adaptadas para Firebase)
// ============================================

function getCategoryName(cat) {
    const map = { decorativo: "Decorativo", funcional: "Funcional", personalizado: "Personalizado", tecnico: "Técnico" };
    return map[cat] || cat;
}

function getBadgeForCategory(cat) {
    const map = { decorativo: "🎨 Decorativo", funcional: "⚙️ Funcional", personalizado: "✨ Personalizado", tecnico: "🔧 Técnico" };
    return map[cat] || cat;
}

// Crear tarjeta individual desde datos de Firebase
function createPrintCard(id, product) {
    const card = document.createElement('div');
    card.className = 'print-card';
    card.setAttribute('data-print', id);
    card.setAttribute('data-category', product.categoria || 'decorativo');
    
    card.style.cssText = `
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    `;
    
    const badgeText = getBadgeForCategory(product.categoria);
    const imgSrc = product.img || 'assets/img/Noctuacraft3D/default.jpg';
    const titulo = product.nombre || 'Producto 3D';
    const descripcion = product.descripcion || `Modelo 3D de categoría ${product.categoria || 'general'}`;
    const tiempo = product.tiempo || '2-4 horas';
    const material = product.material || 'PLA';
    
    card.innerHTML = `
        <div class="print-badge">${badgeText}</div>
        <img src="${imgSrc}" alt="${titulo}" class="print-img" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYjI2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg=='">
        <div class="print-info">
            <h3 class="print-title">${titulo}</h3>
            <p class="print-desc">${descripcion.substring(0, 100)}${descripcion.length > 100 ? '...' : ''}</p>
            <div class="print-meta">
                <span class="print-time"> ${tiempo}</span>
                <span class="print-material">🧵 ${material}</span>
                <span class="print-price">💰 $${product.precio || 'Consultar'}</span>
            </div>
            <span class="print-more">Ver detalles →</span>
        </div>
    `;
    
    return card;
}

// Generar galería desde Firebase
function generateGalleryFromFirebase() {
    const galleryContainer = document.getElementById('dynamicGallery');
    if (!galleryContainer) {
        console.error("ERROR: No se encontró #dynamicGallery");
        return;
    }
    
    galleryContainer.innerHTML = '';
    const productosArray = Object.entries(productosFirebase);
    
    if (productosArray.length === 0) {
        galleryContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: rgba(233, 226, 214, 0.5);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                <h3>No hay productos disponibles</h3>
                <p>Agregá productos desde el panel de administración</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por key
    productosArray.sort((a, b) => a[0].localeCompare(b[0]));
    
    productosArray.forEach(([id, product], index) => {
        const card = createPrintCard(id, product);
        galleryContainer.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    setTimeout(() => {
        setupGalleryFilters();
        setupPrintModal();
        setupFilamentCounter();
    }, 500);
}

// Configurar filtros
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const printCards = document.querySelectorAll('.print-card');
    
    if (!filterBtns.length || !printCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.removeEventListener('click', handleFilter);
        btn.addEventListener('click', handleFilter);
    });
    
    function handleFilter() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        
        printCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }
}

// Configurar modal con datos de Firebase
function setupPrintModal() {
    const modal = document.getElementById('printModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalClose) return;
    
    // Usar delegación de eventos porque las cards se regeneran
    document.querySelector('.gallery-3d').addEventListener('click', (e) => {
        const card = e.target.closest('.print-card');
        if (!card) return;
        
        const printId = card.getAttribute('data-print');
        const data = productosFirebase[printId];
        
        if (!data) {
            console.error("No se encontraron datos:", printId);
            return;
        }
        
        const modalImg = document.getElementById('modalImg');
        modalImg.src = data.img || '';
        modalImg.alt = data.nombre || 'Producto';
        
        document.getElementById('modalTitle').textContent = data.nombre || 'Producto 3D';
        document.getElementById('modalDesc').textContent = data.descripcion || 'Sin descripción disponible.';
        
        const modalDetails = document.getElementById('modalDetails');
        modalDetails.innerHTML = '';
        
        const details = [
            { label: 'Tiempo de impresión', value: data.tiempo || '2-4 horas', icon: '' },
            { label: 'Material usado', value: data.material || 'PLA', icon: '🧵' },
            { label: 'Peso aproximado', value: data.peso || 'Consultar', icon: '⚖️' },
            { label: 'Categoría', value: getCategoryName(data.categoria), icon: '🏷️' },
            { label: 'Precio', value: `$${data.precio || 'Consultar'}`, icon: '💰' }
        ];
        
        if (data.especificaciones && typeof data.especificaciones === 'object') {
            Object.entries(data.especificaciones).forEach(([key, value]) => {
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
        
        document.getElementById('quoteBtn').onclick = () => {
            const message = `¡Hola! Me interesa una cotización para el modelo: "${data.nombre}". Precio: $${data.precio || 'a definir'}. ¿Podrías darme más información?`;
            window.open(`https://wa.me/5491160244156?text=${encodeURIComponent(message)}`, '_blank');
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}



// Sistema de cotización
function setupQuoteSystem() {
    const form = document.getElementById('quoteForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const projectType = document.getElementById('projectType')?.value || '';
        const material = document.getElementById('material')?.value || '';
        const quantity = document.getElementById('quantity')?.value || 1;
        const urgency = document.getElementById('urgency')?.value || 'normal';
        const description = document.getElementById('description')?.value || '';
        
        if (!projectType || !material || !description) {
            alert('Por favor, completá todos los campos.');
            return;
        }
        
        const urgencyText = {
            'normal': 'Normal (5-7 días)',
            'urgent': 'Urgente (2-3 días)',
            'express': 'Express (24 horas)'
        }[urgency] || 'Normal (5-7 días)';
        
        const message = `¡Hola! Solicito cotización para impresión 3D:%0ATipo de Proyecto: ${projectType}%0AMaterial: ${material}%0ACantidad: ${quantity} unidades%0AUrgencia: ${urgencyText}%0ADescripción: ${description}`;
        
        window.open(`https://wa.me/5491160244156?text=${message}`, '_blank');
        form.reset();
        alert('otización enviada. Te contactaremos por WhatsApp.');
    });
}

// Menú móvil
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// ESCUCHA EN TIEMPO REAL DE FIREBASE
// ============================================
onValue(productosRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        productosFirebase = data;
    } else {
        productosFirebase = {};
    }
    generateGalleryFromFirebase();
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    setupMobileMenu();
    setupSmoothScroll();
    setupQuoteSystem();
    
    // El resto se activa cuando Firebase devuelve datos
});

// Acceso secreto a admin (escribir "noctua")
let buffer = "";
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key.length === 1) buffer += key;
    if (buffer.length > 6) buffer = buffer.slice(-6);
    if (buffer === "noctua") {
        window.location.href = "admin.html";
        buffer = "";
    }
});