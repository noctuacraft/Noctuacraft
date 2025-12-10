// Datos de código para proyectos
const projectCode = {
    'noctuacoffee': {
        title: 'Noctuacoffee - Código Fuente',
        code: `// Noctuacoffee - Sitio Web de Cafetería
const noctuacoffee = {
    // Configuración inicial
    config: {
        apiUrl: 'https://api.noctuacoffee.com/v1',
        theme: 'coffee',
        animations: true
    },

    // Inicialización
    init: function() {
        this.loadMenu();
        this.setupReservations();
        this.initGallery();
        this.setupAnimations();
        console.log('🦆 Noctuacoffee inicializado con éxito!');
    },

    // Cargar menú desde API
    loadMenu: async function() {
        try {
            const response = await fetch('\${this.config.apiUrl}/menu');
            const menu = await response.json();
            this.renderMenu(menu);
        } catch (error) {
            console.error('Error cargando el menú:', error);
            this.loadFallbackMenu();
        }
    },

    // Renderizar menú en la página
    renderMenu: function(menu) {
        const menuContainer = document.getElementById('menu-container');
        
        menu.categories.forEach(category => {
            const categoryHTML = \`
                <div class="menu-category">
                    <h3 class="category-title">\${category.name}</h3>
                    <div class="category-items">
                        \${category.items.map(item => this.createMenuItemHTML(item)).join('')}
                    </div>
                </div>
            \`;
            
            menuContainer.innerHTML += categoryHTML;
        });
    },

    // HTML para item del menú
    createMenuItemHTML: function(item) {
        return \`
            <div class="menu-item" data-id="\${item.id}">
                <div class="item-info">
                    <h4 class="item-name">\${item.name}</h4>
                    <p class="item-description">\${item.description}</p>
                    <span class="item-price">$\${item.price}</span>
                </div>
                \${item.image ? \`<img src="\${item.image}" alt="\${item.name}" class="item-image">\` : ''}
            </div>
        \`;
    },

    // Sistema de reservas
    setupReservations: function() {
        const reservationForm = document.getElementById('reservation-form');
        
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReservation(new FormData(reservationForm));
        });
    },

    // Procesar reserva
    handleReservation: async function(formData) {
        const reservation = {
            name: formData.get('name'),
            email: formData.get('email'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            specialRequests: formData.get('requests')
        };

        try {
            const response = await fetch('\${this.config.apiUrl}/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation)
            });

            if (response.ok) {
                this.showNotification('✅ Reserva confirmada! Te esperamos.', 'success');
                reservationForm.reset();
            } else {
                throw new Error('Error en la reserva');
            }
        } catch (error) {
            console.error('Error haciendo la reserva:', error);
            this.showNotification('❌ Error al hacer la reserva. Intenta nuevamente.', 'error');
        }
    },

    // Galería de imágenes
    initGallery: function() {
        const gallery = document.getElementById('coffee-gallery');
        
        if (gallery) {
            // Inicializar lightbox o carousel
            this.setupLightbox(gallery);
        }
    },

    // Configurar animaciones
    setupAnimations: function() {
        if (this.config.animations) {
            // Animaciones con Intersection Observer
            this.setupScrollAnimations();
        }
    },

    // Menú de respaldo
    loadFallbackMenu: function() {
        const fallbackMenu = {
            categories: [
                {
                    name: "Cafés Especiales",
                    items: [
                        {
                            id: 1,
                            name: "Espresso Nocturno",
                            description: "Café intenso con notas de chocolate y nuez",
                            price: 450,
                            image: "/images/espresso.jpg"
                        }
                    ]
                }
            ]
        };
        
        this.renderMenu(fallbackMenu);
    },

    // Mostrar notificación
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = \`notification \${type}\`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    noctuacoffee.init();
});`
    },
    'noctuavinyl': {
        title: 'Noctuavinyl - Código Fuente',
        code: `// Noctuavinyl - E-commerce de Vinilos
class VinylStore {
    constructor() {
        this.products = [];
        this.cart = this.loadCart();
        this.filters = {
            genre: '',
            priceRange: '',
            year: '',
            search: ''
        };
        this.currentPage = 1;
        this.productsPerPage = 12;
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartUI();
        
        console.log('🎵 Noctuavinyl store initialized!');
    }

    // Cargar productos desde API
    async loadProducts() {
        try {
            const response = await fetch('/api/vinyls');
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            this.loadSampleProducts();
        }
    }

    // Productos de ejemplo
    loadSampleProducts() {
        this.products = [
            {
                id: 1,
                title: "Random Access Memories",
                artist: "Daft Punk",
                genre: "Electronic",
                price: 89.99,
                year: 2023,
                image: "/images/daft-punk.jpg",
                inStock: true,
                limited: true
            },
            {
                id: 2,
                title: "Unknown Pleasures",
                artist: "Joy Division",
                genre: "Post-Punk",
                price: 75.50,
                year: 1979,
                image: "/images/joy-division.jpg",
                inStock: true,
                limited: false
            }
        ];
    }

    // Filtrar productos
    getFilteredProducts() {
        return this.products.filter(product => {
            const matchesGenre = !this.filters.genre || product.genre === this.filters.genre;
            const matchesSearch = !this.filters.search || 
                product.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                product.artist.toLowerCase().includes(this.filters.search.toLowerCase());
            const matchesPrice = this.checkPriceRange(product.price);
            
            return matchesGenre && matchesSearch && matchesPrice;
        });
    }

    // Verificar rango de precio
    checkPriceRange(price) {
        if (!this.filters.priceRange) return true;
        
        const [min, max] = this.filters.priceRange.split('-').map(Number);
        return price >= min && (!max || price <= max);
    }

    // Renderizar productos
    renderProducts() {
        const container = document.getElementById('products-grid');
        const filteredProducts = this.getFilteredProducts();
        
        // Paginación
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + this.productsPerPage);
        
        container.innerHTML = paginatedProducts.map(product => \`
            <div class="product-card" data-id="\${product.id}">
                <div class="product-image">
                    <img src="\${product.image}" alt="\${product.title}">
                    \${product.limited ? '<span class="limited-badge">EDICIÓN LIMITADA</span>' : ''}
                    \${!product.inStock ? '<span class="out-of-stock">AGOTADO</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">\${product.title}</h3>
                    <p class="product-artist">\${product.artist}</p>
                    <div class="product-meta">
                        <span class="product-year">\${product.year}</span>
                        <span class="product-genre">\${product.genre}</span>
                    </div>
                    <div class="product-price">$\${product.price}</div>
                    <button class="add-to-cart-btn" 
                            \${!product.inStock ? 'disabled' : ''}
                            onclick="vinylStore.addToCart(\${product.id})">
                        \${product.inStock ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
                    </button>
                </div>
            </div>
        \`).join('');
        
        this.renderPagination(filteredProducts.length);
    }

    // Paginación
    renderPagination(totalProducts) {
        const totalPages = Math.ceil(totalProducts / this.productsPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Botón anterior
        if (this.currentPage > 1) {
            paginationHTML += \`<button onclick="vinylStore.changePage(\${this.currentPage - 1})">← Anterior</button>\`;
        }
        
        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += \`
                <button class="\${i === this.currentPage ? 'active' : ''}" 
                        onclick="vinylStore.changePage(\${i})">
                    \${i}
                </button>
            \`;
        }
        
        // Botón siguiente
        if (this.currentPage < totalPages) {
            paginationHTML += \`<button onclick="vinylStore.changePage(\${this.currentPage + 1})">Siguiente →</button>\`;
        }
        
        pagination.innerHTML = paginationHTML;
    }

    // Cambiar página
    changePage(page) {
        this.currentPage = page;
        this.renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Agregar al carrito
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        
        if (!product || !product.inStock) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showCartNotification(product.title);
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = \`$\${totalPrice.toFixed(2)}\`;
    }

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('noctuavinyl-cart', JSON.stringify(this.cart));
    }

    // Cargar carrito desde localStorage
    loadCart() {
        const saved = localStorage.getItem('noctuavinyl-cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Notificación de producto agregado
    showCartNotification(productName) {
        // Implementar notificación bonita
        console.log(\`✅ "\${productName}" agregado al carrito!\`);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.currentPage = 1;
                this.renderProducts();
            });
        }
        
        // Filtros
        const genreFilter = document.getElementById('genre-filter');
        if (genreFilter) {
            genreFilter.addEventListener('change', (e) => {
                this.filters.genre = e.target.value;
                this.currentPage = 1;
                this.renderProducts();
            });
        }
    }
}

// Inicializar la tienda
const vinylStore = new VinylStore();`
    }
};

// Año actual para el copyright
document.getElementById("year").textContent = new Date().getFullYear();

// Pantalla de carga optimizada
function simulateLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 200);
}

// Crear estrellas en el fondo (optimizado para móviles)
function createStars() {
    const starsContainer = document.getElementById('stars');
    const isMobile = window.innerWidth <= 768;
    const starCount = isMobile ? 30 : 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = isMobile ? 0 : Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        if (!isMobile) {
            star.style.animationDelay = `${delay}s`;
        }
        
        starsContainer.appendChild(star);
    }
}

// Crear efecto de código en el fondo (solo en desktop)
function createCodeEffect() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;
    
    const codeContainer = document.getElementById('codeEffect');
    const codeLines = [
        "function createMagic() {",
        "  while(coffee > 0) {",
        "    code.push(creativity);",
        "    coffee--;",
        "  }",
        "  return awesomeProject;",
        "}",
        "const noctuaCraft = {",
        "  passion: 'coding',",
        "  fuel: 'coffee',",
        "  time: 'night',",
        "  output: 'magic'",
        "};",
        "if (night && coffee) {",
        "  createSomethingAmazing();",
        "}"
    ];
    
    codeLines.forEach((line, index) => {
        const codeElement = document.createElement('div');
        codeElement.classList.add('code-line');
        codeElement.textContent = line;
        codeElement.style.top = `${(index + 1) * 8}%`;
        codeElement.style.animationDelay = `${index * 2}s`;
        codeContainer.appendChild(codeElement);
    });
}

// Menú móvil mejorado
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const header = document.getElementById('mainHeader');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en un enlace
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic en el overlay
    mobileOverlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll para enlaces de navegación (SOLO para anclas)
function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Solo aplicar smooth scroll para enlaces que sean anclas (#)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            // Los enlaces que no son anclas (como noctuacraft-3d.html) se comportarán normalmente
        });
    });
}
// Contador de café
function setupCoffeeCounter() {
    const coffeeCount = document.getElementById('coffeeCount');
    let count = 0;
    
    // Incrementar cada 30 minutos (simulación)
    setInterval(() => {
        count++;
        coffeeCount.textContent = count;
    }, 1800000);
    
    // También incrementar al hacer clic en el pato
    document.getElementById('floatingDuck').addEventListener('click', () => {
        count++;
        coffeeCount.textContent = count;
        
        // Efecto especial
        const duck = document.getElementById('floatingDuck');
        duck.style.transform = 'scale(1.3)';
        setTimeout(() => {
            duck.style.transform = '';
        }, 300);
        
        // Mensaje aleatorio del pato
        const messages = [
            "¡Cuack! ☕",
            "¡Más café por favor! 🦆",
            "¡Trabajando duro! 💻",
            "¡Las ideas fluyen! ✨",
            "¡Hora de codear! 🚀",
            "Hola, soy Patroclo! Aparezco en la portadaaaa"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        duck.setAttribute('title', randomMessage);
    });
}

// Efecto de aparición al hacer scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-container, .ad-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Modal para ver código de proyectos
function setupCodeModal() {
    const codeModal = document.getElementById('codeModal');
    const codeModalClose = document.getElementById('codeModalClose');
    const codeContent = document.getElementById('codeContent');
    const codeModalTitle = document.getElementById('codeModalTitle');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    
    // Abrir modal al hacer clic en "Ver Código"
    document.querySelectorAll('.view-code').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const projectData = projectCode[projectId];
            
            if (projectData) {
                codeModalTitle.textContent = projectData.title;
                codeContent.textContent = projectData.code;
                
                // Resaltar sintaxis básico
                highlightCode(codeContent);
                
                // Mostrar modal
                codeModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Botón copiar código
    copyCodeBtn.addEventListener('click', () => {
        const codeToCopy = codeContent.textContent;
        navigator.clipboard.writeText(codeToCopy).then(() => {
            const originalText = copyCodeBtn.textContent;
            copyCodeBtn.textContent = '¡Copiado!';
            copyCodeBtn.style.background = 'var(--coffee-light)';
            
            setTimeout(() => {
                copyCodeBtn.textContent = originalText;
                copyCodeBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
            copyCodeBtn.textContent = 'Error al copiar';
        });
    });
    
    // Cerrar modal
    codeModalClose.addEventListener('click', () => {
        codeModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    codeModal.addEventListener('click', (e) => {
        if (e.target === codeModal) {
            codeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && codeModal.classList.contains('active')) {
            codeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Resaltado básico de código
function highlightCode(element) {
    const code = element.textContent;
    
    // Resaltado básico de palabras clave
    let highlighted = code
        .replace(/(const|let|var|function|class|return|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|new|this|typeof|instanceof|void|delete|in|of|yield|await|async|static|export|import|from|default|extends|implements|interface|package|private|protected|public|super)\b/g, '<span class="keyword">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/(["'`](?:\\.|[^"'`])*["'`])/g, '<span class="string">$1</span>')
        .replace(/(\b\d+\b)/g, '<span class="number">$1</span>');
    
    element.innerHTML = highlighted;
}

// Efectos de hover para tarjetas de proyecto
function setupProjectHoverEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Sistema de notificaciones
function setupNotifications() {
    // Notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a Noctuacraft! 🐥☕', 'info');
    }, 3000);
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dark-blue);
        color: var(--moonlight);
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid var(--coffee-light);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón cerrar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
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

// Easter eggs y funcionalidades divertidas
function setupEasterEggs() {
    // Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join() === konamiSequence.join()) {
            showNotification('🎮 ¡Código Konami activado! 15% DE DESCUENTO en tu próximo proyecto! 🦆', 'success');
            konamiCode = [];
            
            // Efecto especial
            document.body.style.animation = 'rainbow 2s linear';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Click  en el logo
    document.querySelector('.logo').addEventListener('dblclick', () => {
        showNotification('🦆 ¡Patroclo dice hola! ¿Necesitás más café? ☕', 'info');
    });
}

// Modal para ver imagen ampliada
function setupImageModal() {
    const imageModal = document.getElementById('imageModal');
    const imageModalClose = document.getElementById('imageModalClose');
    const modalImage = document.getElementById('modalImage');

    // Abrir modal al hacer clic en "Ver Imagen"
    document.querySelectorAll('.view-image').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const imageUrl = this.getAttribute('data-image');
            
            if (imageUrl) {
                modalImage.src = imageUrl;
                modalImage.alt = this.closest('.project-card').querySelector('h3').textContent + ' - Imagen ampliada';
                
                // Mostrar modal
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal
    imageModalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera de la imagen
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Modal para ver PDF
function setupPdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfModalClose = document.getElementById('pdfModalClose');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfModalTitle = document.getElementById('pdfModalTitle');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    // Abrir modal al hacer clic en "Ver PDF"
    document.querySelectorAll('.view-pdf').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfUrl = this.getAttribute('data-pdf');
            const pdfTitle = this.getAttribute('data-title');
            
            if (pdfUrl) {
                pdfViewer.src = pdfUrl;
                pdfModalTitle.textContent = pdfTitle;
                downloadPdfBtn.href = pdfUrl;
                
                // Mostrar modal
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal
    pdfModalClose.addEventListener('click', () => {
        pdfModal.classList.remove('active');
        document.body.style.overflow = '';
        pdfViewer.src = ''; // Limpiar el visor
    });

    // Cerrar modal al hacer clic fuera del contenido
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('active');
            document.body.style.overflow = '';
            pdfViewer.src = ''; // Limpiar el visor
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            pdfModal.classList.remove('active');
            document.body.style.overflow = '';
            pdfViewer.src = ''; // Limpiar el visor
        }
    });
}

// Si quieres que las imágenes se amplíen al hacer clic
function setupAdImageModal() {
    const imageModal = document.getElementById('imageModal');
    
    document.querySelectorAll('.ad-image').forEach(imageContainer => {
        imageContainer.addEventListener('click', function() {
            const backgroundImage = this.style.backgroundImage;
            // Extraer la URL de la imagen del background-image
            const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            
            if (imageUrl) {
                const modalImage = document.getElementById('modalImage');
                modalImage.src = imageUrl;
                
                // Mostrar modal
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    simulateLoading();
    createStars();
    createCodeEffect();
    setupMobileMenu();
    setupSmoothScroll();
    setupCoffeeCounter();
    setupCodeModal();
    setupProjectHoverEffects();
    setupNotifications();
    setupEasterEggs();
    setupImageModal();
    setupPdfModal();
    setupAdImageModal();
    
    // Inicializar opacidad y posición de elementos
    document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-container, .ad-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Revelar elementos al cargar la página
    setTimeout(revealOnScroll, 500);
    
    // Revelar elementos al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Manejar el envío del formulario
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !message) {
            showNotification('❌ Por favor, completá todos los campos.', 'error');
            return;
        }
        
        const whatsappMessage = `¡Hola! Soy ${name}. ${message}. Mi email es: ${email}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Abrir WhatsApp
        window.open(`https://wa.me/5491140995163?text=${encodedMessage}`, '_blank');
        
        // Resetear formulario
        this.reset();
        
        // Mostrar confirmación
        showNotification('✅ ¡Mensaje enviado! Te contactaré pronto.', 'success');
    });
    
    // Efectos de hover para botones
    document.querySelectorAll('.cta-button, .whatsapp-button, .submit-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Console log de bienvenida
    console.log(`
    🐥 ¡Bienvenido a Noctuacraft! 
    ☕ Donde el café se transforma en código
    🌙 Trabajando mientras el mundo duerme...
    
    ¿Tenés un proyecto en mente? ¡Hablemos!
    `);
});

// Manejar redimensionado de ventana
window.addEventListener('resize', function() {
    // Recrear estrellas en móviles si cambia la orientación
    if (window.innerWidth <= 768) {
        const starsContainer = document.getElementById('stars');
        starsContainer.innerHTML = '';
        createStars();
    }
});

// Intersection Observer para animaciones más eficientes
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observar todos los elementos que necesitan animación
    document.querySelectorAll('.skill-card, .project-card, .ad-item').forEach(el => {
        observer.observe(el);
    });
}