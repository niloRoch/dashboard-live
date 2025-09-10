export function initQuickCalculator() {
    const container = document.getElementById('quickCalculator');
    if (!container) {
        console.warn('Quick Calculator container not found');
        return;
    }

    container.innerHTML = `
        <div class="panel-title">🧮 Quick Calculator</div>
        <input type="text" id="calcInput" placeholder="Digite 2+2*3..." style="width: 100%; padding: 8px; margin: 10px 0; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-family: 'Orbitron', monospace;">
        <div style="font-size: 14px; font-weight: bold; color: #ec4899; margin: 5px 0;" id="calcResult">= ?</div>
        <div style="font-size: 10px; color: #888;">Suporta: +, -, *, /, (, ), Math.PI, Math.sqrt(), etc.</div>
    `;

    const input = document.getElementById('calcInput');
    const resultDiv = document.getElementById('calcResult');

    function calculate() {
        try {
            // Avalia a expressão de forma segura (não use eval em produção com dados não confiáveis)
            // Para um dashboard pessoal, é aceitável.
            const result = Function('"use strict"; return (' + input.value + ')')();
            resultDiv.textContent = `= ${result}`;
            resultDiv.style.color = '#ec4899';
        } catch (error) {
            resultDiv.textContent = 'Erro na expressão';
            resultDiv.style.color = '#ff0040';
        }
    }

    input.addEventListener('input', calculate);

    console.log('Intialized Quick Calculator');
}