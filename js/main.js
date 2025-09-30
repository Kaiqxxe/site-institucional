/**
 * Main JavaScript file for Visão Informática website
 * Single Page Application (SPA) with dynamic content loading
 */

class VisaoInformatica {
    constructor() {
        this.currentPage = 'home';
        this.loadedPages = new Set(['home']);
        
        // Bind methods
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.initNavigation();
        this.initSPA();
        this.initInteractiveFeatures();
        console.log("Visão Informática SPA loaded successfully!");
    }

    /**
     * Load HTML components dynamically
     */
    async loadComponents() {
        const components = [
            { selector: '#header-placeholder', file: 'components/header.html' },
            { selector: '#footer-placeholder', file: 'components/footer.html' },
            { selector: '#contact-placeholder', file: 'components/contact.html' }
        ];

        for (const component of components) {
            await this.loadComponent(component.selector, component.file);
        }
    }

    /**
     * Load individual component
     */
    async loadComponent(selector, file) {
        try {
            const element = document.querySelector(selector);
            if (element) {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                }
            }
        } catch (error) {
            console.warn(`Could not load component ${file}:`, error);
        }
    }

    /**
     * Initialize Single Page Application
     */
    initSPA() {
        // Handle navigation clicks
        document.addEventListener('click', this.handleNavClick);

        // Handle browser back/forward buttons
        window.addEventListener('popstate', this.handlePopState);

        // Set initial state
        history.replaceState({ page: 'home' }, '', '#home');
    }

    /**
     * Handle navigation clicks
     */
    handleNavClick(e) {
        const link = e.target.closest('a[data-page]');
        if (link) {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            this.navigateToPage(page);
            return;
        }

        // Handle hash links for navigation
        const hashLink = e.target.closest('a[href^="#"]');
        if (hashLink && hashLink.getAttribute('href').match(/^#(home|planos|sobre)$/)) {
            e.preventDefault();
            const page = hashLink.getAttribute('href').substring(1);
            this.navigateToPage(page);
        }
    }

    /**
     * Handle browser history changes
     */
    handlePopState(e) {
        const page = e.state?.page || 'home';
        this.navigateToPage(page, false);
    }

    /**
     * Navigate to a specific page
     */
    async navigateToPage(page, addToHistory = true) {
        if (page === this.currentPage) return;

        // Hide all page contents
        document.querySelectorAll('.page-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // Show target page content
        const targetContent = document.getElementById(`${page}-content`);
        if (targetContent) {
            // Load content if not already loaded
            if (page !== 'home' && targetContent.innerHTML.trim() === '') {
                await this.loadPageContent(page);
            }
            
            // Show only the selected page content
            targetContent.style.display = 'block';
            targetContent.classList.add('active');
            this.currentPage = page;

            // Update navigation
            this.setActiveNavItem(page);

            // Update URL and history
            if (addToHistory) {
                history.pushState({ page }, '', `#${page}`);
            }

            // Update page title
            this.updatePageTitle(page);

            // Scroll to top
            window.scrollTo(0, 0);

            // Reinitialize components for the new page
            setTimeout(() => {
                this.initContactSection();
                if (page === 'sobre') {
                    new ServicesManager();
                }
            }, 100);
        }
    }

    /**
     * Load page content dynamically
     */
    async loadPageContent(page) {
        try {
            const response = await fetch(`pages/${page}-content.html`);
            if (response.ok) {
                const content = await response.text();
                const targetContent = document.getElementById(`${page}-content`);
                targetContent.innerHTML = content;

                // Load contact component for the page
                await this.loadComponent(`#contact-placeholder-${page}`, 'components/contact.html');
            }
        } catch (error) {
            console.error(`Error loading ${page} content:`, error);
        }
    }

    /**
     * Update page title based on current page
     */
    updatePageTitle(page) {
        const titles = {
            'home': 'Visão Informática',
            'planos': 'Planos - Visão Informática',
            'sobre': 'Sobre - Visão Informática'
        };
        document.title = titles[page] || titles['home'];
    }



    /**
     * Get current page name from URL
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    /**
     * Set active navigation item
     */
    setActiveNavItem(currentPage) {
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link[data-page]');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === currentPage) {
                    link.classList.add('active');
                }
            });
        }, 100);
    }

    /**
     * Initialize interactive features
     */
    initInteractiveFeatures() {
        this.initSmoothScrolling();
        this.initContactSection();
        this.initServicesCarousel();
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    /**
     * Customize contact section based on page
     */
    initContactSection() {
        setTimeout(() => {
            // Find all contact sections (main and page-specific)
            const contactSections = [
                document.getElementById('contact-title'),
                document.querySelector('#contact-placeholder-planos #contact-title'),
                document.querySelector('#contact-placeholder-sobre #contact-title')
            ].filter(Boolean);

            const customizations = {
                'planos': {
                    title: 'Pronto para Começar?',
                    subtitle: 'Entre em contato conosco e escolha o plano ideal para suas necessidades',
                    whatsappText: 'Olá! Gostaria de saber mais sobre os planos.'
                },
                'sobre': {
                    title: 'Entre em Contato',
                    subtitle: 'Estamos prontos para atender suas necessidades em tecnologia',
                    whatsappText: 'Olá! Gostaria de conhecer mais sobre a Visão Informática.'
                },
                'home': {
                    title: 'Entre em Contato',
                    subtitle: 'Fale conosco para saber mais sobre nossos serviços',
                    whatsappText: 'Olá! Gostaria de conhecer os serviços da Visão Informática.'
                }
            };

            const config = customizations[this.currentPage] || customizations['home'];
            
            // Update all contact sections
            contactSections.forEach(section => {
                if (section) {
                    const container = section.closest('.contact-section');
                    if (container) {
                        const title = container.querySelector('#contact-title, [id*="contact-title"]');
                        const subtitle = container.querySelector('#contact-subtitle, [id*="contact-subtitle"]');
                        const whatsappBtn = container.querySelector('#whatsapp-btn, [id*="whatsapp-btn"]');

                        if (title) title.textContent = config.title;
                        if (subtitle) subtitle.textContent = config.subtitle;
                        if (whatsappBtn) {
                            const whatsappUrl = `https://api.whatsapp.com/send?phone=556934517869&text=${encodeURIComponent(config.whatsappText)}`;
                            whatsappBtn.setAttribute('href', whatsappUrl);
                        }
                    }
                }
            });
        }, 300);
    }

    /**
     * Initialize services carousel
     */
    initServicesCarousel() {
        // Handle service navigation clicks
        document.addEventListener('click', (e) => {
            const serviceBtn = e.target.closest('.service-nav-btn');
            if (serviceBtn) {
                const service = serviceBtn.getAttribute('data-service');
                this.showService(service);
            }
        });
    }

    /**
     * Show specific service content
     */
    showService(serviceId) {
        // Remove active class from all buttons
        document.querySelectorAll('.service-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        const activeBtn = document.querySelector(`[data-service="${serviceId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Hide all service contents
        document.querySelectorAll('.service-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show selected service content
        const activeContent = document.getElementById(serviceId);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }
}


// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new VisaoInformatica();
    
    // Initialize services manager only on sobre.html
    if (window.location.pathname.includes('sobre.html')) {
        new ServicesManager();
    }
});