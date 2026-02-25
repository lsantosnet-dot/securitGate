/* ==========================================
   TERMINAL.JS — Hacker Security Terminal
   ========================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'secTerminal';
    const TYPING_SPEED = 20; // ms per char

    // Terminal state
    let state = loadState();
    let commandHistory = state.history || [];
    let historyIndex = -1;
    let isTyping = false;

    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : { score: 'HIGH', mitigationsApplied: 0, history: [], scanDone: false };
        } catch {
            return { score: 'HIGH', mitigationsApplied: 0, history: [], scanDone: false };
        }
    }

    function saveState() {
        try {
            state.history = commandHistory.slice(-20);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { /* ignore */ }
    }

    // Score badge HTML
    function getScoreBadge() {
        const scores = {
            'HIGH': '<span class="score-indicator score-high">🔴 HIGH RISK</span>',
            'MEDIUM': '<span class="score-indicator score-medium">⚠️ MEDIUM RISK</span>',
            'SECURE': '<span class="score-indicator score-secure">✅ SECURE</span>'
        };
        return scores[state.score] || scores['HIGH'];
    }

    // Vulnerability database
    const vulnerabilities = [
        { id: 'CVE-2024-OS-001', severity: 'CRITICAL', component: 'UserAuth.xif (C#)', description: 'Hardcoded API Key in Integration Studio extension', cwe: 'CWE-798' },
        { id: 'CVE-2024-OS-002', severity: 'HIGH', component: 'DataAccess.cs', description: 'SQL Injection via unparameterized Advanced Query', cwe: 'CWE-89' },
        { id: 'CVE-2024-OS-003', severity: 'HIGH', component: 'XMLProcessor.cs', description: 'XPath Injection in custom C# extension', cwe: 'CWE-643' },
        { id: 'CVE-2024-OS-004', severity: 'MEDIUM', component: 'ConfigManager.cs', description: 'Connection string with embedded credentials', cwe: 'CWE-259' },
        { id: 'CVE-2024-OS-005', severity: 'LOW', component: 'Logger.cs', description: 'Sensitive data logged in plaintext', cwe: 'CWE-532' }
    ];

    // Commands
    const commands = {
        help: () => {
            return `<span class="info">╔══════════════════════════════════════════╗
║      SECURITY TERMINAL — HELP            ║
╠══════════════════════════════════════════╣
║                                          ║
║  scan app --depth full                   ║
║    → Execute deep security scan          ║
║                                          ║
║  show vulnerabilities                    ║
║    → Display detected vulnerabilities    ║
║                                          ║
║  apply mitigations                       ║
║    → Apply security fixes                ║
║                                          ║
║  show score                              ║
║    → Show current risk score             ║
║                                          ║
║  show report                             ║
║    → Generate compliance report          ║
║                                          ║
║  reset                                   ║
║    → Reset terminal state                ║
║                                          ║
║  clear                                  ║
║    → Clear terminal output               ║
║                                          ║
║  help                                    ║
║    → Show this help message              ║
║                                          ║
╚══════════════════════════════════════════╝</span>`;
        },

        'scan app --depth full': () => {
            state.scanDone = true;
            saveState();
            const scanLines = [
                '<span class="info">[SCAN] Initializing LifeTime API v2 connection...</span>',
                '<span class="info">[SCAN] Authenticating with Service Account...</span>',
                '<span class="success">[OK] Connected to environment: Production</span>',
                '<span class="info">[SCAN] Requesting source code export...</span>',
                '<span class="info">[SCAN] Downloading package (12.4 MB)...</span>',
                '<span class="success">[OK] Source code extracted successfully</span>',
                '',
                '<span class="info">[SAST] Running SonarQube analysis...</span>',
                '<span class="info">[SAST] Checking OWASP Top 10 patterns...</span>',
                '<span class="info">[SAST] Scanning for hardcoded secrets...</span>',
                '<span class="info">[SAST] Analyzing taint flow in Server Actions...</span>',
                '',
                '<span class="warning">[!] Analysis complete. Results:</span>',
                '',
                `<span class="error">   CRITICAL : 1 finding(s)</span>`,
                `<span class="error">   HIGH     : 2 finding(s)</span>`,
                `<span class="warning">   MEDIUM   : 1 finding(s)</span>`,
                `<span class="info">   LOW      : 1 finding(s)</span>`,
                '',
                `<span class="warning">   Total: 5 vulnerabilities detected</span>`,
                '',
                `   Current Risk Score: ${getScoreBadge()}`,
                '',
                '<span class="info">   Type "show vulnerabilities" for details.</span>'
            ];
            return scanLines.join('\n');
        },

        'show vulnerabilities': () => {
            if (!state.scanDone) {
                return '<span class="warning">[!] No scan data available. Run "scan app --depth full" first.</span>';
            }
            const severityColors = {
                CRITICAL: 'error',
                HIGH: 'error',
                MEDIUM: 'warning',
                LOW: 'info'
            };
            let output = '<span class="info">╔══════════════════════════════════════════════════════════════════════════╗</span>\n';
            output += '<span class="info">║                    VULNERABILITY REPORT                                ║</span>\n';
            output += '<span class="info">╠══════════════════════════════════════════════════════════════════════════╣</span>\n';

            vulnerabilities.forEach((v, i) => {
                const cls = severityColors[v.severity];
                output += `\n<span class="${cls}">  [${v.severity}] ${v.id}</span>\n`;
                output += `  Component  : ${v.component}\n`;
                output += `  CWE        : ${v.cwe}\n`;
                output += `  Description: ${v.description}\n`;
                if (i < vulnerabilities.length - 1) {
                    output += '  <span class="info">─────────────────────────────────────────────</span>\n';
                }
            });

            output += '\n<span class="info">╚══════════════════════════════════════════════════════════════════════════╝</span>\n';
            output += `\n   Current Risk Score: ${getScoreBadge()}\n`;
            output += '\n<span class="info">   Type "apply mitigations" to fix vulnerabilities.</span>';
            return output;
        },

        'apply mitigations': () => {
            if (!state.scanDone) {
                return '<span class="warning">[!] No scan data. Run "scan app --depth full" first.</span>';
            }

            state.mitigationsApplied++;
            if (state.mitigationsApplied === 1) {
                state.score = 'MEDIUM';
            } else if (state.mitigationsApplied >= 2) {
                state.score = 'SECURE';
            }
            saveState();

            const mitigationSteps = [
                '<span class="info">[FIX] Applying security mitigations...</span>',
                '',
                '<span class="success">[✓] Replacing hardcoded API keys with Azure Key Vault references</span>',
                '<span class="success">[✓] Parameterizing SQL queries in Advanced Queries</span>',
                '<span class="success">[✓] Adding XPath input sanitization in XMLProcessor</span>',
                '<span class="success">[✓] Moving connection strings to encrypted Site Properties</span>',
                '<span class="success">[✓] Implementing structured logging with PII masking</span>',
                '',
                `   Updated Risk Score: ${getScoreBadge()}`,
            ];

            if (state.score === 'SECURE') {
                mitigationSteps.push('');
                mitigationSteps.push('<span class="success">══════════════════════════════════════════</span>');
                mitigationSteps.push('<span class="success">  🏆 ALL VULNERABILITIES MITIGATED!      </span>');
                mitigationSteps.push('<span class="success">  Application is ready for deployment.    </span>');
                mitigationSteps.push('<span class="success">══════════════════════════════════════════</span>');
            } else {
                mitigationSteps.push('');
                mitigationSteps.push('<span class="warning">[!] Some vulnerabilities remain. Run "apply mitigations" again.</span>');
            }

            return mitigationSteps.join('\n');
        },

        'show score': () => {
            return `\n   Current Risk Assessment: ${getScoreBadge()}\n\n   Mitigations Applied: ${state.mitigationsApplied}\n   Scan Performed: ${state.scanDone ? '<span class="success">Yes</span>' : '<span class="warning">No</span>'}\n`;
        },

        'show report': () => {
            if (!state.scanDone) {
                return '<span class="warning">[!] No data. Run "scan app --depth full" first.</span>';
            }
            return `<span class="info">╔══════════════════════════════════════════╗
║       COMPLIANCE REPORT                  ║
╠══════════════════════════════════════════╣</span>

   Application    : MyApp_Production
   Environment    : Production
   Scan Date      : ${new Date().toLocaleDateString('pt-BR')}
   SAST Engine    : SonarQube 10.x + Custom Rules

   <span class="info">── OWASP Top 10 Coverage ──</span>
   A01:Broken Access Control      <span class="success">✓ Checked</span>
   A02:Cryptographic Failures     <span class="success">✓ Checked</span>
   A03:Injection                  <span class="${state.score === 'SECURE' ? 'success' : 'error'}">${state.score === 'SECURE' ? '✓ Mitigated' : '✗ Findings'}</span>
   A04:Insecure Design            <span class="success">✓ Checked</span>
   A05:Security Misconfiguration  <span class="success">✓ Checked</span>
   A07:Auth Failures              <span class="success">✓ Checked</span>
   A08:Software Integrity         <span class="success">✓ Checked</span>
   A09:Logging Failures           <span class="${state.score === 'SECURE' ? 'success' : 'warning'}">${state.score === 'SECURE' ? '✓ Mitigated' : '⚠ Warning'}</span>

   <span class="info">── Compliance ──</span>
   LGPD    : ${state.score === 'SECURE' ? '<span class="success">COMPLIANT</span>' : '<span class="error">NON-COMPLIANT</span>'}
   GDPR    : ${state.score === 'SECURE' ? '<span class="success">COMPLIANT</span>' : '<span class="error">NON-COMPLIANT</span>'}
   PCI-DSS : ${state.score === 'SECURE' ? '<span class="success">COMPLIANT</span>' : '<span class="error">NON-COMPLIANT</span>'}

   Overall: ${getScoreBadge()}

<span class="info">╚══════════════════════════════════════════╝</span>`;
        },

        reset: () => {
            state = { score: 'HIGH', mitigationsApplied: 0, history: [], scanDone: false };
            commandHistory = [];
            saveState();
            return '<span class="success">[✓] Terminal state reset successfully.</span>';
        }
    };

    // Type text animation
    function typeText(container, html, callback) {
        isTyping = true;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText;

        let i = 0;
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        container.appendChild(outputDiv);

        // For performance, type in chunks
        const chunkSize = 3;
        function typeChunk() {
            if (i < text.length) {
                let end = Math.min(i + chunkSize, text.length);
                // Don't display char-by-char for long outputs, just show it
                if (text.length > 300) {
                    outputDiv.innerHTML = html;
                    isTyping = false;
                    scrollToBottom();
                    if (callback) callback();
                    return;
                }
                i = end;
                outputDiv.textContent = text.substring(0, i);
                scrollToBottom();
                requestAnimationFrame(() => setTimeout(typeChunk, TYPING_SPEED));
            } else {
                // Replace with HTML version for colored output
                outputDiv.innerHTML = html;
                isTyping = false;
                scrollToBottom();
                if (callback) callback();
            }
        }
        typeChunk();
    }

    function scrollToBottom() {
        const body = document.getElementById('terminal-body');
        if (body) body.scrollTop = body.scrollHeight;
    }

    // Process command
    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        const terminalBody = document.getElementById('terminal-body');
        if (!terminalBody) return;

        // Echo the command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-output';
        cmdLine.innerHTML = `<span class="info">security@audit</span>:<span class="success">~</span>$ ${escapeHtml(cmd)}`;
        terminalBody.appendChild(cmdLine);

        // Add to history
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
        saveState();

        if (trimmed === 'clear') {
            // Clear all output
            const children = Array.from(terminalBody.children);
            children.forEach(child => {
                if (!child.classList.contains('terminal-input-line')) {
                    child.remove();
                }
            });
            return;
        }

        // Find matching command
        const handler = commands[trimmed];
        if (handler) {
            const output = handler();
            typeText(terminalBody, output, () => scrollToBottom());
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'terminal-output';
            errorDiv.innerHTML = `<span class="error">[ERROR] Command not found: "${escapeHtml(cmd)}"</span>\n<span class="info">Type "help" for available commands.</span>`;
            terminalBody.appendChild(errorDiv);
        }

        scrollToBottom();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize terminal
    function initTerminal() {
        const input = document.getElementById('terminal-input');
        const terminalBody = document.getElementById('terminal-body');
        if (!input || !terminalBody) return;

        // Show initial state
        if (state.scanDone || state.mitigationsApplied > 0) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'terminal-output';
            statusDiv.innerHTML = `<span class="info">[SYS] Session restored. Current score: </span>${getScoreBadge()}\n<span class="info">Type "help" for available commands.</span>`;
            terminalBody.insertBefore(statusDiv, terminalBody.firstChild);
        }

        // Score display in header
        updateScoreDisplay();

        input.addEventListener('keydown', (e) => {
            if (isTyping) return;

            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (cmd) {
                    processCommand(cmd);
                    input.value = '';
                    updateScoreDisplay();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = commandHistory.length;
                    input.value = '';
                }
            }
        });

        // Focus terminal on click
        terminalBody.addEventListener('click', () => input.focus());
    }

    function updateScoreDisplay() {
        const scoreEl = document.getElementById('terminal-score');
        if (scoreEl) {
            scoreEl.innerHTML = getScoreBadge();
        }
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTerminal);
    } else {
        initTerminal();
    }
})();
