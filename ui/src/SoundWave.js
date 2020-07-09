export class SoundWave {

    constructor(canvas, stream){
        this.canvas = canvas;
        this.stream = stream;
        this.analyser = undefined;
        this.id = undefined;
        this.freqs = undefined;
        this.ctx = undefined;
        this.draw = this.draw.bind(this);
    }

    createSoundWave(){

        this.ctx = this.canvas.getContext("2d");
        const context = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = context.createAnalyser();
        const source = context.createMediaStreamSource(this.stream);
        source.connect(this.analyser);

        this.freqs = new Uint8Array(this.analyser.frequencyBinCount);

        this.id = requestAnimationFrame(this.draw);
    }

    stopSoundWave(){
        this.stream = undefined;
        cancelAnimationFrame(this.id);
    }

    draw() {
            let bars = 200;

            // Draw Background
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw bars
            this.analyser.getByteFrequencyData(this.freqs);
            

            let temp = true;
            for (var i = 0; i < bars; i++) {
                let radians = (Math.PI * 2) / bars;
                let bar_height = this.freqs[i] * 0.5;
                let x = (i*2);
                let y = this.canvas.height / 2;
                let x_end = (i*2);
                let y_end;
                if(temp){
                    temp = false;
                    y_end = this.canvas.height / 2 + Math.cos(radians * i) * (bar_height);
                }else{
                    temp = true;
                    y_end = this.canvas.height / 2 - Math.cos(radians * i) * (bar_height);
                }
                let color = "rgb(" + 237 + ", " + 73 + ", " + 62 + ")";
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x_end, y_end);
                this.ctx.stroke();
            }

            //this.stream gets overriden to the stream even after stopSoundWave is called
            if(this.stream != undefined){
                this.id = requestAnimationFrame(this.draw);
            } else {
                return;
            }
    }
}