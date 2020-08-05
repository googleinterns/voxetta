/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {LitElement, html} from 'lit-element';

import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/RecordingSection.css';

export class RecordingSection extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
            audioStream: {type: Object},
            context: {type: Object},
            qcError: {type: String},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super()
    }
    
    isRecording() {
        return this.collectionState === CollectionStates.RECORDING;
    }

    renderFeedbackWindow() {
        switch (this.collectionState) {
            case CollectionStates.RECORDING:
                return html` <vox-sound-wave
                    ?isRecording=${this.isRecording()}
                    .audioStream=${this.audioStream}
                    .context=${this.context}
                >
                </vox-sound-wave>`;
            case CollectionStates.BEFORE_UPLOAD:
                return html`put play button here`;
            case CollectionStates.QC_ERROR:
                return html`<p>${this.qcError}</p>`;
            default:
                return html``;
        }
    }

    render() {
        return html`
            <div class="section-container">
                <div id="feedback" class="feedback-container">
                    ${this.renderFeedbackWindow()}
                </div>

                <div class="buttons">
                    <div class="button-container"></div>
                    <div class="record-button-container">
                        <vox-record-button ?isRecording=${this.isRecording()}>
                        </vox-record-button>
                    </div>
                    <div class="button-container">
                        <vox-skip-button> </vox-skip-button>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define('vox-recording-section', RecordingSection);
