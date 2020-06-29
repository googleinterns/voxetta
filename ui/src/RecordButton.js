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

export class RecordButton extends LitElement {
    render() {  
        return html`

            <button id="recordButton">Record Voice</button>
            <audio id="utterance" controls src="" style="display: none"></audio>

        `;
    }

    firstUpdated() {

        let isRecording = false;
        const recordButton = this.shadowRoot.getElementById("recordButton");
        const audioSave = this.shadowRoot.getElementById("utterance");
        let audioRecorder = new AudioRecorder();

        recordButton.addEventListener('click', async (e) => {
            if (!isRecording) {
                isRecording = true;
                audioRecorder.startRecording();
            } else {
                isRecording = false;
                const recordingUrl = await audioRecorder.stopRecording();
                audioSave.src = recordingUrl;
                audioSave.style.display = "block";
            }
        });
        
    }
}

customElements.define('record-button', RecordButton);