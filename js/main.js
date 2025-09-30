/**
 * Main JavaScript file for Visão Informática website
 * Single Page Application (SPA) with dynamic content loading
 */

class VisaoInformatica {
    constructor() {
        this.currentPage = 'home';
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
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            }

            // Handle hash links for navigation
            const hashLink = e.target.closest('a[href^="#"]');
            if (hashLink && hashLink.getAttribute('href').match(/^#(home|planos|sobre)$/)) {
                e.preventDefault();
                const page = hashLink.getAttribute('href').substring(1);
                this.navigateToPage(page);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });

        // Set initial state
        history.replaceState({ page: 'home' }, '', '#home');
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
     * Initialize navigation features
     */
    initNavigation() {
        // Navigation will be handled by SPA
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
}

// Services functionality for sobre.html
class ServicesManager {
    constructor() {
        this.services = {
            computadores: {
                title: "Computadores",
                image: "https://copilot.microsoft.com/th/id/BCO.88e33247-b138-4d1b-ac10-9c51aca20d63.png",
                content: `<strong>Assistência técnica completa em computadores:</strong>
                          <ul class="mt-2">
                            <li>Formatação e reinstalação do sistema</li>
                            <li>Upgrades de hardware (memória, HD, SSD)</li>
                            <li>Montagem personalizada</li>
                            <li>Manutenção preventiva e limpeza</li>
                            <li>Diagnóstico e reparo de problemas</li>
                          </ul>`
            },
            notebooks: {
                title: "Notebooks",
                image: "https://copilot.microsoft.com/th/id/BCO.f2b48056-d88b-425c-bfee-83ad951999e6.png",
                content: `<strong>Serviços especializados para notebooks:</strong>
                          <ul class="mt-2">
                            <li>Troca de tela, teclado e touchpad</li>
                            <li>Limpeza interna e troca de pasta térmica</li>
                            <li>Otimização de desempenho</li>
                            <li>Reparo de conectores e portas</li>
                            <li>Suporte técnico especializado</li>
                          </ul>`
            },
            nobreaks: {
                title: "Nobreaks",
                image: "https://copilot.microsoft.com/th/id/BCO.0dd0e0d7-049e-4321-bf92-7054f6818089.png",
                content: `<strong>Manutenção completa em nobreaks:</strong>
                          <ul class="mt-2">
                            <li>Troca de bateria e teste de autonomia</li>
                            <li>Reparos eletrônicos e calibração</li>
                            <li>Testes de carga e estabilização</li>
                            <li>Limpeza e manutenção preventiva</li>
                            <li>Suporte técnico especializado</li>
                          </ul>`
            },
            impressoras: {
                title: "Impressoras",
                image: "https://copilot.microsoft.com/th/id/BCO.694ef720-2af9-43db-9b6a-b8cf1ae0e531.png",
                content: `<strong>Assistência em impressoras jato de tinta e laser:</strong>
                          <ul class="mt-2">
                            <li>Reparo de mecanismos e sensores</li>
                            <li>Troca de peças e componentes</li>
                            <li>Configuração e instalação</li>
                            <li>Limpeza completa dos cabeçotes</li>
                            <li>Manutenção preventiva</li>
                          </ul>`
            }
        };

        // Make methods available globally for onclick handlers
        window.showService = this.showService.bind(this);
        window.closeService = this.closeService.bind(this);
    }

    showService(serviceKey) {
        const service = this.services[serviceKey];
        if (!service) return;

        const titleElement = document.getElementById("serviceTitle");
        const contentElement = document.getElementById("serviceContent");
        const imageElement = document.getElementById("serviceImage");
        const boxElement = document.getElementById("serviceBox");
        const buttonsElement = document.getElementById("servicesButtons");

        if (titleElement) titleElement.textContent = service.title;
        if (contentElement) contentElement.innerHTML = service.content;
        if (imageElement) {
            imageElement.src = service.image;
            imageElement.alt = service.title;
        }

        if (boxElement) boxElement.classList.add("active");
        if (buttonsElement) buttonsElement.classList.add("collapsed");
    }

    closeService() {
        const boxElement = document.getElementById("serviceBox");
        const buttonsElement = document.getElementById("servicesButtons");

        if (boxElement) boxElement.classList.remove("active");
        if (buttonsElement) buttonsElement.classList.remove("collapsed");
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