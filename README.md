# 🚀 Live System Monitor Dashboard

Um dashboard em tempo real - gráficos interativos e dados ao vivo.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## ✨ Características Principais

### 🎯 **Interface Futurística**
- **Elementos Holográficos**: Painéis com efeitos de holograma e neon
- **Animações Glitch**: Efeitos de falha digital nos títulos
- **Partículas Flutuantes**: Elementos visuais dinâmicos
- **Scan Lines**: Linhas de varredura para efeito retrô-futurista

### 📊 **Monitoramento do Sistema**
- **CPU & RAM**: Monitoramento em tempo real de recursos
- **Temperatura**: Sensor de temperatura do sistema
- **Uptime**: Tempo de atividade do sistema
- **Cores do CPU**: Visualização individual dos núcleos
- **Rede**: Gráfico de conexões de rede animado

### ⚡ **Widgets Produtivos**

#### 🌤️ **Climate Status**
- Dados meteorológicos em tempo real
- Múltiplas cidades 
- Previsão de 5 dias
- Temperatura, umidade e velocidade do vento

#### 💰 **Crypto Tracker**
- Monitoramento de criptomoedas 
- Gráficos de preço em tempo real
- Variações de 1h, 4h, 24h e 7 dias
- Interface com Chart.js

#### 🍅 **Pomodoro Timer**
- Timer personalizável para produtividade
- Configuração de tempo de trabalho e pausa
- Controles de play/pause/reset
- Status visual do timer

#### 📋 **Sistema de Produtividade**
- **To-Do List**: Lista de tarefas interativa
- **System Notes**: Bloco de anotações
- **Quick Calculator**: Calculadora rápida
- **Clipboard Manager**: Gerenciador de área de transferência
- **Media Tracker**: Rastreador de mídia
- **Focus Mode**: Modo de foco para concentração

#### 🕐 **Universal Time Coordinates**
- Relógio UTC em tempo real
- Progress bars para ciclos de hora/minuto/dia/ano
- Stardate (data estelar) no estilo Star Trek
- Status GPS e sincronização

#### 💾 **Dados do Sistema**
- **Memory Status**: RAM, Swap, Cache, Buffer
- **Database Status**: MongoDB com contadores dinâmicos
- **Data Pipeline**: Kafka queue, processamento por segundo

## 🛠️ **Tecnologias Utilizadas**

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Animações avançadas, Grid Layout, Flexbox
- **JavaScript ES6+**: Módulos, Async/Await, Classes
- **Chart.js**: Gráficos interativos e responsivos

### APIs & Serviços
- **OpenWeatherMap**: Dados meteorológicos
- **CoinGecko**: Preços de criptomoedas
- **WebRTC**: Recursos do navegador
- **Local Storage**: Persistência de dados

### Bibliotecas
- **Chart.js 4.4.0**: Visualização de dados
- **CSS Grid & Flexbox**: Layout responsivo
- **Custom CSS Animations**: Efeitos visuais únicos

## 🚀 **Instalação e Uso**

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para APIs externas)
- Servidor web local (opcional, mas recomendado)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/niloRoch/live-system-monitor.git

# Entre no diretório
cd live-system-monitor

# Serve os arquivos (exemplo com Python)
python -m http.server 8000

# Ou use qualquer servidor web de sua preferência
# Live Server (VS Code), XAMPP, NGINX, etc.
```

## 📁 **Estrutura do Projeto**

```
📦 live-system-monitor/
├── 📄 index.html                 # Página principal
├── 📁 css/
│   └── 📄 styles.css            # Estilos principais
├── 📁 js/
│   ├── 📄 app.js                # Aplicação principal
│   ├── 📁 widgets/              # Scripts dos widgets
│   │   ├── 📄 main.js           # Widget principal
│   │   ├── 📄 weather.js        # Widget do clima
│   │   ├── 📄 crypto.js         # Widget crypto
│   │   ├── 📄 pomodoro.js       # Timer Pomodoro
│   │   ├── 📄 time.js           # Widgets de tempo
│   │   └── 📄 [outros...]       # Demais widgets
│   └── 📁 effects/              # Efeitos visuais
│       ├── 📄 matrix.js         # Efeito Matrix
│       └── 📄 system-monitor.js # Animações do sistema
└── 📄 README.md                 # Este arquivo
```

## 🎨 **Personalização**

### Modificar Cores do Tema
```css
:root {
  --neon-primary: #00ff41;    /* Verde Matrix */
  --neon-secondary: #ff0080;  /* Rosa neon */
  --bg-primary: #0a0a0a;     /* Fundo escuro */
  --text-primary: #00ff41;   /* Texto principal */
}
```

### Adicionar Novos Widgets
1. Crie um arquivo JavaScript em `js/widgets/`
2. Implemente a classe do widget
3. Adicione o HTML correspondente
4. Inclua o script no `index.html`

### Personalizar APIs
- **Weather**: Obtenha uma chave API do OpenWeatherMap
- **Crypto**: Configure endpoints da CoinGecko
- **Dados do Sistema**: Integre com suas próprias APIs

## 🔧 **Configuração**

### Variáveis de Ambiente
```javascript
// js/config.js
const CONFIG = {
  WEATHER_API_KEY: 'sua_chave_aqui',
  UPDATE_INTERVALS: {
    weather: 300000,    // 5 minutos
    crypto: 30000,      // 30 segundos
    system: 1000        // 1 segundo
  }
}
```

### APIs Utilizadas
- **OpenWeatherMap**: Clima em tempo real
- **CoinGecko**: Dados de criptomoedas
- **Navigator API**: Informações do sistema

## 🚨 **Recursos Importantes**

### Performance
- **Lazy Loading**: Widgets carregam sob demanda
- **Throttled Updates**: Atualizações otimizadas
- **Memory Management**: Limpeza automática de recursos

### Responsividade
- **Mobile First**: Design responsivo
- **Touch Friendly**: Interface otimizada para touch
- **Cross Browser**: Compatibilidade ampla

### Acessibilidade
- **ARIA Labels**: Rótulos para leitores de tela
- **Keyboard Navigation**: Navegação por teclado
- **High Contrast**: Suporte a alto contraste

## 🤝 **Contribuição**

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Diretrizes
- Mantenha o código limpo e documentado
- Teste em múltiplos navegadores
- Siga os padrões de codificação existentes
- Atualize a documentação quando necessário

## 📝 **Licença**

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 **Contato**

**Nilo Roch** - [@niloRoch](https://github.com/niloRoch)

**Link do Projeto**: [https://github.com/niloRoch/live-system-monitor](https://github.com/niloRoch/live-system-monitor)

---

⭐
