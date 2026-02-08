// WebAssembly Loader - Fallback implementation
window.wasmCalculator = {
    async init() {
        console.log('⚠️ WebAssembly not available, using JavaScript fallback');
        return true;
    },
    
    calculateHotScore(upvotes, downvotes, timestamp) {
        const score = Math.max(upvotes - downvotes, 1);
        const order = Math.log10(score);
        const seconds = timestamp / 1000;
        return order + seconds / 45000;
    },
    
    calculateControversy(upvotes, downvotes) {
        const total = upvotes + downvotes;
        const difference = Math.max(Math.abs(upvotes - downvotes), 1);
        return total / difference;
    }
};