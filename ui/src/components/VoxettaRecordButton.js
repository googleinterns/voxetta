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

import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';

import {Icon} from '@material/mwc-icon';

/**
 * Button responsible for enabling the user to record and upload audio files. 
 */
export class VoxettaRecordButton extends LitElement {
    static get properties() {
        return {
            isRecording: {type: Boolean},
            audioStream: {type: Object}
        };
    }

    static get styles() {
        return css`
            div {
                align-items: center; 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap;
                justify-content: center; 
                text-align: center;  
            }
            mwc-icon-button {
                --mdc-icon-button-size: 80px;
                --mdc-icon-size: 40px; 
                border-radius: 50%;
                box-shadow: 0px 8px 15px #dcdcdc;
                color: #3c4043;
            }
        `;
    }

    constructor() {
        super();
        this.isRecording = false;
        this.audioRecorder = new AudioRecorder();
        this.utteranceService = new UtteranceApiService();
        this.audioStream; 
    }
  
    /**
     * If the user is not currently recording, begin recording using the Microphone 
     * component. Otherwise, stop recording and save and display the just-recorded 
     * audio file.
     */
    async recordHandler() {
        if (!this.isRecording) {
            try { 
                await this.audioRecorder.initRecorder();
            } catch(e) { 
                console.log("Microphone blocked"); 
            }
            if (this.audioRecorder.startRecording()) {
                this.isRecording = true;
                this.styleOnButton(); 
            }
            this.audioStream = this.audioRecorder.stream;
        } else {
            this.isRecording = false;
            this.styleOffButton();
            this.handleFinish();
            const audio = await this.audioRecorder.stopRecording();
            if (audio.recordingUrl) {
                // NOTE: removed for Monday presentation
                //const audioSave = this.shadowRoot.getElementById("utterance");
                //audioSave.src = audio.recordingUrl;            
                //audioSave.style.display = "block";
                this.utteranceService.saveAudio(audio);
            }
        }
    }

    /**
     * Styles the recording button to its recording-state style.
     */
    styleOnButton() {
        const button = this.shadowRoot.getElementById("record-button");
        button.icon = "stop";
        button.style.color = "white";
        button.style.backgroundColor = "red";
    }

    /**
     * Styles the recording button to its non-recording-state style.
     */
    styleOffButton() {
        const button = this.shadowRoot.getElementById("record-button");
        button.icon = "mic";
        button.style.color = "#3c4043";
        button.style.backgroundColor = "white";
    }

    /**
     * Emits an event that causes the application to render a sound
     * wave that corresponds to the current audio stream. 
     */
    handleStateChange() {
        const event = new CustomEvent('record-state-change', {
            detail: { 
                isRecording: this.isRecording,
                audioStream: this.audioStream
            }
        });
        this.dispatchEvent(event);
    }

    /**
     * Emits an event that causes a new prompt to be rendered
     * on the recording page. 
     */
    handleFinish() {
        const event = new CustomEvent('next-prompt', {});
        this.dispatchEvent(event);
    }
    
    render() {
        this.handleStateChange();
        return html`
            <mwc-icon-button 
                id="record-button"
                icon="mic"
                @click=${this.recordHandler}>
            </mwc-icon-button>
            <!-- <audio id="utterance" controls src="" style="display: none"></audio> -->
        `;
    }
}

customElements.define('vox-record-button', VoxettaRecordButton);
