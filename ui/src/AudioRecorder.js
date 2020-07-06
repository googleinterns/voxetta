export class AudioRecorder {
    /**
     * Creates an AudioRecorder that can record utterances
     * @param {String} recordingUrl - A URL that allows access to an audio file after recording.
     * @param {Blob} blob - An audio recording file. 
     * @param {Object} mediaRecorder - Allows access to Web Audio API.
     */
    constructor() {
        this.recordingUrl;
        this.blob;
        this.mediaRecorder;
    }

    /**
     * Prompts user for access to Microphone Component and begins recording if access is granted.
     */
    startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder = mediaRecorder;
                mediaRecorder.start();
            }).catch(function(err) {
                alert("Error: Need access to microphone to record.");
            });
    }

    /**
     * Stops Microphone recording and obtains the relevant audio Blob and corresponding URL. 
     * @returns {Object} Audio object containing an audio Blob and its corresponding URL.
     */
    stopRecording() {
        if(this.mediaRecorder != null) {
            this.mediaRecorder.stop();

            return new Promise(resolve => {
                this.mediaRecorder.ondataavailable = (e) => {
                    this.blob = new Blob([e.data], { type : 'audio/webm;' });
                    this.recordingUrl = window.URL.createObjectURL(this.blob);
                    const audio = {blob: this.blob, recordingUrl: this.recordingUrl};
                    resolve(audio);
                };
            });
        } else {
            alert("Error: Could not record successfully.");
            return null;
        }
    }   
}