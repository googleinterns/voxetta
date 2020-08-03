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

import {ReRecordButton} from './ReRecordButton';
import {PlaybackButton} from './PlaybackButton';

import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';
import {QualityControl} from '../utils/QualityControl';
import {CollectionStates} from '../utils/CollectionStatesEnum';
import {dispatchErrorToast} from '../utils/ToastUtils.js';

import style from '../styles/components/RecordingSection.css';

export class RecordingSection extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
            audioStream: {type: Object},
            context: {type: Object},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();
        this.audioRecorder = new AudioRecorder();
        this.utteranceService = new UtteranceApiService();
        this.finishedAudio = undefined;
        this.qcError = ""
    }

    updated(changedProperties) {
        this.handleWaveCanvas();
    }

    /**
     * Trigger appropriate logic requested by record button
     * @param {Event} e Event object from record button
     */
    handleRecordButtonUpdate(e) {
        const nextState = e.detail.state;

        // if state changed to recording
        if (nextState === CollectionStates.RECORDING) {
            this.handleStartRecording();
        }

        // if state changed to before_upload
        if (nextState === CollectionStates.BEFORE_UPLOAD) {
            this.handleEndRecording();
        }

        // if state changed to transitioning
        if (nextState === CollectionStates.TRANSITIONING) {
            this.handleUploadRecording();
        }
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
            this.qcError = "qc error"
            this.dispatchCollectionState(CollectionStates.NOT_RECORDING);
            return;
        }

        // Checks finished; transition to before_upload state
        this.dispatchCollectionState(CollectionStates.BEFORE_UPLOAD);

        this.finishedAudio = audio;
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


    handleReRecord() {
        this.dispatchCollectionState(CollectionStates.NOT_RECORDING)
    }

    startPlayback() {}

    stopPlayback() {}

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
     * Rendering related
     */

    renderFeedbackWindow() {
        switch (this.collectionState) {
            case CollectionStates.RECORDING:
                return html` <vox-sound-wave
                    ?isRecording=${this.collectionState ===
                    CollectionStates.RECORDING}
                    .audioStream=${this.audioStream}
                    .context=${this.context}
                >
                </vox-sound-wave>`;
            case CollectionStates.BEFORE_UPLOAD:
                return html`<vox-playback-button
                    @playback-start=${this.startPlayback}
                    @playback-stop=${this.stopPlayback}
                ></vox-playback-button>`;
            default:
                return this.qcError ? this.qcError : html``;
        }
    }

    render() {
        return html`<div id="feedback">
                ${this.renderFeedbackWindow()}
            </div>

            <div class="buttons">
                <div class="button-container">
                    ${this.collectionState === CollectionStates.BEFORE_UPLOAD
                        ? html`<vox-re-record-button @re-record=${this.handleReRecord}></vox-re-record-button>`
                        : html``}
                </div>
                <div class="record-button-container">
                    <vox-record-button
                        .collectionState=${this.collectionState}
                        @record-button-update=${this.handleRecordButtonUpdate}
                    >
                    </vox-record-button>
                </div>
                <div class="button-container">
                    <vox-skip-button> </vox-skip-button>
                </div>
            </div>`;
    }
}

customElements.define('vox-recording-section', RecordingSection);
