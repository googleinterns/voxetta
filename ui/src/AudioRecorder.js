export class AudioRecorder {

    constructor() {
        this.recordingUrl = "";
        this.mediaRecorder;
    }

    startRecording() {
        let self = this;
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(function(stream) {

            const mediaRecorder = new MediaRecorder(stream);
            self.mediaRecorder = mediaRecorder;
            mediaRecorder.start();

        });
    }

    stopRecording() {
        this.mediaRecorder.stop();

        return new Promise(resolve => {
            this.mediaRecorder.ondataavailable = (e) => {
                const blob = new Blob([e.data], { type : 'audio/webm;' });
                this.recordingUrl = window.URL.createObjectURL(blob);
                resolve(this.recordingUrl);
            };
        });

    }

    getRecordedAudio(){
        return this.recordingUrl;
    }
}