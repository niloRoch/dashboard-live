// Todo List Widget - js/widgets/todo-list.js

class TodoListWidget {
    constructor() {
        this.todos = this.loadTodos();
    }

    loadTodos() {
        try {
            return JSON.parse(localStorage.getItem('dashboardTodos')) || [];
        } catch {
            return [];
        }
    }

    saveTodos() {
        try {
            localStorage.setItem('dashboardTodos', JSON.stringify(this.todos));
            return true;
        } catch {
            return false;
        }
    }

    addTodo() {
        const input = document.getElementById('newTodoInput');
        const text = input ? input.value.trim() : '';
        if (text) {
            this.todos.push({ text, completed: false, createdAt: new Date().toISOString() });
            input.value = '';
            this.saveTodos();
            this.render();
        }
    }

    toggleTodo(index) {
        if (this.todos[index]) {
            this.todos[index].completed = !this.todos[index].completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
        this.render();
    }

    exportToTxt() {
        if (this.todos.length === 0) {
            alert('No todos to export!');
            return;
        }

        const completedTodos = this.todos.filter(todo => todo.completed);
        const pendingTodos = this.todos.filter(todo => !todo.completed);

        let content = '# Todo List Export\n\n';
        content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

        if (pendingTodos.length > 0) {
            content += '## Pending Tasks\n\n';
            pendingTodos.forEach(todo => {
                content += `- [ ] ${todo.text}\n`;
            });
            content += '\n';
        }

        if (completedTodos.length > 0) {
            content += '## Completed Tasks\n\n';
            completedTodos.forEach(todo => {
                content += `- [x] ${todo.text}\n`;
            });
        }

        // Download file
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-list_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToNotion() {
        if (this.todos.length === 0) {
            alert('No todos to export!');
            return;
        }

        const completedTodos = this.todos.filter(todo => todo.completed);
        const pendingTodos = this.todos.filter(todo => !todo.completed);

        let markdown = '# ✅ Todo List\n\n';
        markdown += `> Last updated: ${new Date().toLocaleString()}\n\n`;

        if (pendingTodos.length > 0) {
            markdown += '## 🎯 Pending Tasks\n\n';
            pendingTodos.forEach(todo => {
                markdown += `- [ ] **${todo.text}**\n`;
            });
            markdown += '\n';
        }

        if (completedTodos.length > 0) {
            markdown += '## ✅ Completed Tasks\n\n';
            completedTodos.forEach(todo => {
                markdown += `- [x] **${todo.text}**\n`;
            });
            markdown += '\n';
        }

        markdown += '---\n\n';
        markdown += `**Total Tasks:** ${this.todos.length} | **Completed:** ${completedTodos.length} | **Pending:** ${pendingTodos.length}`;

        // Copy to clipboard
        navigator.clipboard.writeText(markdown).then(() => {
            alert('📋 Todo list copied to clipboard in Markdown format! You can now paste it into Notion.');
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            // Fallback: download as file
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `todo-list-notion_${new Date().toISOString().slice(0,10)}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('📁 Markdown file downloaded! Upload to Notion.');
        });
    }

    render() {
        const container = document.getElementById('todoList');
        if (!container) return;

        const listHtml = this.todos.map((todo, index) => `
            <div style="display: flex; align-items: center; padding: 5px 0; border-bottom: 1px solid rgba(168, 85, 247, 0.2);">
                <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''} style="margin-right: 8px;">
                <span style="flex: 1; ${todo.completed ? 'text-decoration: line-through; color: #888;' : ''} font-size: 12px;">${todo.text}</span>
                <button class="todo-delete" data-index="${index}" style="background: none; border: none; color: #ff0040; cursor: pointer; font-size: 14px; margin-left: 4px;">🗑️</button>
            </div>
        `).join('');

        const stats = {
            total: this.todos.length,
            completed: this.todos.filter(t => t.completed).length,
            pending: this.todos.filter(t => !t.completed).length
        };

        container.innerHTML = `
            <div class="panel-title">✅ To-Do List</div>
            <div style="display: flex; margin: 10px 0;">
                <input type="text" id="newTodoInput" placeholder="Nova tarefa..." style="flex: 1; padding: 5px; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-size: 12px;">
                <button id="addTodoBtn" style="margin-left: 5px; padding: 5px 10px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; cursor: pointer; font-size: 12px;">➕</button>
            </div>
            <div id="todoListContainer" style="max-height: 120px; overflow-y: auto; margin-bottom: 10px;">
                ${listHtml || '<div style="color: #888; font-size: 12px; text-align: center; padding: 10px;">Nenhuma tarefa.</div>'}
            </div>
            
            ${stats.total > 0 ? `
                <div style="font-size: 10px; color: #888; margin-bottom: 8px; text-align: center;">
                    Total: ${stats.total} | Concluídas: ${stats.completed} | Pendentes: ${stats.pending}
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                <button id="exportTodoTxtBtn" style="flex: 1; min-width: 80px; padding: 4px; font-size: 10px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px; cursor: pointer;">💾 Export TXT</button>
                <button id="exportTodoNotionBtn" style="flex: 1; min-width: 80px; padding: 4px; font-size: 10px; background: #1e1b4b; color: #ec4899; border: 1px solid #ec4899; border-radius: 3px; cursor: pointer;">📝 To Notion</button>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Todo checkboxes
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.index));
            });
        });

        // Delete buttons
        document.querySelectorAll('.todo-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                this.deleteTodo(parseInt(e.target.dataset.index));
            });
        });

        // Add todo
        const addBtn = document.getElementById('addTodoBtn');
        const input = document.getElementById('newTodoInput');
        
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addTodo());
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addTodo();
            });
        }

        // Export buttons
        const exportTxtBtn = document.getElementById('exportTodoTxtBtn');
        const exportNotionBtn = document.getElementById('exportTodoNotionBtn');
        
        if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', () => this.exportToTxt());
        }
        
        if (exportNotionBtn) {
            exportNotionBtn.addEventListener('click', () => this.exportToNotion());
        }
    }

    init() {
        console.log('Initializing Todo List widget...');
        this.render();
        console.log('Todo List widget initialized');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const todoListWidget = new TodoListWidget();
    todoListWidget.init();
});