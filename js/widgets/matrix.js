// Matrix Effects - js/effects/matrix.js

class MatrixEffect {
    constructor() {
        this.matrixBg = document.getElementById('matrixBg');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.animationFrameId = null;
    }

    createMatrixRain() {
        if (!this.matrixBg) return;

        this.matrixBg.innerHTML = '';
        const count = window.innerWidth < 768 ? 20 : 50;
        
        for (let i = 0; i < count; i++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = this.chars[Math.floor(Math.random() * this.chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDelay = Math.random() * 3 + 's';
            char.style.animationDuration = (3 + Math.random() * 2) + 's';
            this.matrixBg.appendChild(char);
        }
    }

    updateChars() {
        if (!this.matrixBg) return;
        
        const chars = this.matrixBg.querySelectorAll('.matrix-char');
        chars.forEach(char => {
            if (Math.random() < 0.1) { // 10% chance to change character
                char.textContent = this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        });
    }

    startAnimation() {
        const animate = () => {
            this.updateChars();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    handleResize() {
        this.createMatrixRain();
    }

    init() {
        console.log('Initializing Matrix Effect...');
        this.createMatrixRain();
        this.startAnimation();
        
        window.addEventListener('resize', () => this.handleResize());
        console.log('Matrix Effect initialized');
    }

    destroy() {
        this.stopAnimation();
        window.removeEventListener('resize', this.handleResize);
        if (this.matrixBg) {
            this.matrixBg.innerHTML = '';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const matrixEffect = new MatrixEffect();
    matrixEffect.init();
});