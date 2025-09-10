    <script>
        // Initialize matrix background (From indexbackup)
        function createMatrixRain() {
            const matrixBg = document.getElementById('matrixBg');
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            for (let i = 0; i < 50; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDelay = Math.random() * 3 + 's';
                char.style.animationDuration = (3 + Math.random() * 2) + 's';
                matrixBg.appendChild(char);
            }
        }
        function updateStardate() {
            const now = new Date();
            const stardate = 2458849.5 + (now.getTime() / 86400000);
            document.getElementById('stardate').textContent = stardate.toFixed(1);
        }
        function animateCores() {
            const cores = document.querySelectorAll('.core');
            cores.forEach((core, index) => {
                setTimeout(() => {
                    if (Math.random() > 0.3) {
                        core.classList.add('active');
                    } else {
                        core.classList.remove('active');
                    }
                }, index * 200);
            });
        }
        // Real-time updates (From indexbackup)
        function updateTime() {
            const now = new Date();
            const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            // UTC Time
            document.getElementById('utcTime').textContent = utc.toTimeString().split(' ')[0];
            // Progress calculations
            const startOfYear = new Date(utc.getFullYear(), 0, 1);
            const endOfYear = new Date(utc.getFullYear() + 1, 0, 1);
            const yearProgress = ((utc - startOfYear) / (endOfYear - startOfYear)) * 100;
            const startOfDay = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
            const dayProgress = ((utc - startOfDay) / (24 * 60 * 60 * 1000)) * 100;
            const startOfHour = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours());
            const hourProgress = ((utc - startOfHour) / (60 * 60 * 1000)) * 100;
            const startOfMinute = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours(), utc.getMinutes());
            const minuteProgress = ((utc - startOfMinute) / (60 * 1000)) * 100;
            // Update progress bars
            updateProgress('year', yearProgress);
            updateProgress('day', dayProgress);
            updateProgress('hour', hourProgress);
            updateProgress('minute', minuteProgress);
            updateStardate();
        }
        function updateProgress(type, value) {
            document.getElementById(type + 'Progress').style.width = value + '%';
            document.getElementById(type + 'Percent').textContent = value.toFixed(1) + '%';
        }
        function updateMetrics() {
            // Simulate real-time data changes (From indexbackup)
            const ramUsage = 65 + Math.random() * 10;
            const cpuUsage = 40 + Math.random() * 20;
            const mongoCount = 847293 + Math.floor(Math.random() * 1000);
            const kafkaInflight = 1200 + Math.floor(Math.random() * 200);
            const processedPerSec = 500 + Math.floor(Math.random() * 50);
            const queueSize = 80 + Math.floor(Math.random() * 20);
            document.getElementById('ramUsage').style.width = ramUsage + '%';
            document.getElementById('ramPercent').textContent = ramUsage.toFixed(0) + '%';
            document.getElementById('cpuUsage').style.width = cpuUsage + '%';
            document.getElementById('cpuPercent').textContent = cpuUsage.toFixed(0) + '%';
            document.getElementById('mongoCount').textContent = mongoCount.toLocaleString();
            document.getElementById('kafkaInflight').textContent = kafkaInflight.toLocaleString();
            document.getElementById('processedPerSec').textContent = processedPerSec;
            document.getElementById('queueSize').textContent = queueSize;
        }
        function createChart() {
            const chart = document.getElementById('mainChart');
            chart.innerHTML = '';
            for (let i = 0; i < 100; i++) {
                const line = document.createElement('div');
                line.className = 'chart-line';
                line.style.left = i * 2 + 'px';
                line.style.height = Math.random() * 180 + 20 + 'px';
                line.style.animationDelay = Math.random() * 2 + 's';
                chart.appendChild(line);
            }
        }
        // Initialize
        createMatrixRain();
        updateTime();
        updateMetrics();
        createChart();
        // Update intervals
        setInterval(updateTime, 1000);
        setInterval(updateMetrics, 2000);
        setInterval(createChart, 5000);
        setInterval(animateCores, 3000);
        // Performance optimization for mobile
        if (window.innerWidth < 768) {
            // Reduce matrix chars on mobile
            const matrixBg = document.getElementById('matrixBg');
            matrixBg.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const chars = '01アイウエオ';
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDelay = Math.random() * 3 + 's';
                char.style.animationDuration = (3 + Math.random() * 2) + 's';
                matrixBg.appendChild(char);
            }
        }

        // Atualiza o alerta de sistema após carregar todos os módulos
        window.addEventListener('load', () => {
            setTimeout(() => {
                const alertElement = document.getElementById('systemAlert');
                if (alertElement) {
                    alertElement.innerHTML = '✅ All systems online <span class="terminal-cursor"></span>';
                }
            }, 1000);
        });
    </script>
    <!-- Módulo Pomodoro -->
    <script type="module">
        let timerInterval = null;
        let timeLeft = 0;
        let isRunning = false;
        let isWorkSession = true; // true = work, false = break

        function initPomodoro() {
            const startBtn = document.getElementById('pomodoroStart');
            const pauseBtn = document.getElementById('pomodoroPause');
            const resetBtn = document.getElementById('pomodoroReset');
            const workInput = document.getElementById('workMinutes');
            const breakInput = document.getElementById('breakMinutes');
            const timeDisplay = document.getElementById('pomodoroTime');
            const statusDisplay = document.getElementById('pomodoroStatus');

            if (!startBtn || !pauseBtn || !resetBtn || !workInput || !breakInput || !timeDisplay || !statusDisplay) {
                console.warn('Pomodoro elements not found');
                return;
            }

            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }

            function startTimer() {
                if (isRunning) return;
                isRunning = true;
                startBtn.textContent = '⏸️ Pause';
                statusDisplay.textContent = `Status: ${isWorkSession ? 'Working' : 'On Break'}...`;

                timerInterval = setInterval(() => {
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        isWorkSession = !isWorkSession;
                        setTime(isWorkSession ? parseInt(workInput.value) * 60 : parseInt(breakInput.value) * 60);
                        startBtn.textContent = '▶️ Start';
                        statusDisplay.textContent = `Status: Session ended! ${isWorkSession ? 'Ready for work?' : 'Ready for break?'}`;
                        if (typeof Audio !== 'undefined') {
                            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                            audio.play().catch(e => console.log('Audio play failed:', e));
                        }
                        return;
                    }
                    timeLeft--;
                    timeDisplay.textContent = formatTime(timeLeft);
                }, 1000);
            }

            function pauseTimer() {
                if (!isRunning) return;
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = '▶️ Resume';
                statusDisplay.textContent = 'Status: Paused';
            }

            function resetTimer() {
                clearInterval(timerInterval);
                isRunning = false;
                isWorkSession = true;
                setTime(parseInt(workInput.value) * 60);
                startBtn.textContent = '▶️ Start';
                statusDisplay.textContent = 'Status: Ready';
            }

            function setTime(seconds) {
                timeLeft = seconds;
                timeDisplay.textContent = formatTime(timeLeft);
            }

            startBtn.addEventListener('click', () => {
                if (isRunning) {
                    pauseTimer();
                } else {
                    startTimer();
                }
            });

            pauseBtn.addEventListener('click', pauseTimer);
            resetBtn.addEventListener('click', resetTimer);

            workInput.addEventListener('change', () => {
                if (!isRunning && isWorkSession) {
                    setTime(parseInt(workInput.value) * 60);
                }
            });

            breakInput.addEventListener('change', () => {
                if (!isRunning && !isWorkSession) {
                    setTime(parseInt(breakInput.value) * 60);
                }
            });

            setTime(parseInt(workInput.value) * 60);
            console.log('Intialized Pomodoro Widget');
        }

        // Inicializa imediatamente
        document.addEventListener('DOMContentLoaded', initPomodoro);
    </script>

    <!-- Módulo Clipboard Manager -->
    <script type="module">
        function initClipboardManager() {
            const container = document.getElementById('clipboardManager');
            if (!container) {
                console.warn('Clipboard Manager container not found');
                return;
            }

            let lastCopiedText = localStorage.getItem('lastCopiedText') || 'Nada copiado ainda.';

            function updateDisplay(text) {
                lastCopiedText = text;
                localStorage.setItem('lastCopiedText', text);
                container.innerHTML = `
                    <div class="panel-title">📋 Clipboard Manager</div>
                    <div style="font-size: 12px; margin: 10px 0; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 4px; word-break: break-all;">
                        ${text || 'Nada copiado ainda.'}
                    </div>
                    <button id="pasteClipboardBtn" class="pomodoro-controls button" style="width: 100%;">📋 Colar</button>
                `;

                const pasteBtn = document.getElementById('pasteClipboardBtn');
                if (pasteBtn) {
                    pasteBtn.addEventListener('click', async () => {
                        try {
                            if (lastCopiedText) {
                                await navigator.clipboard.writeText(lastCopiedText);
                                alert('Texto copiado de volta para a área de transferência!');
                            }
                        } catch (err) {
                            console.error('Falha ao copiar: ', err);
                            alert('Falha ao acessar a área de transferência. Verifique as permissões do navegador.');
                        }
                    });
                }
            }

            updateDisplay(lastCopiedText);

            document.addEventListener('copy', async (e) => {
                let copiedText = '';
                if (window.getSelection) {
                    copiedText = window.getSelection().toString();
                }
                if (copiedText) {
                    updateDisplay(copiedText);
                }
            });

            navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    navigator.clipboard.readText().then(text => {
                        if (text && text !== lastCopiedText) {
                            updateDisplay(text);
                        }
                    }).catch(err => {
                        console.warn('Não foi possível ler da área de transferência automaticamente:', err);
                    });
                }
            });

            console.log('Intialized Clipboard Manager');
        }

        document.addEventListener('DOMContentLoaded', initClipboardManager);
    </script>

    <!-- Módulo Quick Calculator -->
    <script type="module">
        function initQuickCalculator() {
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

        document.addEventListener('DOMContentLoaded', initQuickCalculator);
    </script>

    <!-- Módulo To-Do List -->
    <script type="module">
        function initTodoList() {
            const container = document.getElementById('todoList');
            if (!container) {
                console.warn('To-Do List container not found');
                return;
            }

            let todos = JSON.parse(localStorage.getItem('dashboardTodos')) || [];

            function renderTodos() {
                const listHtml = todos.map((todo, index) => `
                    <div style="display: flex; align-items: center; padding: 5px 0; border-bottom: 1px solid rgba(168, 85, 247, 0.2);">
                        <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''} style="margin-right: 8px;">
                        <span style="flex: 1; ${todo.completed ? 'text-decoration: line-through; color: #888;' : ''}">${todo.text}</span>
                        <button class="todo-delete" data-index="${index}" style="background: none; border: none; color: #ff0040; cursor: pointer; font-size: 16px;">🗑️</button>
                    </div>
                `).join('');

                container.innerHTML = `
                    <div class="panel-title">✅ To-Do List</div>
                    <div style="display: flex; margin: 10px 0;">
                        <input type="text" id="newTodoInput" placeholder="Nova tarefa..." style="flex: 1; padding: 5px; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-size: 12px;">
                        <button id="addTodoBtn" style="margin-left: 5px; padding: 5px 10px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; cursor: pointer; font-size: 12px;">➕</button>
                    </div>
                    <div id="todoListContainer" style="max-height: 120px; overflow-y: auto;">
                        ${listHtml || '<div style="color: #888; font-size: 12px; text-align: center; padding: 10px;">Nenhuma tarefa.</div>'}
                    </div>
                `;

                document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', (e) => {
                        const index = e.target.dataset.index;
                        todos[index].completed = e.target.checked;
                        saveAndRender();
                    });
                });

                document.querySelectorAll('.todo-delete').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const index = e.target.dataset.index;
                        todos.splice(index, 1);
                        saveAndRender();
                    });
                });

                document.getElementById('addTodoBtn').addEventListener('click', addTodo);
                document.getElementById('newTodoInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') addTodo();
                });
            }

            function addTodo() {
                const input = document.getElementById('newTodoInput');
                const text = input.value.trim();
                if (text) {
                    todos.push({ text, completed: false });
                    input.value = '';
                    saveAndRender();
                }
            }

            function saveAndRender() {
                localStorage.setItem('dashboardTodos', JSON.stringify(todos));
                renderTodos();
            }

            renderTodos();
            console.log('Intialized To-Do List');
        }

        document.addEventListener('DOMContentLoaded', initTodoList);
    </script>

    <!-- Módulo System Notes -->
    <script type="module">
        function initSystemNotes() {
            const container = document.getElementById('systemNotes');
            if (!container) {
                console.warn('System Notes container not found');
                return;
            }

            const savedNote = localStorage.getItem('dashboardSystemNote') || '';

            container.innerHTML = `
                <div class="panel-title">📝 System Notes (Auto-Save)</div>
                <textarea id="systemNotesTextarea" placeholder="Escreva suas anotações aqui. Elas são salvas automaticamente." style="width: 100%; height: 100px; padding: 8px; margin: 10px 0; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-family: 'Courier New', monospace; resize: vertical;">${savedNote}</textarea>
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    <button id="downloadNotesBtn" style="flex: 1; min-width: 120px; padding: 5px; font-size: 12px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; cursor: pointer;">💾 Baixar como .txt</button>
                    <button id="clearNotesBtn" style="flex: 1; min-width: 120px; padding: 5px; font-size: 12px; background: #1e1b4b; color: #ff0040; border: 1px solid #ff0040; border-radius: 4px; cursor: pointer;">🗑️ Limpar</button>
                </div>
                <div style="font-size: 10px; color: #888; margin-top: 5px;" id="notesStatus">Salvo automaticamente.</div>
            `;

            const textarea = document.getElementById('systemNotesTextarea');
            const downloadBtn = document.getElementById('downloadNotesBtn');
            const clearBtn = document.getElementById('clearNotesBtn');
            const statusDiv = document.getElementById('notesStatus');

            let saveTimeout;
            textarea.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                statusDiv.textContent = 'Salvando...';
                statusDiv.style.color = '#ec4899';

                saveTimeout = setTimeout(() => {
                    localStorage.setItem('dashboardSystemNote', textarea.value);
                    statusDiv.textContent = '✅ Salvo em ' + new Date().toLocaleTimeString();
                    statusDiv.style.color = '#888';
                }, 500);
            });

            downloadBtn.addEventListener('click', () => {
                const content = textarea.value;
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `notas_dashboard_${new Date().toISOString().slice(0,10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            clearBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar todas as anotações?')) {
                    textarea.value = '';
                    localStorage.removeItem('dashboardSystemNote');
                    statusDiv.textContent = '✅ Notas limpas.';
                }
            });

            console.log('Intialized System Notes (LocalStorage + Download)');
        }

        document.addEventListener('DOMContentLoaded', initSystemNotes);
    </script>

    <!-- Módulo Media Tracker -->
    <script type="module">
        function initMediaTracker() {
            const container = document.getElementById('mediaTracker');
            if (!container) {
                console.warn('Media Tracker container not found');
                return;
            }

            let books = JSON.parse(localStorage.getItem('dashboardBooks')) || [];
            let movies = JSON.parse(localStorage.getItem('dashboardMovies')) || [];

            function render() {
                const bookListHtml = books.map((item, index) => `
                    <div style="display: flex; align-items: center; padding: 4px 0; font-size: 11px; border-bottom: 1px solid rgba(168, 85, 247, 0.1);">
                        <input type="checkbox" class="book-checkbox" data-index="${index}" ${item.completed ? 'checked' : ''} style="margin-right: 6px; transform: scale(0.8);">
                        <span style="flex: 1; ${item.completed ? 'text-decoration: line-through; color: #888;' : ''}">${item.title}</span>
                        <button class="book-delete" data-index="${index}" style="background: none; border: none; color: #ff0040; cursor: pointer; font-size: 14px; margin-left: 4px;">🗑️</button>
                    </div>
                `).join('');

                const movieListHtml = movies.map((item, index) => `
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

                    <div>
                        <div style="font-weight: bold; color: #a855f7; font-size: 12px; margin-bottom: 5px;">🎥 Para Assistir</div>
                        <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                            <input type="text" id="newMovieInput" placeholder="Nome do filme/série..." style="flex: 1; padding: 4px; font-size: 11px; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px;">
                            <button id="addMovieBtn" style="padding: 4px 8px; font-size: 11px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 3px; cursor: pointer;">➕</button>
                        </div>
                        <div id="movieList" style="max-height: 80px; overflow-y: auto; font-size: 11px;">
                            ${movieListHtml || '<div style="color: #888; text-align: center; padding: 5px;">Nenhum filme adicionado.</div>'}
                        </div>
                    </div>
                `;

                // Livros
                document.querySelectorAll('.book-checkbox').forEach(cb => {
                    cb.addEventListener('change', (e) => {
                        books[e.target.dataset.index].completed = e.target.checked;
                        saveBooks();
                        render();
                    });
                });

                document.querySelectorAll('.book-delete').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        books.splice(e.target.dataset.index, 1);
                        saveBooks();
                        render();
                    });
                });

                document.getElementById('addBookBtn').addEventListener('click', addBook);
                document.getElementById('newBookInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') addBook();
                });

                // Filmes
                document.querySelectorAll('.movie-checkbox').forEach(cb => {
                    cb.addEventListener('change', (e) => {
                        movies[e.target.dataset.index].completed = e.target.checked;
                        saveMovies();
                        render();
                    });
                });

                document.querySelectorAll('.movie-delete').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        movies.splice(e.target.dataset.index, 1);
                        saveMovies();
                        render();
                    });
                });

                document.getElementById('addMovieBtn').addEventListener('click', addMovie);
                document.getElementById('newMovieInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') addMovie();
                });
            }

            function addBook() {
                const input = document.getElementById('newBookInput');
                const title = input.value.trim();
                if (title) {
                    books.push({ title, completed: false });
                    input.value = '';
                    saveBooks();
                    render();
                }
            }

            function addMovie() {
                const input = document.getElementById('newMovieInput');
                const title = input.value.trim();
                if (title) {
                    movies.push({ title, completed: false });
                    input.value = '';
                    saveMovies();
                    render();
                }
            }

            function saveBooks() {
                localStorage.setItem('dashboardBooks', JSON.stringify(books));
            }

            function saveMovies() {
                localStorage.setItem('dashboardMovies', JSON.stringify(movies));
            }

            render();
            console.log('Intialized Media Tracker');
        }

        document.addEventListener('DOMContentLoaded', initMediaTracker);

        // Weather API Configuration
        const WEATHER_API_KEY = '28c3e441ab705e8a663bffd1a56b6f83';
        
        // Weather Module
        let currentWeatherLocation = 'London';
        let weatherUpdateInterval = null;

        // Weather API Functions
        async function fetchWeatherData(location) {
            try {
                console.log(`Fetching weather for: ${location}`);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('Weather data received:', data);

                return {
                    temp: data.main.temp,
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    wind_speed: Math.round(data.wind.speed * 2.237), // m/s to mph
                    humidity: data.main.humidity,
                    pressure: data.main.pressure
                };
            } catch (error) {
                console.error('Error fetching weather data:', error);
                throw error;
            }
        }

        async function fetchWeatherForecast(location) {
            try {
                console.log(`Fetching forecast for: ${location}`);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error(`Forecast API error: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('Forecast data received:', data);
                return data;
            } catch (error) {
                console.error('Error fetching forecast data:', error);
                throw error;
            }
        }

        // Weather Display Functions
        async function updateWeatherDisplay() {
            try {
                console.log('Updating weather display...');
                
                // Show loading state
                const contentDiv = document.getElementById('weatherContent');
                const forecastDiv = document.getElementById('weatherForecast');
                
                if (contentDiv) {
                    contentDiv.innerHTML = `
                        <div class="weather-desc loading">Loading weather data...</div>
                        <div class="weather-temp">--°C</div>
                        <div class="weather-details">Fetching data...</div>
                    `;
                }
                
                if (forecastDiv) {
                    forecastDiv.innerHTML = '<div style="color: #888; text-align: center;">Loading forecast...</div>';
                }

                // Fetch current weather data
                const currentData = await fetchWeatherData(currentWeatherLocation);
                
                if (!currentData) {
                    throw new Error('No weather data received');
                }

                console.log('Updating UI with weather data:', currentData);

                // Update current weather UI
                if (contentDiv) {
                    contentDiv.innerHTML = `
                        <div class="weather-desc">${currentData.description.charAt(0).toUpperCase() + currentData.description.slice(1)}</div>
                        <div class="weather-temp">${Math.round(currentData.temp)}°C</div>
                        <div class="weather-details">${currentData.main} • ${currentData.wind_speed} mph</div>
                    `;
                }

                // Fetch and display forecast
                const forecastData = await fetchWeatherForecast(currentWeatherLocation);
                
                if (forecastData && forecastData.list && forecastDiv) {
                    console.log('Updating forecast UI...');
                    
                    // Get forecast for next 5 days (one entry per day at noon)
                    const dailyData = forecastData.list.filter((item, index) => {
                        const date = new Date(item.dt * 1000);
                        return date.getHours() === 12; // Get noon forecasts
                    }).slice(0, 5);

                    if (dailyData.length === 0) {
                        // Fallback: take every 8th item (roughly once per day)
                        const fallbackDaily = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
                        dailyData.push(...fallbackDaily);
                    }

                    let forecastHTML = '';
                    dailyData.forEach((day, index) => {
                        const date = new Date(day.dt * 1000);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const temp = Math.round(day.main.temp);
                        
                        forecastHTML += `
                            <div class="forecast-day">
                                <span class="forecast-date">${dayName}</span>
                                <span class="forecast-temp">${temp}°C</span>
                            </div>
                        `;
                    });

                    forecastDiv.innerHTML = forecastHTML;
                } else {
                    console.warn('No forecast data available');
                    if (forecastDiv) {
                        forecastDiv.innerHTML = '<div style="color: #888; text-align: center;">No forecast data</div>';
                    }
                }

                console.log('Weather update completed successfully');

            } catch (error) {
                console.error('Error updating weather display:', error);
                
                const contentDiv = document.getElementById('weatherContent');
                if (contentDiv) {
                    contentDiv.innerHTML = `
                        <div class="weather-desc error">Error loading weather</div>
                        <div class="weather-temp">--°C</div>
                        <div class="weather-details">${error.message}</div>
                    `;
                }

                const forecastDiv = document.getElementById('weatherForecast');
                if (forecastDiv) {
                    forecastDiv.innerHTML = '<div style="color: #ff0040; text-align: center;">Forecast unavailable</div>';
                }
            }
        }

        // Weather Initialization
        function initWeather() {
            console.log('Initializing weather widget...');
            
            const locationSelect = document.getElementById('weatherLocation');
            if (locationSelect) {
                locationSelect.addEventListener('change', (e) => {
                    currentWeatherLocation = e.target.value;
                    console.log(`Weather location changed to: ${currentWeatherLocation}`);
                    updateWeatherDisplay();
                });
            }

            // Initial weather update
            updateWeatherDisplay();
            
            // Update weather every 10 minutes
            weatherUpdateInterval = setInterval(updateWeatherDisplay, 10 * 60 * 1000);
            
            console.log('Weather widget initialized');
        }

        // Matrix Rain Effect
        function createMatrixRain() {
            const matrixBg = document.getElementById('matrixBg');
            if (!matrixBg) return;

            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            matrixBg.innerHTML = '';

            const count = window.innerWidth < 768 ? 20 : 50;
            for (let i = 0; i < count; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDelay = Math.random() * 3 + 's';
                char.style.animationDuration = (3 + Math.random() * 2) + 's';
                matrixBg.appendChild(char);
            }
        }

        // Time and System Updates
        function updateStardate() {
            const now = new Date();
            const stardate = 2458849.5 + (now.getTime() / 86400000);
            const stardateEl = document.getElementById('stardate');
            if (stardateEl) {
                stardateEl.textContent = stardate.toFixed(1);
            }
        }

        function animateCores() {
            const cores = document.querySelectorAll('.core');
            cores.forEach((core, index) => {
                setTimeout(() => {
                    if (Math.random() > 0.3) {
                        core.classList.add('active');
                    } else {
                        core.classList.remove('active');
                    }
                }, index * 200);
            });
        }

        function updateTime() {
            const now = new Date();
            const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            
            // UTC Time
            const utcTimeEl = document.getElementById('utcTime');
            if (utcTimeEl) {
                utcTimeEl.textContent = utc.toTimeString().split(' ')[0];
            }
            
            // Progress calculations
            const startOfYear = new Date(utc.getFullYear(), 0, 1);
            const endOfYear = new Date(utc.getFullYear() + 1, 0, 1);
            const yearProgress = ((utc - startOfYear) / (endOfYear - startOfYear)) * 100;
            
            const startOfDay = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
            const dayProgress = ((utc - startOfDay) / (24 * 60 * 60 * 1000)) * 100;
            
            const startOfHour = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours());
            const hourProgress = ((utc - startOfHour) / (60 * 60 * 1000)) * 100;
            
            const startOfMinute = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours(), utc.getMinutes());
            const minuteProgress = ((utc - startOfMinute) / (60 * 1000)) * 100;
            
            // Update progress bars
            updateProgress('year', yearProgress);
            updateProgress('day', dayProgress);
            updateProgress('hour', hourProgress);
            updateProgress('minute', minuteProgress);
            
            updateStardate();
        }

        function updateProgress(type, value) {
            const progressEl = document.getElementById(type + 'Progress');
            const percentEl = document.getElementById(type + 'Percent');
            
            if (progressEl) progressEl.style.width = value + '%';
            if (percentEl) percentEl.textContent = value.toFixed(1) + '%';
        }

        function updateMetrics() {
            // Simulate real-time data changes
            const ramUsage = 65 + Math.random() * 10;
            const cpuUsage = 40 + Math.random() * 20;
            const mongoCount = 847293 + Math.floor(Math.random() * 1000);
            const kafkaInflight = 1200 + Math.floor(Math.random() * 200);
            const processedPerSec = 500 + Math.floor(Math.random() * 50);
            const queueSize = 80 + Math.floor(Math.random() * 20);

            const ramUsageEl = document.getElementById('ramUsage');
            const ramPercentEl = document.getElementById('ramPercent');
            const cpuUsageEl = document.getElementById('cpuUsage');
            const cpuPercentEl = document.getElementById('cpuPercent');
            const mongoCountEl = document.getElementById('mongoCount');
            const kafkaInflightEl = document.getElementById('kafkaInflight');
            const processedPerSecEl = document.getElementById('processedPerSec');
            const queueSizeEl = document.getElementById('queueSize');

            if (ramUsageEl) ramUsageEl.style.width = ramUsage + '%';
            if (ramPercentEl) ramPercentEl.textContent = ramUsage.toFixed(0) + '%';
            if (cpuUsageEl) cpuUsageEl.style.width = cpuUsage + '%';
            if (cpuPercentEl) cpuPercentEl.textContent = cpuUsage.toFixed(0) + '%';
            if (mongoCountEl) mongoCountEl.textContent = mongoCount.toLocaleString();
            if (kafkaInflightEl) kafkaInflightEl.textContent = kafkaInflight.toLocaleString();
            if (processedPerSecEl) processedPerSecEl.textContent = processedPerSec;
            if (queueSizeEl) queueSizeEl.textContent = queueSize;
        }

        function createChart() {
            const chart = document.getElementById('mainChart');
            if (!chart) return;
            
            chart.innerHTML = '';
            for (let i = 0; i < 100; i++) {
                const line = document.createElement('div');
                line.className = 'chart-line';
                line.style.left = i * 2 + 'px';
                line.style.height = Math.random() * 180 + 20 + 'px';
                line.style.animationDelay = Math.random() * 2 + 's';
                chart.appendChild(line);
            }
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Dashboard initializing...');
            
            // Initialize visual effects
            createMatrixRain();
            
            // Initialize weather
            initWeather();
            
            // Initialize system monitoring
            updateTime();
            updateMetrics();
            createChart();
            
            // Set up update intervals
            setInterval(updateTime, 1000);
            setInterval(updateMetrics, 2000);
            setInterval(createChart, 5000);
            setInterval(animateCores, 3000);
            
            // Update system alert after modules load
            setTimeout(() => {
                const alertElement = document.getElementById('systemAlert');
                if (alertElement) {
                    alertElement.innerHTML = '✅ All systems online <span class="terminal-cursor"></span>';
                }
            }, 2000);
            
            console.log('Dashboard initialization complete');
        });

        // Handle window resize for matrix effect
        window.addEventListener('resize', createMatrixRain);
    </script>