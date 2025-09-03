function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        }
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== MODAL FUNCTIONALITY =====

/**
 * Abre o modal de contato
 */
function openModal() {
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById('modal-backdrop');
    
    // Previne scroll do body
    document.body.style.overflow = 'hidden';
    
    // Ativa backdrop primeiro
    backdrop.classList.add('active');
    
    // Ativa modal com delay para animação suave
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus no primeiro input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 300);
}

/**
 * Fecha o modal de contato
 */
function closeModal() {
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById('modal-backdrop');
    
    // Remove classes ativas
    modal.classList.remove('active');
    backdrop.classList.remove('active');
    
    // Restaura scroll do body
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
}

/**
 * Trata o envio do formulário
 * @param {Event} event - Evento de submit do formulário
 */
function handleSubmit(event) {
    event.preventDefault();
    
    // Coleta dados do formulário
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simulação de envio (aqui você integraria com seu backend)
    console.log('Dados do formulário:', data);
    
    // Feedback visual
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'ENVIANDO...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simula processamento
    setTimeout(() => {
        submitButton.textContent = 'MENSAGEM ENVIADA!';
        submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitButton.style.opacity = '1';
        
        // Reset após feedback
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            submitButton.style.opacity = '';
            
            // Limpa formulário
            event.target.reset();
            
            // Fecha modal
            closeModal();
            
            // Mostra agradecimento
            showThankYou();
        }, 2000);
    }, 1500);
}

/**
 * Mostra mensagem de agradecimento
 */
function showThankYou() {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 1.25rem 2rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            font-weight: 600;
            font-size: 0.875rem;
            letter-spacing: 0.02em;
            animation: slideInRight 0.5s ease-out;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        ">
            ✓ OBRIGADO! ENTRAREMOS EM CONTATO EM BREVE.
        </div>
    `;
    
    // Adiciona ao DOM
    document.body.appendChild(notification);
    
    // Remove após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// ===== SMOOTH SCROLLING =====

/**
 * Adiciona smooth scrolling para links âncora
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

/**
 * Configura animações quando elementos entram na viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .about-content, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        observer.observe(element);
    });
}

// ===== PARALLAX EFFECT =====

/**
 * Adiciona efeito parallax sutil
 */
function initParallaxEffect() {
    const heroVisual = document.querySelector('.hero-visual');
    const aboutVisual = document.querySelector('.about-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        if (aboutVisual) {
            aboutVisual.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
}

// ===== KEYBOARD NAVIGATION =====

/**
 * Adiciona suporte para navegação por teclado
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Fechar modal com ESC
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
        
        // Enter nos CTAs
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });
}

// ===== CURSOR EFFECT =====

/**
 * Adiciona efeito de cursor customizado
 */
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    
    // Só ativa em desktop
    if (window.innerWidth > 1024) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Efeito hover em elementos interativos
        const interactiveElements = document.querySelectorAll('button, a, input, textarea');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 212, 255, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 212, 255, 0.5)';
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Lazy loading para elementos pesados
 */
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                observer.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => observer.observe(element));
}

// ===== INICIALIZAÇÃO =====

/**
 * Inicializa todas as funcionalidades quando o DOM estiver carregado
 */
function init() {
    initNavScrollEffect();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initKeyboardNavigation();
    initCursorEffect();
    initLazyLoading();
    
    console.log('🚀 Landing page minimalista carregada com sucesso!');
}

// ===== CSS ANIMATIONS ADICIONAIS =====

// Adiciona CSS animations dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Aguarda o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== RESIZE HANDLER =====

/**
 * Otimiza performance em redimensionamento
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinicializa cursor effect se necessário
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            if (window.innerWidth <= 1024) {
                cursor.style.display = 'none';
            } else {
                cursor.style.display = 'block';
            }
        }
    }, 250);
});