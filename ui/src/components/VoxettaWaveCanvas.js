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

/**
 * Canvas responsible for holding soundwave once user starts recording
 */
export class VoxettaWaveCanvas extends LitElement {
    static get properties() {
        return {
            canvasId: {type: String},
            canvas: {type: Object},
            audioStream: {type: Object},
            isRecording: {type: Boolean},
            width: {type: Number},
            height: {type: Number},
        };
    }

    constructor() {
        super();
        this.soundWave;
        this.canvasId = 'myCanvas';
        this.canvas;
        this.width = this.getWidth();
        this.height = 100;
    }

    /**
     * Changes the width of the canvas depending on device width.
     */
    getWidth() {
        const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        return Math.min(400, width - 100);
    }

    /**
     * Creates the instance of soundwave once canvas is created .
     */
    firstUpdated() {
        this.canvas = this.shadowRoot.getElementById(this.canvasId);
        this.soundWave = new SoundWave(this.canvas, this.audioStream);
    }

    /**
     * Once the button is pressed and user starts recording, pass the stream and
     * canvas to create a soundwave. If the user stops recording, stop showing
     * the soundwave on the canvas.
     */
    updated(changedProperties) {
        if (
            this.audioStream != changedProperties.get('audioStream') &&
            this.isRecording
        ) {
            this.soundWave.setStream(this.audioStream);
            this.soundWave.createSoundWave();
        } else if (!this.isRecording && this.soundWave != undefined) {
            this.soundWave.stopSoundWave();
        }
    }

    render() {
        return html`
            <canvas
                id=${this.canvasId}
                width="${this.width}"
                height="${this.height}"
            ></canvas>
        `;
    }
}

customElements.define('vox-sound-wave', VoxettaWaveCanvas);
