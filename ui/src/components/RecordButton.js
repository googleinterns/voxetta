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
import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';
import {QualityControl} from '../utils/QualityControl';
import {dispatchErrorToast} from '../utils/ToastUtils.js';
import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/RecordButton.css.js';

export class RecordButton extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
            audioStream: {type: Object},
            context: {type: Object},
            isRecording: {type: Boolean},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();
        this.audioRecorder = new AudioRecorder();
        this.utteranceService = new UtteranceApiService();
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
            this.context = new (window.AudioContext ||
                window.webkitAudioContext)();
        } else {
            // Set to before recording state
            this.dispatchCollectionState(CollectionStates.NOT_RECORDING);

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

            // Complete auto quality control checks
            const qualityCheck = new QualityControl(this.context, audio.blob);
            const qualityResult = await qualityCheck.isQualitySound();
            if (!qualityResult.success) {
                // If qc failed, pivot to QC error collection state
                this.dispatchCollectionState(CollectionStates.QC_ERROR);
                return;
            }

            // Attempt to upload the audio file
            this.uploadAudio(audio)
        }
    }

    /**
     * Attempts to upload the current audio file to the backend.
     * @param {Object} audio An object containing an audio Blob and its 
     *  corresponding URL.
     */
    async uploadAudio(audio) {
        if (audio.recordingUrl) {
            this.handleSaveAudio(audio);
            const response = await this.utteranceService.saveAudio(audio);

            if (!response) {
                dispatchErrorToast(this, `Audio failed to upload. Retry?`, true);
            }
        }
        this.handleFinish();
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
                audioStream: this.audioStream,
                context: this.context,
            },

            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /**
     * Emits an event that causes the current audio file
     * to be saved locally in case it is needed in the
     * future for re-uploading purposes.
     */
    handleSaveAudio(audio) {
        const event = new CustomEvent('save-audio', {
            detail: {
                audio,
            },

            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
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

    /**
     * Emits an event that causes a new prompt to be rendered
     * on the recording page.
     */
    handleFinish() {
        this.dispatchCollectionState(CollectionStates.TRANSITIONING);
    }

    render() {
        return html`
            <mwc-icon-button
                id="record-button"
                icon=${this.isRecording ? 'stop' : 'mic'}
                class=${this.isRecording ? 'recording' : ''}
                @click=${this.recordHandler}
            >
            </mwc-icon-button>
        `;
    }
}

customElements.define('vox-record-button', RecordButton);
