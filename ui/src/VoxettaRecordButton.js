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

import {AudioRecorder} from './AudioRecorder';
import {LitElement, html, css} from 'lit-element';

/**
 * Component responsible for recording and uploading audio files. 
 */
export class VoxettaRecordButton extends LitElement {
    static get properties() {
        return {
            isRecording: {type: Boolean},
            audioRecorder: {type: Object},
        };
    }

    constructor() {
        super();
        this.isRecording = false;
        this.audioRecorder = new AudioRecorder();
    }

    render() {
        this.getUploadUrl();  
        return html`
            <button @click=${this.recordHandler}>Record Voice</button>
            <audio id="utterance" controls src="" style="display: none"></audio>
        `;
    }

    /**
     * If the user is not currently recording, begin recording using the Microphone component. Otherwise,
     * stop recording and save and display the just-recorded audio file.
     */
    async recordHandler(){
        if (!this.isRecording) {
            this.isRecording = true;
            this.audioRecorder.startRecording();
        } else {
            this.isRecording = false;
            const audioSave = this.shadowRoot.getElementById("utterance");
            const audio = await this.audioRecorder.stopRecording();
            
            // If non-empty, save and display the just-recorded audio file
            if(audio.recordingUrl != null){
                audioSave.src = audio.recordingUrl;
                audioSave.style.display = "block";
                this.saveAudio(audio);
            }
        }
    }

    /**
     * Set the blobUrl property to be a Blobstore upload link. 
     */
    async getUploadUrl() {
        const response = await fetch('/blobstore-utterance-upload-link');
        const query = await response.json();

        if (query.success) {
            this.blobUrl = query.url; 
        } else {
            alert("Error: Unable to access database.");
        }
    } 

    /**
     * Save a recorded audio file to an external database. 
     * @param {Object} audio - An object containing an audio Blob and its corresponding URL.
     */
    async saveAudio(audio) {
        const formData = new FormData();
        formData.append('audio', audio.blob, 'blob');

        const response = await fetch(this.blobUrl, { 
            method: 'POST',
            body: formData 
        });
        const query = await response.json; 

        if (!query.success) {
            alert("Error: Unable to upload file.");
        } 
    }
}

customElements.define('vox-record-button', VoxettaRecordButton);