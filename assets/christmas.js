// navidad.js - Decoración navideña automática (20-25 de diciembre)

(function() {
    // Verificar si estamos en temporada navideña (20 al 25 de diciembre)
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1; // Enero = 1
    const dia = fechaActual.getDate();
    
    const esNavidad = (mes === 12 && dia >= 20 && dia <= 25);
    
    if (!esNavidad) {
        return; // No es época navideña, salir del script
    }
    
    console.log('🎄 ¡Es época navideña! Activando decoraciones...');
    
    // ============================================
    // 1. AGREGAR ESTILOS NAVIDEÑOS
    // ============================================
    const estilosNavidad = document.createElement('style');
    estilosNavidad.textContent = `
        /* Efecto de nieve */
        .snowflake {
            position: fixed;
            top: -10px;
            color: white;
            font-size: 1em;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            user-select: none;
            pointer-events: none;
            z-index: 9998;
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Decoraciones navideñas */
        .navidad-decoration {
            position: fixed;
            z-index: 9997;
            pointer-events: none;
            font-size: 1.5rem;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        /* Borde navideño en header */
        .header-navidad {
            position: relative;
            overflow: hidden;
        }
        
        .header-navidad::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, 
                #ff0000, #ff8000, #ffff00, #00ff00, 
                #0080ff, #0000ff, #8000ff, #ff0000);
            background-size: 800% 100%;
            animation: navidad-border 3s linear infinite;
        }
        
        @keyframes navidad-border {
            0% { background-position: 0% 50%; }
            100% { background-position: 800% 50%; }
        }
        
        /* Efecto en títulos */
        .navidad-text {
            position: relative;
            display: inline-block;
        }
        
        .navidad-text::after {
            content: ' 🎄';
            opacity: 0.8;
            animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.3; }
        }
        
        /* Fondo sutil navideño */
        body.navidad-active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 0.05) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(0, 255, 0, 0.05) 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
            pointer-events: none;
            z-index: -1;
        }
        
        /* Efecto en botones */
        .cta-button.navidad {
            position: relative;
            overflow: hidden;
            border: 2px solid #ff3333 !important;
        }
        
        .cta-button.navidad::before {
            content: '🎅 ';
            margin-right: 5px;
        }
        
        .cta-button.navidad::after {
            content: ' 🦌';
            margin-left: 5px;
        }
        
        /* Pato navideño */
        .floating-duck.navidad {
            background: linear-gradient(45deg, #ff0000, #00ff00, #ffffff);
            background-size: 300% 300%;
            animation: navidad-gradient 3s ease infinite;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }
        
        @keyframes navidad-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(estilosNavidad);
    
    // ============================================
    // 2. CREAR COPOS DE NIEVE
    // ============================================
    function crearNieve() {
        const cantidadNieve = 50; // Ajusta según rendimiento
        const tiposCopos = ['❄️', '❅', '❆', '*', '·'];
        
        for (let i = 0; i < cantidadNieve; i++) {
            setTimeout(() => {
                const copo = document.createElement('div');
                copo.className = 'snowflake';
                
                // Tipo aleatorio
                const tipo = tiposCopos[Math.floor(Math.random() * tiposCopos.length)];
                copo.textContent = tipo;
                
                // Tamaño aleatorio
                const tamaño = Math.random() * 20 + 10;
                copo.style.fontSize = `${tamaño}px`;
                
                // Posición aleatoria
                const left = Math.random() * 100;
                copo.style.left = `${left}vw`;
                
                // Velocidad aleatoria
                const duracion = Math.random() * 5 + 5;
                const delay = Math.random() * 5;
                copo.style.animationDuration = `${duracion}s`;
                copo.style.animationDelay = `${delay}s`;
                
                // Opacidad aleatoria
                copo.style.opacity = Math.random() * 0.7 + 0.3;
                
                document.body.appendChild(copo);
                
                // Remover copo después de caer
                setTimeout(() => {
                    if (copo.parentNode) {
                        copo.remove();
                    }
                }, (duracion + delay) * 1000);
            }, i * 100);
        }
    }
    
    // Crear nieve cada 10 segundos
    crearNieve();
    setInterval(crearNieve, 10000);
    
    // ============================================
    // 3. AGREGAR DECORACIONES ESTÁTICAS
    // ============================================
    function agregarDecoraciones() {
        // Agregar clase navideña al body
        document.body.classList.add('navidad-active');
        
        // Decoraciones en las esquinas
        const decoraciones = [
            { top: '20px', left: '20px', emoji: '🎄' },
            { top: '20px', right: '20px', emoji: '🎁' },
            { bottom: '80px', left: '20px', emoji: '🦌' },
            { bottom: '80px', right: '20px', emoji: '⛄' }
        ];
        
        decoraciones.forEach((decor, index) => {
            const elem = document.createElement('div');
            elem.className = 'navidad-decoration';
            elem.textContent = decor.emoji;
            elem.style.top = decor.top;
            elem.style.bottom = decor.bottom;
            elem.style.left = decor.left;
            elem.style.right = decor.right;
            elem.style.animationDelay = `${index * 0.5}s`;
            document.body.appendChild(elem);
        });
        
        // Agregar borde navideño al header
        const header = document.getElementById('mainHeader');
        if (header) {
            header.classList.add('header-navidad');
        }
        
        // Decorar títulos principales
        const titulos = document.querySelectorAll('h1, h2.section-title');
        titulos.forEach(titulo => {
            const span = document.createElement('span');
            span.className = 'navidad-text';
            span.innerHTML = titulo.innerHTML;
            titulo.innerHTML = '';
            titulo.appendChild(span);
        });
        
        // Decorar botones CTA
        const botones = document.querySelectorAll('.cta-button');
        botones.forEach(boton => {
            boton.classList.add('navidad');
        });
        
        // Decorar el pato flotante
        const pato = document.getElementById('floatingDuck');
        if (pato) {
            pato.classList.add('navidad');
            pato.title = '¡Feliz Navidad! 🎄☕';
        }
        
        // Mensaje de bienvenida navideño
        setTimeout(() => {
            const mensaje = document.createElement('div');
            mensaje.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 14, 23, 0.9);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                border: 3px solid #ff3333;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 0 30px rgba(255, 51, 51, 0.5);
                animation: aparecer 2s ease;
            `;
            mensaje.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #ff3333;">🎄 ¡Feliz Navidad! 🎅</h3>
                <p style="margin: 0; color: #e9e2d6;">Que tus proyectos estén llenos de magia y código</p>
                <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #b0a797;</p>
            `;
            document.body.appendChild(mensaje);
            
            // Remover mensaje después de 5 segundos
            setTimeout(() => {
                if (mensaje.parentNode) {
                    mensaje.style.opacity = '0';
                    mensaje.style.transition = 'opacity 1s ease';
                    setTimeout(() => {
                        if (mensaje.parentNode) {
                            mensaje.remove();
                        }
                    }, 1000);
                }
            }, 5000);
        }, 1000);
    }
    
    // ============================================
    // 4. MÚSICA NAVIDEÑA OPCIONAL (DESACTIVADA POR DEFECTO)
    // ============================================
    function agregarMusicaOpcional() {
        // Solo agregar si el usuario no ha desactivado previamente
        if (localStorage.getItem('navidad-silenciosa') === 'true') {
            return;
        }
        
        const musica = document.createElement('audio');
        musica.id = 'musica-navidad';
        musica.loop = true;
        musica.volume = 0.3;
        musica.innerHTML = `
            <source src="https://assets.mixkit.co/music/preview/mixkit-jingle-bells-311.mp3" type="audio/mpeg">
            <source src="https://assets.mixkit.co/music/preview/mixkit-christmas-is-coming-332.mp3" type="audio/mpeg">
        `;
        document.body.appendChild(musica);
        
        // Botón para controlar música
        const botonMusica = document.createElement('button');
        botonMusica.id = 'control-musica';
        botonMusica.style.cssText = `
            position: fixed;
            bottom: 130px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 51, 51, 0.9);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 9999;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        botonMusica.innerHTML = '🎵';
        botonMusica.title = 'Silenciar música navideña';
        document.body.appendChild(botonMusica);
        
        let musicaActiva = true;
        
        botonMusica.addEventListener('click', () => {
            musicaActiva = !musicaActiva;
            
            if (musicaActiva) {
                musica.play();
                botonMusica.innerHTML = '🎵';
                botonMusica.title = 'Silenciar música navideña';
                botonMusica.style.background = 'rgba(255, 51, 51, 0.9)';
                localStorage.setItem('navidad-silenciosa', 'false');
            } else {
                musica.pause();
                botonMusica.innerHTML = '🔇';
                botonMusica.title = 'Activar música navideña';
                botonMusica.style.background = 'rgba(100, 100, 100, 0.9)';
                localStorage.setItem('navidad-silenciosa', 'true');
            }
        });
        
        // Intentar reproducir automáticamente (puede requerir interacción del usuario)
        setTimeout(() => {
            musica.play().catch(e => {
                console.log('La música requiere interacción del usuario:', e.message);
                botonMusica.innerHTML = '▶️';
                botonMusica.title = 'Reproducir música navideña (click para activar)';
            });
        }, 2000);
    }
    
    // ============================================
    // 5. INICIALIZAR TODO
    // ============================================
    window.addEventListener('DOMContentLoaded', () => {
        // Esperar a que cargue la página principal
        setTimeout(() => {
            agregarDecoraciones();
            // Descomenta la siguiente línea si quieres música
            // agregarMusicaOpcional();
            
            // Log en consola
            console.log(`
            🎅 ¡Feliz Navidad desde Noctuacraft! 🎄
            ⛄ Decoraciones activadas del 20 al 25 de diciembre
            ❄️ Nieve, luces y magia en tu código
            🦌 Patroclo también celebra la Navidad
            `);
        }, 1000);
    });
    
    // Inicializar si DOM ya está listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', agregarDecoraciones);
    } else {
        agregarDecoraciones();
    }
})();