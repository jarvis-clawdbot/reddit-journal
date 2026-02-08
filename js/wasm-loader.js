class WASMCalculator {
    constructor() {
        this.module = null;
        this.instance = null;
        this.initialized = false;
    }

    async init() {
        try {
            // Convert WAT to WASM using WebAssembly
            const response = await fetch('/wasm/vote-counter.wat');
            const watCode = await response.text();
            
            const wasmModule = await WebAssembly.compile(new TextEncoder().encode(watCode));
            this.instance = await WebAssembly.instantiate(wasmModule);
            
            this.calculateHotScore = this.instance.exports.calculateHotScore;
            this.calculateControversy = this.instance.exports.calculateControversy;
            this.initialized = true;
            
            console.log('✅ WebAssembly module loaded successfully');
            return true;
        } catch (error) {
            console.warn('⚠️ WebAssembly failed, falling back to JavaScript:', error);
            this.fallbackToJS();
            return false;
        }
    }

    fallbackToJS() {
        this.calculateHotScore = (upvotes, downvotes, timestamp) => {
            const score = Math.max(upvotes - downvotes, 1);
            const order = Math.log10(score);
            const seconds = timestamp / 1000;
            return order + seconds / 45000;
        };

        this.calculateControversy = (upvotes, downvotes) => {
            const total = upvotes + downvotes;
            const difference = Math.max(Math.abs(upvotes - downvotes), 1);
            return total / difference;
        };

        this.initialized = true;
    }

    getHotScore(post) {
        if (!this.initialized) {
            console.warn('WASM not initialized');
            return 0;
        }
        
        const timestamp = new Date(post.date).getTime();
        return this.calculateHotScore(post.votes, 0, timestamp);
    }

    getControversy(post) {
        if (!this.initialized) {
            console.warn('WASM not initialized');
            return 0;
        }
        
        return this.calculateControversy(post.votes, 0);
    }
}

// Create global instance
window.wasmCalculator = new WASMCalculator();