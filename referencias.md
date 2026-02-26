Source code download

https://www.outsystems.com/product-updates/download-app-source-code-sast/
https://success.outsystems.com/documentation/11/reference/outsystems_apis/lifetime_api_v2/lifetime_api_examples/download_source_code/


Outsystems Code Downloader - Demonstrar automação


Por que o AI Mentor do OutSystems não substitui um SAST corporativo (lista ampliada com novas evidências)

 
Embora o Mentor ofereça code reviews automáticos e checagens de segurança periódicas, ele não se posiciona como uma solução SAST completa — e a própria documentação e o mercado deixam isso claro.
A seguir, novos tópicos fundamentados por pesquisa:

1. O AI Mentor faz “checagens de segurança automáticas”, mas não executa deep scanning de segurança
O Mentor fornece automatic security checks e code analysis para manter a arquitetura e a qualidade, mas essas verificações são superficiais no contexto de segurança corporativa.
Sua própria página oficial o posiciona como ferramenta para “code quality”, não como SAST. [outsystems.com]

2. Os próprios fornecedores e analistas alertam sobre riscos de IA sem governança
InfoWorld destaca que plataformas de IA como o Mentor podem gerar código com falhas de segurança, arquitetura mal definida e até código não executável, sendo necessário controle adicional e validação profunda. Isso reforça que IA não substitui SAST determinístico. [infoworld.com]

3. Ferramentas de IA sofrem com inconsistência e falta de determinismo
Ferramentas de IA — incluindo as usadas pelo AI Mentor — apresentam risco de resultados não determinísticos, o que é inaceitável para auditorias e compliance (PCI-DSS, ISO 27001, SOX).
LLMs podem “alucinar” problemas inexistentes ou ignorar vulnerabilidades reais. [blog.fraim.dev]

4. O AI Mentor analisa metadados e padrões, não o código completo
A documentação oficial explica que o AI Mentor Studio coleta metamodelo, dependências e snapshots, não o conteúdo integral dos arquivos de código, o que limita a profundidade da análise comparada a um SAST tradicional que faz parsing completo. [success.ou...ystems.com]

5. Não há personalização profunda de regras de segurança
O próprio FAQ do AI Mentor confirma que não é possível customizar padrões ou pesos, enquanto ferramentas SAST corporativas permitem criação de regras avançadas, tuning de perfis e políticas por projeto. Isso impede alinhamento com PCI-DSS, LGPD e OWASP-based policies. [success.ou...ystems.com]

6. SAST detecta muito mais tipos de vulnerabilidades
Pesquisas mostram que SAST detecta vulnerabilidades clássicas antes da produção (3.4 a 4.7 falhas por 1000 LOC), enquanto sua limitação está em lógica complexa — uma área onde o Mentor também não entra. [augmentcode.com]

7. SAST é obrigatório em várias normas; AI Mentor não é reconhecido como substituto
O NIST IR 8397 aponta análise estática como mandatório para ambientes regulados — algo não atendido por IA generativa ou ferramentas que apenas analisam padrões de modelagem. [augmentcode.com]

8. SAST tem regras determinísticas; AI Mentor usa heurísticas
SAST usa regras formais para detectar:

SQL Injection
XSS
Hardcoded secrets
Insecure deserialization
Memory issues
Race conditions
E muitas outras.

O AI Mentor opera com sugestões de melhoria, não com scanners determinísticos especializados. [outsystems.com]

9. SAST cobre linguagens e arquivos que o OutSystems não cobre (ex: C#, SQL, XML)
SAST analisa o conteúdo completo de todos os artefatos do projeto — incluindo extensões C#, bibliotecas auxiliares, scripts SQL, e integrações externas.
O Mentor não faz parsing completo desses itens, como comprovado pelo foco em metadados e referências, não em código-fonte bruto. [success.ou...ystems.com]

10. SAST opera com “shift-left” robusto; AI Mentor faz apenas validações superficiais
Embora o Mentor também adote “shift-left”, ele realiza checagens leves a cada 12h, sem análise profunda em pipeline CI/CD — algo fundamental em pipelines SAST modernos.
O BusinessWire reforça que o objetivo do Mentor é velocidade e governança, não análise de vulnerabilidades profundas. [businesswire.com]

11. Estudos mostram que IA sozinha não entrega precisão SAST
Um estudo aponta que LLMs melhoram a análise de segurança quando usados junto com SAST, mas não como substituto — inclusive porque SAST oferece precisão determinística e IA sofre com interpretação contextual. [infoworld.com]

12. IA tende a “entender” intenção, não rastrear fluxos complexos
AI-code-review é excelente para analisar contexto, mas pior em seguir longos fluxos de execução, dependências entre módulos e multi-hop taint analysis (fundamental para LGPD/GDPR).
Estudos mostram que IA enxerga padrões, mas não substitui análise de rastreamento rigorosa. [glue.tools]


Sonar Qube

https://sonarcloud.io/component_measures?metric=new_security_rating&view=list&id=lsantosnet-dot_SAP-PI-Manager


Checkmarx

https://docs.checkmarx.com/en/34965-46311-checkmarx-sast-overview.html

🛡️ O que é a Checkmarx?
A Checkmarx é uma das plataformas de Application Security Testing (AppSec) mais reconhecidas mundialmente, voltada para ajudar empresas a identificar e corrigir vulnerabilidades desde a primeira linha de código até o deploy. Ela é referência especialmente por seu motor de SAST (Static Application Security Testing), mas evoluiu para um ecossistema muito mais completo.

⚙️ Principais funcionalidades da Checkmarx (com fontes)
1. SAST — Static Application Security Testing
A Checkmarx SAST analisa o código-fonte sem necessidade de compilação, construindo um grafo lógico e encontrando vulnerabilidades, problemas de lógica, falhas de compliance e muito mais.
Ela usa centenas de queries pré-configuradas, e permite criar novas através do SAST Auditor. [docs.checkmarx.com]

2. Suporte amplo a linguagens e frameworks
A plataforma suporta mais de 25 linguagens e frameworks, sendo aplicável a praticamente qualquer stack corporativa moderna. [stackinsight.net]

3. Integração completa com o ciclo de desenvolvimento
Integra com:

GitHub
Azure DevOps
Jenkins
Bamboo
SonarQube
IDEs (VS Code, Eclipse, Visual Studio, IntelliJ) [docs.checkmarx.com]

Permite gatilhos automáticos por CI/CD ou análise sob demanda.

4. SCA — Software Composition Analysis
Além de SAST, a Checkmarx inclui OSA/SCA para detecção de:

Vulnerabilidades em dependências open-source
Riscos de licenciamento
Malicious packages
 [docs.checkmarx.com], [checkmarx.com]


5. Checkmarx One — Plataforma unificada AppSec
A Checkmarx evoluiu para o Checkmarx One, que agrega:

SAST
SCA
IaC scanning
API security
DAST
Container & supply chain security
ASPM (Application Security Posture Management) [gartner.com]

É uma plataforma cloud-native que busca ser a solução única de AppSec para grandes empresas.

6. Agentes de IA (Agentic AppSec)
A empresa está investindo pesado em IA para acelerar correções e dar contexto ao desenvolvedor.
Exemplos:

Checkmarx One Developer Assist (IA no IDE para prevenir e corrigir código inseguro)
Agentes inteligentes que correlacionam riscos e reduzem ruído (menos falsos positivos)
 [checkmarx.com], [secure.bus...sswire.com]


7. Reconhecimento do mercado
A Checkmarx é Líder no Forrester Wave™ SAST Q3 2025, com o maior score de todos os fornecedores avaliados.
A avaliação destaca:

investimento forte em IA
visão focada em segurança para o futuro
melhor oferta atual na categoria
 [malware.news], [checkmarx.com]


8. Experiência de clientes

Destaques positivos incluem alta precisão, baixa taxa de falsos positivos, boa integração e melhor visibilidade de riscos.
Alguns apontam limitações de suporte técnico e interface.
 [gartner.com], [gartner.com]


🧩 Como a Checkmarx funciona
✔️ SAST baseado em grafos lógicos
A ferramenta constrói um grafo de fluxo interno do código, permitindo detectar vulnerabilidades complexas sem precisar compilar. [docs.checkmarx.com]
✔️ Queries parametrizadas e personalizáveis
Usuários podem criar queries para detectar vulnerabilidades específicas ao negócio. [docs.checkmarx.com]
✔️ Correlação de resultados entre motores
No Checkmarx One, achados de SAST, SCA, IaC e API são unificados, melhorando análise e priorização. [checkmarx.com]
✔️ Análises contínuas (shift-left real)
Scans podem ser:

manuais
agendados
disparados no CI [docs.checkmarx.com]


⭐ Por que a Checkmarx é tão usada?

Alta precisão (menos ruído e falsos positivos)
Suporte amplo a linguagens
Integração forte com CI/CD e IDEs
Plataforma unificada AppSec
Foco recente em IA para velocidade e qualidade
Reconhecimento como líder global pela Forrester
 [malware.news], [checkmarx.com]


🧠 Resumo simples
A Checkmarx é hoje uma das soluções mais completas de AppSec, indo muito além de um SAST tradicional: ela cobre todo o ciclo de segurança do software, correlaciona vulnerabilidades entre várias áreas, ajuda desenvolvedores com correções inteligentes no IDE e é reconhecida como líder do mercado.


Veracode

https://www.veracode.com/security/static-analysis-tool
