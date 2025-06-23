document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for encryption effect
    const plainChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const encryptedChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    class EncryptionParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.originalX = x;
            this.originalY = y;
            this.char = plainChars[Math.floor(Math.random() * plainChars.length)];
            this.targetChar = encryptedChars[Math.floor(Math.random() * encryptedChars.length)];
            this.isEncrypted = false;
            this.encryptionProgress = 0;
            this.speed = (Math.random() * 0.5) + 0.2;
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = (Math.random() - 0.5) * 0.02;
            this.radius = (Math.random() * 50) + 20;
            this.opacity = 0.7;
            this.size = (Math.random() * 8) + 25;
        }

        draw() {
            ctx.font = `${this.size}px "Courier New", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Interpolate between plain and encrypted characters
            const currentChar = this.isEncrypted ? this.targetChar : this.char;
            
            // Color transition from white to purple
            const r = Math.floor(255 * (1 - this.encryptionProgress));
            const g = Math.floor(255 * (1 - this.encryptionProgress));
            const b = Math.floor(255 * (1 - this.encryptionProgress) + 108 * this.encryptionProgress);
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.fillText(currentChar, this.x, this.y);
        }

        update() {
            // Complex movement pattern
            this.angle += this.angleSpeed;
            this.x = this.originalX + Math.cos(this.angle) * this.radius;
            this.y = this.originalY + Math.sin(this.angle) * this.radius;
            
            // Encryption progress
            this.encryptionProgress += this.speed * 0.01;
            if (this.encryptionProgress >= 1) {
                this.encryptionProgress = 0;
                this.isEncrypted = !this.isEncrypted;
                this.char = plainChars[Math.floor(Math.random() * plainChars.length)];
                this.targetChar = encryptedChars[Math.floor(Math.random() * encryptedChars.length)];
            }
            
            this.draw();
        }
    }

    let particles = [];

    function init() {
        particles = [];
        const numberOfParticles = 10;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new EncryptionParticle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
        });
        
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
}); 