// System Notes Widget - js/widgets/system-notes.js

class SystemNotesWidget {
    constructor() {
        this.saveTimeout = null;
        this.currentNote = this.loadNote();
    }

    loadNote() {
        try {
            return localStorage.getItem('dashboardSystemNote') || '';
        } catch {
            return '';
        }
    }

    saveNote(content) {
        try {
            localStorage.setItem('dashboardSystemNote', content);
            return true;
        } catch {
            return false;
        }
    }

    downloadAsText() {
        const content = document.getElementById('systemNotesTextarea')?.value || '';
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notas_dashboard_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToNotion() {
        const content = document.getElementById('systemNotesTextarea')?.value || '';
        if (!content.trim()) {
            alert('No notes to export!');
            return;
        }

        let markdown = '# 📝 System Notes\n\n';
        markdown += `> Exported from Dashboard on ${new Date().toLocaleString()}\n\n`;
        markdown += '---\n\n';
        markdown += content;

        // Copy to clipboard
        navigator.clipboard.writeText(markdown).then(() => {
            alert('📋 Notes copied to clipboard in Markdown format! You can now paste them into Notion.');
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            // Fallback: download as file
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `system-notes-notion_${new Date().toISOString().slice(0,10)}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('📁 Markdown file downloaded! Upload to Notion.');
        });
    }

    clearNotes() {
        if (confirm('Tem certeza que deseja limpar todas as anotações?')) {
            const textarea = document.getElementById('systemNotesTextarea');
            if (textarea) {
                textarea.value = '';
                this.saveNote('');
                this.updateStatus('✅ Notas limpas.');
            }
        }
    }

    updateStatus(message, isError = false) {
        const statusDiv = document.getElementById('notesStatus');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.style.color = isError ? '#ff0040' : '#888';
        }
    }

    handleInput() {
        const textarea = document.getElementById('systemNotesTextarea');
        if (!textarea) return;

        clearTimeout(this.saveTimeout);
        this.updateStatus('Salvando...', false);
        
        const statusDiv = document.getElementById('notesStatus');
        if (statusDiv) statusDiv.style.color = '#ec4899';

        this.saveTimeout = setTimeout(() => {
            if (this.saveNote(textarea.value)) {
                this.updateStatus(`✅ Salvo em ${new Date().toLocaleTimeString()}`);
            } else {
                this.updateStatus('❌ Erro ao salvar', true);
            }
        }, 500);
    }

    render() {
        const container = document.getElementById('systemNotes');
        if (!container) return;

        container.innerHTML = `
            <div class="panel-title">📝 System Notes (Auto-Save)</div>
            <textarea id="systemNotesTextarea" placeholder="Escreva suas anotações aqui. Elas são salvas automaticamente." style="width: 100%; height: 100px; padding: 8px; margin: 10px 0; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-family: 'Courier New', monospace; resize: vertical;">${this.currentNote}</textarea>
            <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px;">
                <button id="downloadNotesBtn" style="flex: 1; min-width: 100px; padding: 5px; font-size: 11px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; cursor: pointer;">💾 Baixar TXT</button>
                <button id="exportNotionBtn" style="flex: 1; min-width: 100px; padding: 5px; font-size: 11px; background: #1e1b4b; color: #ec4899; border: 1px solid #ec4899; border-radius: 4px; cursor: pointer;">📝 To Notion</button>
                <button id="clearNotesBtn" style="flex: 1; min-width: 100px; padding: 5px; font-size: 11px; background: #1e1b4b; color: #ff0040; border: 1px solid #ff0040; border-radius: 4px; cursor: pointer;">🗑️ Limpar</button>
            </div>
            <div style="font-size: 10px; color: #888; margin-top: 5px;" id="notesStatus">Salvo automaticamente.</div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const textarea = document.getElementById('systemNotesTextarea');
        const downloadBtn = document.getElementById('downloadNotesBtn');
        const exportNotionBtn = document.getElementById('exportNotionBtn');
        const clearBtn = document.getElementById('clearNotesBtn');

        if (textarea) {
            textarea.addEventListener('input', () => this.handleInput());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadAsText());
        }

        if (exportNotionBtn) {
            exportNotionBtn.addEventListener('click', () => this.exportToNotion());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearNotes());
        }
    }

    init() {
        console.log('Initializing System Notes widget...');
        this.render();
        console.log('System Notes widget initialized');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const systemNotesWidget = new SystemNotesWidget();
    systemNotesWidget.init();
});