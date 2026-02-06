/**
 * ═══════════════════════════════════════════════════════
 * PÁGINA WEB ANIVERSARIO PREMIUM - 5 MESES
 * Jean Carlos Martinez Cordoba
 * Animaciones Elegantes y Cinematográficas
 * ═══════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones
    initCinematicOpening();
    initStars();
    initScrollAnimations();
    initParallax();
    initGallerySlider();
    initTypingAnimation();
    initCounter();
    initMicroInteractions();
    initLightbox();
    initTextAnimations();
});

/**
 * ═══════════════════════════════════════════════════════
 * APERTURA CINEMATOGRÁFICA
 * ═══════════════════════════════════════════════════════
 */
function initCinematicOpening() {
    // Esperar un momento y luego abrir las cortinillas
    setTimeout(() => {
        document.body.classList.add('curtain-open');
    }, 800);
}

/**
 * ═══════════════════════════════════════════════════════
 * ESTRELLAS Y PARTÍCULAS
 * ═══════════════════════════════════════════════════════
 */
function initStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    // Crear estrellas
    function createStar() {
        const star = document.createElement('span');
        star.className = 'star';
        
        const isGold = Math.random() > 0.7;
        const isLarge = Math.random() > 0.9;
        
        if (isGold) star.classList.add('star-gold');
        if (isLarge) star.classList.add('star-large');
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 8000);
    }
    
    // Crear estrellas continuamente
    setInterval(createStar, 500);
    
    // Crear algunas estrellas iniciales
    for (let i = 0; i < 30; i++) {
        setTimeout(createStar, i * 100);
    }
}

/**
 * ═══════════════════════════════════════════════════════
 * ANIMACIONES ACTIVADAS POR SCROLL (Intersection Observer)
 * ═══════════════════════════════════════════════════════
 */
function initScrollAnimations() {
    // Elementos con reveal
    const revealElements = document.querySelectorAll(
        '.letter-paper, .gratitude-content, .final-content, .timeline-item, .counter-unit'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Añadir stagger a los elementos hermanos
                let sibling = entry.target.nextElementSibling;
                let delay = 100;
                while (sibling && sibling.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        sibling.classList.add('visible');
                    }, delay);
                    delay += 100;
                    sibling = sibling.nextElementSibling;
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Parallax suave en secciones (excluyendo letter-section para que no se mueva)
    const parallaxSections = document.querySelectorAll('.counter-section, .gratitude-section, .final-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.03 + (index * 0.01);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top - window.innerHeight / 2) * speed;
                if (section.style.backgroundPositionY) {
                    section.style.backgroundPositionY = `${yPos}px`;
                }
            }
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════
 * PARALLAX EN IMÁGENES
 * ═══════════════════════════════════════════════════════
 */
function initParallax() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        galleryItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const parallaxValue = item.getAttribute('data-parallax') || 0.1;
            const image = item.querySelector('.gallery-image');
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (scrolled * parallaxValue * 0.3);
                image.style.transform = `scale(1.15) translateY(${yPos * 0.15}px)`;
            }
        });
    });
    
    // Parallax en elementos del timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const xPos = (scrolled * 0.02 * (index % 2 === 0 ? 1 : -1));
                item.style.transform = `translateX(${xPos}px)`;
            }
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════
 * MARQUEE INFINITO DE LA GALERÍA
 * ═══════════════════════════════════════════════════════
 */
function initGallerySlider() {
    const track = document.getElementById('sliderTrack');
    const viewport = document.getElementById('sliderViewport');
    
    if (!track || !viewport) return;
    
    // El marquee ya está configurado con CSS animation
    // Solo necesitamos agregar hover para pausar
    viewport.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    viewport.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let isPaused = false;
    
    viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        track.style.animationPlayState = 'paused';
        isPaused = true;
    }, { passive: true });
    
    viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(() => {
            if (!isPaused) {
                track.style.animationPlayState = 'running';
            }
        }, 500);
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Reiniciar animación al hacer swipe
            const isMobile = window.innerWidth <= 480;
            const animationName = isMobile ? 'marquee-scroll-mobile' : 'marquee-scroll';
            const duration = isMobile ? '60s' : '40s';
            
            track.style.animation = 'none';
            track.offsetHeight; // Trigger reflow
            track.style.animation = `${animationName} ${duration} linear infinite`;
        }
    }
}

/**
 * ═══════════════════════════════════════════════════════
 * ANIMACIÓN DE ESCRITURA SUAVE PARA LA CARTA
 * ═══════════════════════════════════════════════════════
 */
function initTypingAnimation() {
    const letterSection = document.getElementById('letter');
    if (!letterSection) return;
    
    const typingElements = letterSection.querySelectorAll('.typing-text');
    
    // Configuración - escritura suave y continua
    const charDelay = 25;
    const lineDelay = 500;
    
    // Observer para iniciar animación cuando la carta sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeAllElements();
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(letterSection);
    
    // Función principal de escritura
    function typeAllElements() {
        let totalDelay = 0;
        
        typingElements.forEach((element, index) => {
            const text = element.getAttribute('data-text') || element.textContent;
            const isFirst = index === 0;
            const isSignature = element.classList.contains('signature-text') || 
                               element.classList.contains('signature-name') || 
                               element.classList.contains('signature-date');
            
            // Primera línea sin delay, las demás con delay mayor para firma
            if (!isFirst) {
                totalDelay += isSignature ? lineDelay * 1.5 : lineDelay;
            }
            
            setTimeout(() => {
                typeElement(element, text);
            }, totalDelay);
            
            // Calcular delay basado en longitud del texto
            totalDelay += text.length * charDelay;
        });
    }
    
    // Escribir texto en un elemento
    function typeElement(element, fullText) {
        element.textContent = '';
        element.classList.add('typing');
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < fullText.length) {
                element.textContent += fullText.charAt(charIndex);
                charIndex++;
                // Velocidad variable para efecto natural
                const speed = charDelay + Math.random() * 10;
                setTimeout(typeChar, speed);
            } else {
                // Escritura completa - remover clase typing
                element.classList.remove('typing');
                element.classList.add('typing-complete');
            }
        }
        
        typeChar();
    }
}

/**
 * ═══════════════════════════════════════════════════════
 * CONTADOR DE TIEMPO JUNTOS
 * ═══════════════════════════════════════════════════════
 */
function initCounter() {
    const startDate = new Date('2025-09-06T00:00:00');
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    function calculateTimePassed() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }
    
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }
    
    let animated = false;
    const counterSection = document.getElementById('counter');
    
    function checkCounterVisibility() {
        if (!animated && counterSection) {
            const rect = counterSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animated = true;
                const time = calculateTimePassed();
                
                animateCounter(daysEl, time.days, 1500);
                setTimeout(() => animateCounter(hoursEl, time.hours, 1200), 200);
                setTimeout(() => animateCounter(minutesEl, time.minutes, 900), 400);
                setTimeout(() => animateCounter(secondsEl, time.seconds, 600), 600);
            }
        }
    }
    
    function updateCounter() {
        const time = calculateTimePassed();
        if (daysEl) daysEl.textContent = formatNumber(time.days);
        if (hoursEl) hoursEl.textContent = formatNumber(time.hours);
        if (minutesEl) minutesEl.textContent = formatNumber(time.minutes);
        if (secondsEl) secondsEl.textContent = formatNumber(time.seconds);
    }
    
    window.addEventListener('scroll', checkCounterVisibility);
    setInterval(updateCounter, 1000);
    checkCounterVisibility();
}

/**
 * ═══════════════════════════════════════════════════════
 * MICRO-INTERACCIONES
 * ═══════════════════════════════════════════════════════
 */
function initMicroInteractions() {
    // Efecto ripple en botones
    const buttons = document.querySelectorAll('.slider-arrow, .slider-dot');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: inherit;
                animation: ripple 0.6s ease-out;
                transform: scale(0);
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Agregar estilos de ripple
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Efecto tilt en tarjetas (excluyendo letter-paper para que no se mueva al pasar el mouse)
    const cards = document.querySelectorAll('.timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Efecto shine en hover de elementos
    const shineElements = document.querySelectorAll('.counter-unit, .gallery-item');
    
    shineElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════
 * LIGHTBOX PARA GALERÍA
 * ═══════════════════════════════════════════════════════
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Crear lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="" class="lightbox-image">
            <p class="lightbox-caption"></p>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('.gallery-image');
            const caption = item.querySelector('.caption-text');
            
            if (image) {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightboxCaption.textContent = caption ? caption.textContent : '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/**
 * ═══════════════════════════════════════════════════════
 * ANIMACIONES DE TEXTO ADICIONALES
 * ═══════════════════════════════════════════════════════
 */
function initTextAnimations() {
    // Animación de palabras en títulos
    const titles = document.querySelectorAll('.hero-title, .counter-title, .gallery-title, .timeline-title, .letter-title');
    
    titles.forEach(title => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(title);
    });
    
    // Efecto de escritura en el hero (opcional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let charIndex = 0;
                    function typeChar() {
                        if (charIndex < originalText.length) {
                            heroSubtitle.textContent += originalText.char(charIndex);
                            charIndex++;
                            setTimeout(typeChar, 50);
                        }
                    }
                    typeChar();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroSubtitle);
    }
    
    // Animación de líneas decorativas
    const dividers = document.querySelectorAll('.name-divider, .separator-line');
    
    dividers.forEach(divider => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'lineDraw 1s ease forwards';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(divider);
    });
}

/**
 * ═══════════════════════════════════════════════════════
 * CLASE DE UTILIDAD PARA SCROLL
 * ═══════════════════════════════════════════════════════
 */
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ocultar/mostrar elementos según scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrollTop > 300) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

/**
 * ═══════════════════════════════════════════════════════
 * PREVENCIÓN DE ERRORES
 * ═══════════════════════════════════════════════════════
 */
window.addEventListener('error', function(e) {
    console.log('Error capturado:', e.message);
});
