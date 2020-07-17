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
import {styleMap} from 'lit-html/directives/style-map.js';

import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';

import {Icon} from '@material/mwc-icon';

// Styling for the button when the user is not recording
let nonRecordingStyle = { 
    backgroundColor: 'white', 
    color: '#3c4043' 
};

// Styling for the button when the user is recording
let recordingStyle = { 
    backgroundColor: 'red', 
    color: 'white' 
};

/**
 * Button responsible for enabling the user to record and upload audio files. 
 */
export class VoxettaRecordButton extends LitElement {
    static get properties() {
        return {
            isRecording: {type: Boolean},
            audioStream: {type: Object},
            context: {type: Object},
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
        this.context; 
    }

    updated() {
        this.handleWaveCanvas();
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
                alert(`Error: Microphone access is currently blocked for this site. 
                    To unblock, please navigate to chrome://settings/content/microphone 
                    and remove this site from the 'Block' section.`);
                return;
            }

            if (!this.audioRecorder.startRecording()) {
                 alert('Failed to start recording.')
                 return; 
            }
            this.isRecording = true;
            this.audioStream = this.audioRecorder.stream;
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } else {
            this.isRecording = false;
            this.handleFinish();
            const audio = await this.audioRecorder.stopRecording();
            if (audio.recordingUrl) {
                this.utteranceService.saveAudio(audio);
            }
        }
    }

    /**
     * Returns whether or not the application is actively recording. 
     * @returns {Boolean} Whether or not the application is actively 
     *  recording. 
     */
    getIsRecording() {
        return this.isRecording;
    }

    /**
     * Returns the current audio stream being recorded. 
     * @returns {Object} The current audio stream being
     *  recorded. 
     */
    getAudioStream() {
        return this.audioStream; 
    }

    /**
     * Returns the context of the audio. 
     * @returns {Object} The current context for the audio.
     */
    getContext() {
        return this.context; 
    }

    /**
     * Emits an event that causes the application to render a sound
     * wave that corresponds to the current audio stream. 
     */
    handleWaveCanvas() {
        const event = new CustomEvent('update-wave', {
            detail: { 
                isRecording: this.isRecording,
                audioStream: this.audioStream,
                context: this.context,
            }
        });
        this.dispatchEvent(event);
    }

    /**
     * Emits an event that causes a new prompt to be rendered
     * on the recording page. 
     */
    handleFinish() {
        const event = new CustomEvent('change-prompt', {});
        this.dispatchEvent(event);
    }
    
    render() {
        return html`
            <mwc-icon-button 
                id="record-button"
                icon=${this.isRecording ? "stop" : "mic"}
                style=${styleMap(this.isRecording ? recordingStyle : nonRecordingStyle)}
                @click=${this.recordHandler}>
            </mwc-icon-button>
        `;
    }
}

customElements.define('vox-record-button', VoxettaRecordButton);
