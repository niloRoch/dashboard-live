import { createGist, updateGist } from '../notes_gist.js';

export function initNotes() {
    const textarea = document.getElementById('notesTextarea');
    const saveBtn = document.getElementById('saveNotesBtn');
    const loadBtn = document.getElementById('loadNotesBtn');
    const tokenInput = document.getElementById('gistToken');
    const gistIdInput = document.getElementById('gistId');
    const statusDisplay = document.getElementById('notesStatus');

    if (!textarea || !saveBtn || !loadBtn || !tokenInput || !gistIdInput || !statusDisplay) {
        console.warn('Notes elements not found');
        return;
    }

    // Carrega notas do localStorage ao iniciar
    const savedNotes = localStorage.getItem('dashboard_notes');
    if (savedNotes) {
        textarea.value = savedNotes;
    }

    // Salva notas no localStorage a cada mudança
    textarea.addEventListener('input', () => {
        localStorage.setItem('dashboard_notes', textarea.value);
    });

    // Função para salvar no Gist
    saveBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        const gistId = gistIdInput.value.trim();
        const content = textarea.value;

        if (!token) {
            statusDisplay.textContent = 'Error: Please enter GitHub token';
            return;
        }

        if (!content) {
            statusDisplay.textContent = 'Error: Notes are empty';
            return;
        }

        try {
            statusDisplay.textContent = 'Saving...';
            let result;
            if (gistId) {
                // Atualiza Gist existente
                result = await updateGist(token, gistId, 'notes.txt', content, 'Atualização: Dashboard Notes');
            } else {
                // Cria novo Gist
                result = await createGist(token, 'notes.txt', content, 'Dashboard Notes', false);
            }

            // Atualiza o Gist ID no input
            gistIdInput.value = result.id;
            statusDisplay.textContent = `Success: Saved to Gist ${result.id}`;
            // Salva o Gist ID no localStorage para uso futuro
            localStorage.setItem('dashboard_gist_id', result.id);
        } catch (error) {
            console.error('Error saving to Gist:', error);
            statusDisplay.textContent = `Error: ${error.message}`;
        }
    });

    // Função para carregar do Gist
    loadBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        const gistId = gistIdInput.value.trim();

        if (!token) {
            statusDisplay.textContent = 'Error: Please enter GitHub token';
            return;
        }

        if (!gistId) {
            statusDisplay.textContent = 'Error: Please enter Gist ID';
            return;
        }

        try {
            statusDisplay.textContent = 'Loading...';
            const response = await fetch(`https://api.github.com/gists/${gistId}`, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github+json'
                }
            });

            if (!response.ok) {
                throw new Error(`Gist load failed: ${response.status}`);
            }

            const data = await response.json();
            const filename = Object.keys(data.files)[0]; // Pega o primeiro arquivo
            const content = data.files[filename].content;

            textarea.value = content;
            localStorage.setItem('dashboard_notes', content);
            statusDisplay.textContent = 'Success: Notes loaded from Gist';
        } catch (error) {
            console.error('Error loading from Gist:', error);
            statusDisplay.textContent = `Error: ${error.message}`;
        }
    });

    // Carrega o Gist ID do localStorage, se existir
    const savedGistId = localStorage.getItem('dashboard_gist_id');
    if (savedGistId) {
        gistIdInput.value = savedGistId;
    }

    console.log('Intialized Notes Widget');
}