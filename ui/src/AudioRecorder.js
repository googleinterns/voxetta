export class AudioRecorder {

    constructor() {
        this.recordingUrl = "";
        this.mediaRecorder = "";
        this.recordedChunks = [];
    }

    startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(function(stream) {

            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();

        });
    }

    stopRecording() {
        this.mediaRecorder.stop();

        this.mediaRecorder.ondataavailable = function(ev) {
            this.recordedChunks.push(ev.data);
        }

        this.mediaRecorder.onstop = (ev)=>{
            const blob = new Blob(recordedChunks, { type : 'audio/mp3;' });
            this.recordedChunks = [];
            this.recordingUrl = window.URL.createObjectURL(blob);
        }
    }

    getRecordedAudio(){
        return this.recordingURL;
    }
}