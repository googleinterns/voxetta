/*
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

/**
 * Responsible for enabling and recording via the Web Audio API.  
 */
export class AudioRecorder {
    
    /**
     * Create an AudioRecorder that can record utterances.
     */
    constructor() {
        /**
         * Allows access to Web Audio API.
         * @private
         */
        this.mediaRecorder_;
    }

    /**
     * Prompts user for access to Microphone Component and begins recording if access is granted.
     * @returns {Boolean} Denotes whether or not the recording successfully began.
     */
    startRecording() {
        const success = true; 
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder = mediaRecorder; 
                mediaRecorder.start();
            }).catch(function() {
                alert(`Error: Microphone access is currently blocked for this site. To unblock, please navigate to 
                    chrome://settings/content/microphone and remove this site from the 'Block' section.`);
                success = false; 
            });
        return success;  
    }

    /**
     * Stops Microphone recording and obtains the relevant audio Blob and corresponding URL. 
     * @returns {Object} Audio object containing an audio Blob and its corresponding URL.
     */
    stopRecording() {
        if(this.mediaRecorder) {
            this.mediaRecorder.stop();
            return new Promise(resolve => {
                this.mediaRecorder.ondataavailable = (e) => {
                    const blob = new Blob([e.data], { type : 'audio/webm;' });
                    const recordingUrl = window.URL.createObjectURL(blob);
                    const audio = {blob: blob, recordingUrl: recordingUrl};
                    resolve(audio);
                };
            });
        } else {
            alert("Error: Could not record successfully.");
            return null;
        }
    }   
}