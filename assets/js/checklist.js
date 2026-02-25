/* ==========================================
   CHECKLIST.JS — CI/CD Security Gate
   ========================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'securityGateChecklist';

    const checklistItems = [
        { id: 'chk-1', text: 'Configurar export automático de source code via LifeTime API v2', detail: 'Agendar chamadas periódicas ao endpoint /sourcecode para cada aplicação crítica' },
        { id: 'chk-2', text: 'Integrar SonarQube (ou Checkmarx/Veracode) no pipeline CI/CD', detail: 'Adicionar step de SAST no Azure DevOps / GitHub Actions após o export' },
        { id: 'chk-3', text: 'Definir Quality Gate mínimo (zero Critical/High)', detail: 'Configurar critérios de bloqueio: 0 Critical, 0 High, < 5 Medium' },
        { id: 'chk-4', text: 'Configurar notificações de falha de security gate', detail: 'Integrar Slack/Teams/Email para alertar equipe quando gate falhar' },
        { id: 'chk-5', text: 'Criar regras customizadas para padrões OutSystems', detail: 'Regras para BPTs, extensões C#, Advanced Queries e Site Properties' },
        { id: 'chk-6', text: 'Mapear vulnerabilidades de código exportado para Service Studio', detail: 'Documentar correlação entre findings do SAST e elementos visuais no IDE' },
        { id: 'chk-7', text: 'Documentar processo de remediação e SLAs', detail: 'Critical: 24h, High: 72h, Medium: 2 semanas, Low: próximo sprint' },
        { id: 'chk-8', text: 'Agendar scans periódicos e revisão de resultados', detail: 'Weekly scan automático + revisão mensal com equipe de segurança' }
    ];

    function loadCheckedItems() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }

    function saveCheckedItems(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch { /* ignore */ }
    }

    function getProgress(checked) {
        const total = checklistItems.length;
        const done = Object.values(checked).filter(Boolean).length;
        return { done, total, percent: Math.round((done / total) * 100) };
    }

    function updateProgressBar(checked) {
        const { done, total, percent } = getProgress(checked);
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-text');
        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = `${done}/${total} concluídos (${percent}%)`;

        // Badge
        const badge = document.getElementById('progress-badge');
        if (badge) {
            if (percent === 100) {
                badge.className = 'badge badge-green';
                badge.textContent = '✅ GATE PRONTO';
            } else if (percent >= 50) {
                badge.className = 'badge badge-yellow';
                badge.textContent = '⚠️ EM PROGRESSO';
            } else {
                badge.className = 'badge badge-red';
                badge.textContent = '🔴 PENDENTE';
            }
        }
    }

    function renderChecklist() {
        const container = document.getElementById('checklist-container');
        if (!container) return;

        const checked = loadCheckedItems();

        container.innerHTML = '';

        checklistItems.forEach(item => {
            const isChecked = checked[item.id] || false;

            const div = document.createElement('div');
            div.className = 'checklist-item';
            div.setAttribute('role', 'checkbox');
            div.setAttribute('aria-checked', isChecked);
            div.setAttribute('tabindex', '0');

            div.innerHTML = `
        <input type="checkbox" class="checklist-checkbox"
               id="${item.id}"
               ${isChecked ? 'checked' : ''}
               aria-label="${item.text}">
        <div>
          <label for="${item.id}" class="checklist-label ${isChecked ? 'checked' : ''}" style="cursor:pointer; display:block;">
            ${item.text}
          </label>
          <p style="font-size: 0.78rem; color: #888; margin-top: 4px; font-family: 'Inter', sans-serif;">
            ${item.detail}
          </p>
        </div>
      `;

            const checkbox = div.querySelector('input');
            const label = div.querySelector('.checklist-label');

            checkbox.addEventListener('change', () => {
                const items = loadCheckedItems();
                items[item.id] = checkbox.checked;
                saveCheckedItems(items);
                label.classList.toggle('checked', checkbox.checked);
                div.setAttribute('aria-checked', checkbox.checked);
                updateProgressBar(items);
            });

            // Keyboard support
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });

            container.appendChild(div);
        });

        updateProgressBar(checked);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderChecklist);
    } else {
        renderChecklist();
    }
})();
