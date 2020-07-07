export class AudioRecorder {
    /**
     * Creates an AudioRecorder that can record utterances
     * @param {String} stores and allows access to utterance after recording
     * @param {Object} allows access to Web Audio API
     */
    constructor() {
        this.recordingUrl;
        this.mediaRecorder;
    }
    /**
     * Prompts user for access to Microphone using API and starts recording is access granted
     */
    startRecording() {
        navigator.mediaDevices
            .getUserMedia({audio: true, video: false})
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder = mediaRecorder;
                mediaRecorder.start();
            })
            .catch(function (err) {
                console.log(err.name, err.message); // Is this good to have or is just the alert fine?
                alert('need access to microphone to record');
            });
    }
    /**
     * Stops recording and stores utterance data in Url if recording
     * @return {String} Url to access utterance
     */
    stopRecording() {
        if (this.mediaRecorder != null) {
            this.mediaRecorder.stop();

            return new Promise((resolve) => {
                this.mediaRecorder.ondataavailable = (e) => {
                    const blob = new Blob([e.data], {type: 'audio/webm;'});
                    this.recordingUrl = window.URL.createObjectURL(blob);
                    resolve(this.recordingUrl);
                };
            });
        } else {
            alert('Could not record successfully');
            return null;
        }
    }
}
