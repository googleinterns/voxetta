/**
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
import {Icon} from '@material/mwc-icon';
import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/RecordButton.css.js';

export class RecordButton extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
            audioStream: {type: Object},
            context: {type: Object},
            isRecording: {type: Boolean},
            buttonIcon: {type: String},
            buttonClass: {type: String},
            disabled: {type: Boolean},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();
        this.disabled = false;
    }

    updated() {
        this.determineButtonAttributes();
    }

    /**
     * On button click, transitions to next collectionState in recording flow.
     */
    async handleButtonClick() {
        // not_recording to recording
        if (this.collectionState === CollectionStates.NOT_RECORDING) {
            this.dispatchCollectionState(CollectionStates.RECORDING);
        }

        // recording to before_upload
        else if (this.collectionState === CollectionStates.RECORDING) {
            this.dispatchCollectionState(CollectionStates.BEFORE_UPLOAD);
        }

        // before_upload to transition
        else if (this.collectionState === CollectionStates.BEFORE_UPLOAD) {
            this.dispatchCollectionState(CollectionStates.TRANSITIONING);
        }
    }

    dispatchCollectionState(newState) {
        const event = new CustomEvent('record-button-update', {
            detail: {
                state: newState,
            },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    determineButtonAttributes() {
        if (this.collectionState === CollectionStates.NOT_RECORDING) {
            this.buttonIcon = 'mic';
            this.buttonClass = '';
            this.disabled = false;
        } else if (this.collectionState === CollectionStates.RECORDING) {
            this.buttonIcon = 'stop';
            this.buttonClass = 'recording';
        } else if (this.collectionState === CollectionStates.BEFORE_UPLOAD) {
            this.buttonIcon = 'check';
            this.buttonClass = 'confirm';
        } else if (this.collectionState === CollectionStates.TRANSITIONING) {
            this.buttonIcon = 'mic';
            this.buttonClass = '';
            this.disabled = true;
        }
    }

    render() {
        return html`
            <mwc-icon-button
                id="record-button"
                icon=${this.buttonIcon}
                class=${this.buttonClass}
                @click=${this.handleButtonClick}
                ?disabled=${this.disabled}
            >
            </mwc-icon-button>
        `;
    }
}

customElements.define('vox-record-button', RecordButton);
