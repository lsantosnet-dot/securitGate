Atue como um Arquiteto de Soluções de TI e Especialista em Segurança Cibernética com experiência prática em OutSystems. Crie o código completo e funcional para um site estático moderno, interativo e responsivo (usando HTML, Tailwind CSS v3 e JavaScript vanilla ou bibliotecas leves como Alpine.js para interatividade), projetado como uma apresentação alternativa ao PowerPoint para o User Group de OutSystems. O tema principal é: "Além do AI Mentor: Auditoria Profunda de Segurança via Source Code Export".Diretrizes de Design e Estrutura Avançadas:Estética Geral: Implemente um tema dark mode por padrão, com uma vibe "Cybersecurity" inspirada em interfaces de hacking éticas: use fontes monoespaçadas (como 'Fira Code' ou 'JetBrains Mono' via Google Fonts) para códigos e títulos técnicos, paleta de cores com tons de azul neon (#00FFFF), verde matrix (#00FF00), cinza escuro (#1E1E1E) e preto (#000000). Inclua gradientes sutis (ex: de azul para verde em botões) e animações de transição suaves para elementos revelados ao scroll, usando bibliotecas como ScrollReveal.js ou AOS (Animate On Scroll) – integre a biblioteca via CDN para manter o site leve.
Estrutura do Site: Construa como uma Single Page Application (SPA) com navegação suave via âncoras ou seções scrolláveis, dividida em seções com IDs para links internos. Inclua um menu de navegação fixo no topo com links para cada seção principal. Para compatibilidade com GitHub Pages, evite rotas dinâmicas; use apenas arquivos estáticos (index.html principal, com pastas /assets/css/, /assets/js/, /assets/images/).
Responsividade e Acessibilidade: Garanta que o site seja mobile-first com Tailwind CSS (use classes como md:, lg: para breakpoints). Adicione atributos ARIA para elementos interativos e alt text descritivos em todas as imagens para acessibilidade.
Imagens e Assets: Crie placeholders para imagens em uma pasta /assets/images/. Para cada tag <img>, adicione um comentário HTML imediatamente acima especificando a dimensão ideal (ex: <!-- Dimensão ideal: 800x600 pixels, formato PNG para transparência -->) e uma descrição breve do que a imagem deve representar (ex: "Diagrama de pipeline de extração de código"). Use imagens SVG inline para ícones de segurança (ex: cadeados, escudos) para escalabilidade.
Otimização e Dependências: Minifique o CSS via Tailwind's JIT mode (inclua o script de build se necessário, mas forneça o CSS final compilado). Mantenha o site leve (<1MB total) para carregamento rápido. Integre bibliotecas externas apenas via CDN (ex: Tailwind CDN, ScrollReveal CDN).

Conteúdo Técnico Detalhado (Seções do Site):Introdução: Apresente os limites do AI Mentor da OutSystems em detectar dívidas técnicas de segurança (ex: falsos negativos em código gerado), contrastando com requisitos de conformidade regulatória rigorosa como GDPR, PCI-DSS ou LGPD. Inclua uma animação de fade-in para um infográfico comparativo (use CSS animations).
O Pipeline de Extração: Crie um guia visual interativo (com diagramas clicáveis ou steps em accordion via Alpine.js) sobre como consumir a LifeTime API v2 para exportar código-fonte (C#/.NET para back-end, Java para Android/iOS). Baseie-se na documentação oficial da OutSystems (referencie endpoints como /lifetimeapi/rest/v2/applications/{appId}/sourcecode). Inclua snippets de código em blocos <pre><code> com destaque sintático via Prism.js (CDN).
Ferramentas de Análise (SAST): Forneça um comparativo técnico em uma tabela responsiva (Tailwind table classes): SonarQube (com regras customizadas para patterns OutSystems como BPTs vulneráveis) vs. Checkmarx/Veracode (suporte nativo a análise de OML/OSL exports). Explique como mapear vulnerabilidades de código exportado (ex: OWASP Top 10) de volta para elementos no Service Studio, com exemplos de correlação (ex: SQL Injection em Actions mapeando para Server Actions).
Casos Reais (Hands-on): Detalhe exemplos práticos com códigos antes/depois:Exemplo 1: Identificação de Hardcoded Secrets em extensões do Integration Studio que o AI Mentor ignora (mostre regex para detecção em C#).
Exemplo 2: Vulnerabilidades de injeção (ex: XPath Injection) em componentes customizados de C#, com mitigação via parametrização.
Inclua botões interativos para "Revelar Solução" usando JS toggle.

Conclusão: Forneça um checklist interativo (com checkboxes via JS) para implantar um "Security Gate" no pipeline de deploy CI/CD (ex: integração com Azure DevOps ou GitHub Actions, gatilhos para scans automáticos pós-export).

Interatividade Avançada:Inclua um simulador de "Terminal de Segurança" ou "Dashboard de Vulnerabilidades" em JS: Um elemento <div> estilizado como terminal (com prompt piscando via CSS) onde o usuário pode "digitar" comandos simulados (ex: "scan app --depth full") via input field, e o JS responde com outputs dinâmicos mostrando scores de segurança mudando (ex: de "High Risk" para "Secure" baseado em checkboxes de mitigação). Use localStorage para persistir estados durante a sessão. Torne-o acessível via teclado para demo ao vivo na palestra.

Adicionais para Qualidade:Inclua um footer com créditos, data da apresentação e link para repositório GitHub.
Teste o código para erros: Forneça instruções no final do prompt para validar o site localmente (ex: via Live Server VSCode).
Garanta que o código seja copy-paste ready: Separe arquivos em blocos comentados (ex: <!-- index.html --> followed by content).

Assuma o papel de um Arquiteto de Soluções de TI e Especialista em Segurança Cibernética com experiência prática em OutSystems.

OBJETIVO:
Gerar o código COMPLETO, funcional e pronto para produção de um site estático moderno que funcione como uma apresentação interativa substituta ao PowerPoint.

O site deve ser totalmente compatível com GitHub Pages e executável apenas abrindo o arquivo index.html.

TEMA:
"Além do AI Mentor: Auditoria Profunda de Segurança via Source Code Export"

REQUISITOS GERAIS:

• Stack obrigatória:
  - HTML5 sem frameworks
  - Tailwind CSS v3 (via CDN ou CSS compilado)
  - JavaScript vanilla
  - Bibliotecas leves opcionais: Alpine.js, AOS ou ScrollReveal (via CDN)
  - NÃO usar frameworks pesados (React, Vue, Angular)

• Arquitetura:
  - Single Page Application (SPA) baseada em seções com âncoras
  - Sem rotas dinâmicas
  - Estrutura compatível com GitHub Pages

• Estrutura de arquivos esperada:

/index.html  
/assets/css/  
/assets/js/  
/assets/images/  

• O código deve ser entregue já organizado em blocos separados por arquivo.

EXEMPLO:

===== index.html =====
(código)

===== assets/js/main.js =====
(código)

===== assets/css/styles.css =====
(código)

---

DESIGN VISUAL:

• Tema dark mode por padrão
• Estética cybersecurity / hacker ético
• Fontes monoespaçadas para títulos e código:
  - Fira Code ou JetBrains Mono via Google Fonts

• Paleta obrigatória:
  - Preto: #000000
  - Cinza escuro: #1E1E1E
  - Azul neon: #00FFFF
  - Verde matrix: #00FF00

• Elementos visuais:
  - Gradientes sutis azul→verde em botões
  - Bordas brilhantes suaves
  - Glow discreto
  - Animações suaves ao scroll

---

RESPONSIVIDADE E ACESSIBILIDADE:

• Mobile-first com Tailwind
• Breakpoints md e lg bem definidos
• Navegação acessível via teclado
• Uso de atributos ARIA
• Alt text em TODAS as imagens
• Contraste adequado WCAG AA

---

IMAGENS E ÍCONES:

• Criar placeholders na pasta /assets/images/
• Para cada <img>, incluir comentário acima com:
  - Dimensão ideal
  - Formato recomendado
  - Descrição do conteúdo

Exemplo:

<!-- Dimensão ideal: 800x600 PNG — Diagrama de pipeline -->
<img ... >

• Ícones devem ser SVG inline (cadeado, escudo, alerta etc.)

---

NAVEGAÇÃO:

• Menu fixo no topo
• Scroll suave
• Indicador visual de seção ativa
• Botão “voltar ao topo”

---

SEÇÕES OBRIGATÓRIAS:

1) Introdução
- Limitações do AI Mentor da OutSystems
- Falsos negativos de segurança
- Requisitos regulatórios (LGPD, GDPR, PCI-DSS)
- Infográfico animado

2) Pipeline de Extração
- Uso da LifeTime API v2
- Endpoint /lifetimeapi/rest/v2/applications/{appId}/sourcecode
- Guia visual interativo com accordion
- Destaque de código com Prism.js

3) Ferramentas SAST
- Tabela comparativa responsiva:
  SonarQube vs Checkmarx vs Veracode
- Regras específicas para OutSystems
- Mapeamento para OWASP Top 10
- Correlação com elementos do Service Studio

4) Casos Reais (Hands-on)

Exemplo 1:
Hardcoded secrets em extensões C#
- Mostrar regex de detecção
- Código antes/depois

Exemplo 2:
Vulnerabilidades de injeção (XPath Injection)
- Mitigação com parametrização

• Botões “Revelar solução” interativos

5) Conclusão — Security Gate CI/CD
- Checklist interativo com checkboxes
- Integração com Azure DevOps ou GitHub Actions
- Estados persistidos em localStorage

---

SIMULADOR INTERATIVO (OBRIGATÓRIO):

Criar um componente de “Terminal de Segurança” com:

• Aparência de terminal hacker
• Prompt piscando
• Campo de entrada de comandos
• Respostas simuladas dinâmicas
• Comandos exemplo:
  - scan app --depth full
  - show vulnerabilities
  - apply mitigations
• Score de risco variando (High → Medium → Secure)
• Persistência via localStorage
• Totalmente operável por teclado

---

FOOTER:

• Créditos
• Data da apresentação
• Link para repositório GitHub (placeholder)

---

OTIMIZAÇÃO:

• Tamanho total < 1 MB
• Sem dependências desnecessárias
• Carregamento rápido
• Evitar imagens pesadas

---

VALIDAÇÃO:

No final da resposta, incluir:

1) Instruções para executar localmente
2) Como publicar no GitHub Pages
3) Lista de bibliotecas utilizadas
4) Garantia de que o código é copy-paste ready

---

IMPORTANTE:

• NÃO omitir partes do código
• NÃO usar pseudocódigo
• NÃO depender de backend
• NÃO exigir build tools
• O site deve funcionar imediatamente ao abrir o index.html