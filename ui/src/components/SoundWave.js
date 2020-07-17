/**
 * Responsible for creating soundwave 
 */
export class SoundWave {

   /**
    * Creates a soundwave based off the loudness of the user
    * @param {Object} canvas - A canvas to draw the soundwave on
    * @param {Object} stream - stream the soundwave will be created off 
    * @private {Object} Allows for the stream to be analyzed 
    * @private {Number} Id needed to stop animation 
    * @private {Array} Array used to store "loudness" of stream 
    * @private {Object} Allows for the soundwave to be drawn on the canvas 
    */
    constructor(canvas, stream, context, canvasCtx, analyser, freqs) {
        this.canvas = canvas;
        this.stream = stream;
        this.analyser = analyser;
        this.stopId = undefined;
        this.freqs = freqs;
        this.source = undefined;
        this.context = context;
        this.canvasCtx = canvasCtx;
    }

   /**
    * Setter to update value of the constructor's stream property
    */
    setStream(stream) {
        this.stream = stream;
    }

   /**
    * Setter to update value of the constructor's context property
    */
    setContext(context) {
        this.context = context;
    }

    /**
     * Creates and uses the analyser node to start analysing the stream as it's coming in
     */
    createSoundWave() {
        this.canvasCtx = this.canvas.getContext('2d');
        const context = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = context.createAnalyser();
        const source = context.createMediaStreamSource(this.stream);
        source.connect(this.analyser);
        this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
        this.stopId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Stops the stream and soundwave from appearing on the canvas.
     */
    stopSoundWave() {
        this.stream = undefined;
        cancelAnimationFrame(this.stopId);
    }

    /**
     * Draws the soundwave to the canvas.
     */
    draw() {
        const bars = 200;
        this.canvasCtx.fillStyle = "white";
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if(!this.stream) {
            return;
        }
        this.analyser.getByteFrequencyData(this.freqs);
        let isInversed = true;
        for (let i = 0; i < bars; i++) {
            const radians = (Math.PI * 2) / bars;
            const barHeight = this.freqs[i] * 0.5;
            const xStart = (i*2);
            const yStart = this.canvas.height / 2;
            const xEnd = (i*2);
            let yEnd;
            if(isInversed) {
                isInversed = false;
                yEnd = this.canvas.height / 2 + Math.cos(radians * i) * (barHeight);
            } else {
                isInversed = true;
                yEnd = this.canvas.height / 2 - Math.cos(radians * i) * (barHeight);
            }
            const color = `rgb(${237}, ${73}, ${62})`;
            this.canvasCtx.strokeStyle = color;
            this.canvasCtx.lineWidth = 1;
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(xStart, yStart);
            this.canvasCtx.lineTo(xEnd, yEnd);
            this.canvasCtx.stroke();
        }
        requestAnimationFrame(() => this.draw());
    }
}