class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.isActive = false;
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.start();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        this.isActive = true;
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#ff4500', '#0079d3', '#24a0ed', '#46d160', '#ffd635'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + '20'; // Add transparency
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.isActive = false;
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Global instance
window.particleSystem = new ParticleSystem();