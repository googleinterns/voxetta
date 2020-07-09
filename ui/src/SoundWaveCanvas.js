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

import {SoundWave} from './SoundWave';
import {LitElement, html, css} from 'lit-element';

export class SoundWaveCanvas extends LitElement {
    static get properties() {
        return {
            canvasId: {type: String},
            canvas: {type: Object},
            audioStream: {type: Object},
            isRecording: {type: Boolean}
        };
    }
    constructor() {
        super();
        this.soundWave;
        this.canvasId = "myCanvas";
        this.canvas;
    }
    render() {  
        return html`
            <canvas id=${this.canvasId} width="400" height="400"></canvas> 
        `;
    }

    updated(changedProperties){
        if(this.audioStream != changedProperties.get("audioStream") && this.isRecording) {
            this.canvas = this.shadowRoot.getElementById(this.canvasId);
            this.soundWave = new SoundWave(this.canvas, this.audioStream);
            this.soundWave.createSoundWave();
        } else if (!this.isRecording && this.soundWave != undefined) {
            this.soundWave.stopSoundWave();
        }
    }
}

customElements.define('vox-sound-wave', SoundWaveCanvas);