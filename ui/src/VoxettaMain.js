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

export class VoxettaMain extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            page: {type: String},
        };
    }

    static get styles() {
        return css``;
    }

    render() {
        return html`
            <main>
                Welcome to the Voxetta app
            </main>
        `;
    }
}

customElements.define('voxetta-main', VoxettaMain);


navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {

        const recordButton = document.getElementById("recordButton");
        const audioSave = document.getElementById("utterance");
        let isRecording = false;
        let recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        
        recordButton.addEventListener('click', (ev)=>{
            if(!isRecording){
                isRecording = true;
                mediaRecorder.start();
            }else{
                isRecording = false;
                mediaRecorder.stop();
                audioSave.style.display = "block";
            }
        })

        mediaRecorder.ondataavailable = function(ev) {
            recordedChunks.push(ev.data);
        }

        mediaRecorder.onstop = (ev)=>{
            let blob = new Blob(recordedChunks, { 'type' : 'audio/mp3;' });
            recordedChunks = [];
            let recordingURL = window.URL.createObjectURL(blob);
            audioSave.src = recordingURL;
        }
    });