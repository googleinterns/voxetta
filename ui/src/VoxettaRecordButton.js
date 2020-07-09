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

import {LitElement, html, css} from 'lit-element';

import {AudioRecorder} from './AudioRecorder';
import {UtteranceApiService} from './UtteranceApiService';

/**
 * Button responsible for enabling the user to record and upload audio files. 
 */
export class VoxettaRecordButton extends LitElement {
    static get properties() {
        return {
            isRecording: {type: Boolean}
        };
    }

    constructor() {
        super();
        this.isRecording = false;
        this.audioRecorder = new AudioRecorder();
        this.utteranceService = new UtteranceApiService(); 
    }
  
    render() {
        return html`
            <button @click=${this.recordHandler}>Record Voice</button>
            <audio id="utterance" controls src="" style="display: none"></audio>
        `;
    }
    /**
     * If the user is not currently recording, begin recording using the Microphone 
     * component. Otherwise, stop recording and save and display the just-recorded 
     * audio file.
     */
    async recordHandler(){
        if (!this.isRecording) {
            if (this.audioRecorder.startRecording()) {
                this.isRecording = true;
            }
        } else {
            this.isRecording = false;
            const audioSave = this.shadowRoot.getElementById("utterance");
            const audio = await this.audioRecorder.stopRecording();
            
            // If non-empty, save and display the just-recorded audio file
            if (audio.recordingUrl) {
                audioSave.src = audio.recordingUrl;
                audioSave.style.display = "block";
                this.utteranceService.saveAudio(audio);
            }
        }
    }
}

customElements.define('vox-record-button', VoxettaRecordButton);
