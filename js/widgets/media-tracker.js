// Media Tracker Widget - js/widgets/media-tracker.js

class MediaTrackerWidget {
    constructor() {
        this.books = this.loadBooks();
        this.movies = this.loadMovies();
    }

    loadBooks() {
        try {
            return JSON.parse(localStorage.getItem('dashboardBooks')) || [];
        } catch {
            return [];
        }
    }

    loadMovies() {
        try {
            return JSON.parse(localStorage.getItem('dashboardMovies')) || [];
        } catch {
            return [];
        }
    }

    saveBooks() {
        localStorage.setItem('dashboardBooks', JSON.stringify(this.books));
    }

    saveMovies() {
        localStorage.setItem('dashboardMovies', JSON.stringify(this.movies));
    }

    addBook() {
        const input = document.getElementById('newBookInput');
        const title = input ? input.value.trim() : '';
        if (title) {
            this.books.push({ title, completed: false });
            input.value = '';
            this.saveBooks();
            this.render();
        }
    }

    addMovie() {
        const input = document.getElementById('newMovieInput');
        const title = input ? input.value.trim() : '';
        if (title) {
            this.movies.push({ title, completed: false });
            input.value = '';
            this.saveMovies();
            this.render();
        }
    }

    toggleBook(index) {
        if (this.books[index]) {
            this.books[index].completed = !this.books[index].completed;
            this.saveBooks();
            this.render();
        }
    }

    deleteBook(index) {
        this.books.splice(index, 1);
        this.saveBooks();
        this.render();
    }

    toggleMovie(index) {
        if (this.movies[index]) {
            this.movies[index].completed = !this.movies[index].completed;
            this.saveMovies();
            this.render();
        }
    }

    deleteMovie(index) {
        this.movies.splice(index, 1);
        this.saveMovies();
        this.render();
    }

    exportToTxt() {
        const completedBooks = this.books.filter(book => book.completed);
        const pendingBooks = this.books.filter(book => !book.completed);
        const completedMovies = this.movies.filter(movie => movie.completed);
        const pendingMovies = this.movies.filter(movie => !movie.completed);

        let content = '# Media Tracker Export\n\n';
        content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

        content += '## Books\n\n';
        content += '### ✅ Completed Books\n';
        completedBooks.forEach(book => {
            content += `- [x] ${book.title}\n`;
        });

        content += '\n### 📚 Books to Read\n';
        pendingBooks.forEach(book => {
            content += `- [ ] ${book.title}\n`;
        });

        content += '\n## Movies & Series\n\n';
        content += '### ✅ Completed Movies/Series\n';
        completedMovies.forEach(movie => {
            content += `- [x] ${movie.title}\n`;
        });

        content += '\n### 🎬 Movies/Series to Watch\n';
        pendingMovies.forEach(movie => {
            content += `- [ ] ${movie.title}\n`;
        });

        // Download file
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `media-tracker_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToNotion() {
        const completedBooks = this.books.filter(book => book.completed);
        const pendingBooks = this.books.filter(book => !book.completed);
        const completedMovies = this.movies.filter(movie => movie.completed);
        const pendingMovies = this.movies.filter(movie => !movie.completed);

        let markdown = '# 📚🎬 Media Tracker\n\n';
        markdown += `> Last updated: ${new Date().toLocaleString()}\n\n`;

        markdown += '## 📖 Books\n\n';
        
        if (pendingBooks.length > 0) {
            markdown += '### 🎯 Currently Reading / To Read\n\n';
            pendingBooks.forEach(book => {
                markdown += `- [ ] **${book.title}**\n`;
            });
            markdown += '\n';
        }

        if (completedBooks.length > 0) {
            markdown += '### ✅ Completed Books\n\n';
            completedBooks.forEach(book => {
                markdown += `- [x] **${book.title}**\n`;
            });
            markdown += '\n';
        }

        markdown += '---\n\n## 🎬 Movies & Series\n\n';
        
        if (pendingMovies.length > 0) {
            markdown += '### 🍿 Watchlist\n\n';
            pendingMovies.forEach(movie => {
                markdown += `- [ ] **${movie.title}**\n`;
            });
            markdown += '\n';
        }

        if (completedMovies.length > 0) {
            markdown += '### ✅ Watched\n\n';
            completedMovies.forEach(movie => {
                markdown += `- [x] **${movie.title}**\n`;
            });
            markdown += '\n';
        }

        // Copy to clipboard
        navigator.clipboard.writeText(markdown).then(() => {
            alert('📋 Markdown copied to clipboard! You can now paste it into Notion.');
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            // Fallback: download as file
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `media-tracker-notion_${new Date().toISOString().slice(0,10)}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('📁 Markdown file downloaded! Upload to Notion.');
        });
    }

    render() {
        const container = document.getElementById('mediaTracker');
        if (!container) return;

        const bookListHtml = this.books.map((item, index) => `
            <div style="display: flex; align-items: center; padding: 4px 0; font-size: 11px; border-bottom: 1px solid rgba(168, 85, 247, 0.1);">
                <input type="checkbox" class="book-checkbox" data-index="${index}" ${item.completed ? 'checked' : ''} style="margin-right: 6px; transform: scale(0.8);">
                <span style="flex: 1; ${item.completed ? 'text-decoration: line-through; color: #888;' : ''}">${item.title}</span>
                <button class="book-delete" data-index="${index}" style="background: none; border: none; color: #ff0040; cursor: pointer; font-size: 14px; margin-left: 4px;">🗑️</button>
            </div>
        `).join('');

        const movieListHtml = this.movies.map((item, index) => `
            <div style="display: flex; align-items: center; padding: 4px 0; font-size: 11px; border-bottom: 1px solid rgba(168, 85, 247, 0.1);">
                <input type="checkbox" class="movie-checkbox" data-index="${index}" ${item.completed ? 'checked' : ''} style="margin-right: 6px; transform: scale(0.8);">
                <span style="flex: 1; ${item.completed ? 'text-decoration: line-through; color: #888;' : ''}">${item.title}</span>
                <button class="movie-delete" data-index="${index}" style="background: none; border: none; color: #ff0040; cursor: pointer; font-size: 14px; margin-left: 4px;">🗑️</button>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="panel-title">📚🎬 Media Tracker</div>
            
            <div style="margin-bottom: 15px;">
                <div style="font-weight: bold; color: #a855f7; font-size: 12px; margin-bottom: 5px;">📖 Para Ler</div>
                <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                    <input type="text" id="newBookInput" placeholder="Nome do livro..." style="flex: 1; padding: 4px; font-size: 11px; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px;">
                    <button id="addBookBtn" style="padding: 4px 8px; font-size: 11px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px; cursor: pointer;">➕</button>
                </div>
                <div id="bookList" style="max-height: 80px; overflow-y: auto; font-size: 11px;">
                    ${bookListHtml || '<div style="color: #888; text-align: center; padding: 5px;">Nenhum livro adicionado.</div>'}
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="font-weight: bold; color: #a855f7; font-size: 12px; margin-bottom: 5px;">🎥 Para Assistir</div>
                <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                    <input type="text" id="newMovieInput" placeholder="Nome do filme/série..." style="flex: 1; padding: 4px; font-size: 11px; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px;">
                    <button id="addMovieBtn" style="padding: 4px 8px; font-size: 11px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px; cursor: pointer;">➕</button>
                </div>
                <div id="movieList" style="max-height: 80px; overflow-y: auto; font-size: 11px;">
                    ${movieListHtml || '<div style="color: #888; text-align: center; padding: 5px;">Nenhum filme adicionado.</div>'}
                </div>
            </div>

            <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px;">
                <button id="exportTxtBtn" style="flex: 1; min-width: 80px; padding: 4px; font-size: 10px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px; cursor: pointer;">💾 Export TXT</button>
                <button id="exportNotionBtn" style="flex: 1; min-width: 80px; padding: 4px; font-size: 10px; background: #1e1b4b; color: #ec4899; border: 1px solid #ec4899; border-radius: 3px; cursor: pointer;">📝 To Notion</button>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Books
        document.querySelectorAll('.book-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                this.toggleBook(parseInt(e.target.dataset.index));
            });
        });

        document.querySelectorAll('.book-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteBook(parseInt(e.target.dataset.index));
            });
        });

        const addBookBtn = document.getElementById('addBookBtn');
        const newBookInput = document.getElementById('newBookInput');
        
        if (addBookBtn) addBookBtn.addEventListener('click', () => this.addBook());
        if (newBookInput) {
            newBookInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addBook();
            });
        }

        // Movies
        document.querySelectorAll('.movie-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                this.toggleMovie(parseInt(e.target.dataset.index));
            });
        });

        document.querySelectorAll('.movie-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteMovie(parseInt(e.target.dataset.index));
            });
        });

        const addMovieBtn = document.getElementById('addMovieBtn');
        const newMovieInput = document.getElementById('newMovieInput');
        
        if (addMovieBtn) addMovieBtn.addEventListener('click', () => this.addMovie());
        if (newMovieInput) {
            newMovieInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addMovie();
            });
        }

        // Export buttons
        const exportTxtBtn = document.getElementById('exportTxtBtn');
        const exportNotionBtn = document.getElementById('exportNotionBtn');
        
        if (exportTxtBtn) exportTxtBtn.addEventListener('click', () => this.exportToTxt());
        if (exportNotionBtn) exportNotionBtn.addEventListener('click', () => this.exportToNotion());
    }

    init() {
        console.log('Initializing Media Tracker widget...');
        this.render();
        console.log('Media Tracker widget initialized');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mediaTrackerWidget = new MediaTrackerWidget();
    mediaTrackerWidget.init();
});