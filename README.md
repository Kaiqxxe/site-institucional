# 🖥️ Visão Informática - Site Institucional

Site institucional moderno da Visão Informática, empresa especializada em assistência técnica e manutenção de equipamentos de informática em Pimenta Bueno/RO.

## 📋 Sobre o Projeto

Site desenvolvido como Single Page Application (SPA) com arquitetura de componentes, seguindo as melhores práticas de desenvolvimento web front-end.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Variáveis CSS, Flexbox, Grid, Gradientes
- **JavaScript ES6+**: Classes, Async/Await, Módulos
- **Bootstrap 5.3.3**: Framework CSS responsivo
- **Bootstrap Icons**: Biblioteca de ícones

## 🎯 Características Principais

- ✅ **Single Page Application (SPA)** com navegação fluida
- ✅ **Arquitetura de Componentes** reutilizáveis
- ✅ **Design Responsivo** para todos os dispositivos
- ✅ **Performance Otimizada** com carregamento dinâmico
- ✅ **SEO Friendly** com meta tags otimizadas
- ✅ **Acessibilidade** seguindo padrões WCAG

## 🚀 Melhorias Implementadas (Refatoração)

### ✅ Componentes Reutilizáveis

- **Header/Navbar**: Componente único para navegação em todas as páginas
- **Footer**: Rodapé padronizado reutilizável
- **Seção de Contato**: Componente dinâmico que se adapta ao contexto de cada página
- **Scripts e CSS**: Centralizados para fácil manutenção

### ✅ CSS Otimizado

- **Variáveis CSS**: Cores, espaçamentos e transições centralizadas
- **Classes Utilitárias**: `.section-bg-light`, `.section-bg-transparent` para backgrounds
- **Organização por Seções**: Navegação, Botões, Layout, Footer, etc.
- **Responsividade Melhorada**: Media queries otimizadas
- **Remoção de Duplicações**: Estilos inline convertidos para classes reutilizáveis

### ✅ JavaScript Modular

- **Classe Principal**: `VisaoInformatica` para gerenciar funcionalidades globais
- **Carregamento Dinâmico**: Componentes HTML carregados via JavaScript
- **Navegação Inteligente**: Destaque automático da página atual
- **Gerenciador de Serviços**: Classe específica para funcionalidades da página "Sobre"
- **Customização Contextual**: Seção de contato se adapta ao conteúdo de cada página

### ✅ Estrutura de Arquivos

```
├── components/
│   ├── header.html      # Navegação reutilizável
│   ├── footer.html      # Rodapé reutilizável
│   ├── contact.html     # Seção de contato dinâmica
│   ├── head.html        # Meta tags e CSS
│   └── scripts.html     # Scripts JS
├── css/
│   └── style.css        # CSS otimizado e organizado
├── js/
│   └── main.js          # JavaScript modular e reutilizável
├── img/                 # Imagens do site
├── index.html           # Página inicial
├── planos.html          # Página de planos
├── sobre.html           # Página sobre a empresa
└── README.md            # Esta documentação
```

## 🎯 Benefícios da Refatoração

### Manutenibilidade

- **DRY (Don't Repeat Yourself)**: Código duplicado foi eliminado
- **Componentes**: Mudanças no header/footer/contato afetam todas as páginas automaticamente
- **CSS Centralizado**: Alterações de estilo são feitas em um único lugar

### Performance

- **CSS Otimizado**: Menos código, melhor performance
- **JavaScript Eficiente**: Carregamento sob demanda e funcionalidades modulares
- **Reutilização**: Componentes carregados uma vez, usados em múltiplas páginas

### Escalabilidade

- **Fácil Adição de Páginas**: Nova página usa os mesmos componentes
- **Customização**: Cada página pode personalizar componentes conforme necessário
- **Padrões Consistentes**: Interface uniforme em todo o site

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis e flexbox
- **JavaScript ES6+**: Classes, async/await, fetch API
- **Bootstrap 5.3.3**: Framework CSS responsivo
- **Bootstrap Icons**: Ícones vetoriais

## 🚀 Como Executar

1. Clone o repositório
2. Execute um servidor local:
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000`

## 📱 Funcionalidades

- **Responsivo**: Adapta-se a todos os dispositivos
- **Navegação Dinâmica**: Item ativo destacado automaticamente
- **Componentes Interativos**: Serviços expandíveis na página "Sobre"
- **Integração WhatsApp**: Links diretos com mensagens personalizadas
- **Carrossel de Imagens**: Galeria interativa
- **Formulários de Contato**: Integração com WhatsApp

**Desenvolvido com ❤️ para Visão Informática**
