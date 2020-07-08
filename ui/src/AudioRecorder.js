export class AudioRecorder {
    /**
    * Creates an AudioRecorder that can record utterances
    * @param {String} stores and allows access to utterance after recording
    * @param {Object} allows access to Web Audio API
    * @param {Object} Stores the recorded stream of the utterance 
    */
    constructor() {
        this.recordingUrl = undefined;
        this.mediaRecorder = undefined;
        this.stream = undefined;
    }
    
    /**
    * Prompts user for access to Microphone using API
    */
    initRecorder() {
      return new Promise(async (resolve, reject) => {
          try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            this.mediaRecorder = new MediaRecorder(this.stream);
          } catch(err) {
            console.log(err.name, err.message); 
            window.alert("need access to microphone to record");
            reject();
          }
          resolve();
      });
    }
    
    /**
    * Starts recording if access granted
    */
    startRecording() {
      if (!this.stream) {
        return;
      }
      
      this.mediaRecorder.start();
    }
    
    /**
    * Stops recording and stores utterance data in Url if recording
    * @returns {Object} Url to access utterance on the front end, and blob to access utterance in the back end
    */
    stopRecording() {
        if(this.mediaRecorder != null) {
            this.mediaRecorder.stop();

            return new Promise(resolve => {
                this.mediaRecorder.ondataavailable = (e) => {
                    const blob = new Blob([e.data], { type : 'audio/webm;' });
                    this.recordingUrl = window.URL.createObjectURL(blob);
                    const obj = {url: this.recordingUrl, blob};
                    resolve(obj);
                };
            });
        }else{
            alert("Could not record successfully");
            return null;
        }
    }
}