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

import {AudioRecorder} from '../AudioRecorder';
import {LitElement, html, css} from 'lit-element';

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
        return html`
            <button @click=${this.recordHandler}>Record Voice</button>
            <audio id="utterance" controls src="" style="display: none"></audio>
        `;
    }

    async recordHandler(e) {
        if (!this.isRecording) {
            this.isRecording = true;
            this.audioRecorder.startRecording();
        } else {
            const audioSave = this.shadowRoot.getElementById('utterance');
            this.isRecording = false;
            const recordingUrl = await this.audioRecorder.stopRecording();
            if (recordingUrl != null) {
                audioSave.src = recordingUrl;
                audioSave.style.display = 'block';
            }
        }
    }
}

customElements.define('vox-record-button', VoxettaRecordButton);
