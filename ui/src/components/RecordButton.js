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
import {dispatchErrorToast} from '../utils/ToastUtils.js';
import {QualityControl} from '../utils/QualityControl';
import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';

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
        this.audioRecorder = new AudioRecorder();
        this.utteranceService = new UtteranceApiService();
        this.finishedAudio = undefined;
    }

    updated(changedProperties) {
        this.handleWaveCanvas();
        this.determineButtonAttributes();
    }

    /**
     * Handles logic to start recording audio.
     */
    async handleStartRecording() {
        // attempt to init; check for browser permission
        try {
            await this.audioRecorder.initRecorder();
        } catch (e) {
            dispatchErrorToast(
                this,
                `Microphone access is currently blocked for this site. 
                    To unblock, please navigate to chrome://settings/content/microphone 
                    and remove this site from the 'Block' section.`
            );
            return;
        }

        // start recording
        if (!this.audioRecorder.startRecording()) {
            dispatchErrorToast(this, 'Failed to start recording.');
            return;
        }

        // Set to recording state
        this.dispatchCollectionState(CollectionStates.RECORDING);

        this.audioStream = this.audioRecorder.stream;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    /**
     * Handles logic to end recording and progress to before_recording state
     */
    async handleEndRecording() {
        // Capture audio into variable
        let audio;

        try {
            audio = await this.audioRecorder.stopRecording();
        } catch (e) {
            dispatchErrorToast(
                this,
                `Could not record successfully; ${e.name}: ${e.message}`
            );
        }

        // Do auto qc checks
        const qualityCheck = new QualityControl(this.context, audio.blob);
        const qualityResult = await qualityCheck.isQualitySound();
        if (!qualityResult.success) {
            // If qc failed, pivot to QC error collection state
            this.qcError = 'qc error';
            this.dispatchCollectionState(CollectionStates.NOT_RECORDING);
            return;
        }


        this.finishedAudio = audio;
        this.dispatchAudioUrl(this.finishedAudio.recordingUrl);

        // Checks finished; transition to before_upload state
        this.dispatchCollectionState(CollectionStates.BEFORE_UPLOAD);
    }

    /**
     * Handles logic to upload recording and trigger transition to next prompt.
     */
    async handleUploadRecording() {
        // Attempt to upload it
        if (this.finishedAudio.recordingUrl) {
            try {
                const resp = await this.utteranceService.saveAudio(
                    this.finishedAudio
                );

                if (!resp) throw new Error();
            } catch (e) {
                // If upload failed, pivot to upload error collection state
                this.dispatchCollectionState(CollectionStates.UPLOAD_ERROR);
            }
        }

        // Dispatch transition to next prompt.
        this.dispatchCollectionState(CollectionStates.TRANSITIONING);
    }

    /**
     * On button click, transitions to next collectionState in recording flow.
     */
    async handleButtonClick() {
        // not_recording to recording
        if (this.collectionState === CollectionStates.NOT_RECORDING) {
            this.handleStartRecording();
        }

        // recording to before_upload
        else if (this.collectionState === CollectionStates.RECORDING) {
            this.handleEndRecording();
        }

        // before_upload to transition
        else if (this.collectionState === CollectionStates.BEFORE_UPLOAD) {
            this.handleUploadRecording();
        }
    }

    dispatchCollectionState(newState) {
        const event = new CustomEvent('update-collection-state', {
            detail: {
                state: newState,
            },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    dispatchAudioUrl(url) {
        const event = new CustomEvent('set-audio-url', {
            detail: {
                url: url,
            },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    /**
     * Emits an event that causes the application to render a sound
     * wave that corresponds to the current audio stream.
     */
    handleWaveCanvas() {
        const event = new CustomEvent('update-wave', {
            detail: {
                audioStream: this.audioStream,
                context: this.context,
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
