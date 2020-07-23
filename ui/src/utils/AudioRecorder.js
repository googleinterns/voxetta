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

/**
 * Responsible for enabling and recording via the Web Audio API.
 */
export class AudioRecorder {
    /**
     * Creates an AudioRecorder that can record utterances
     * @private {Object} allows access to Web Audio API
     * @readonly {Object} Stores the recorded stream of the utterance
     */
    constructor() {
        this.mediaRecorder = undefined;
        this.stream = undefined;
    }

    /**
     * Prompts user for access to Microphone using API
     */
    initRecorder() {
        return new Promise(async (resolve, reject) => {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                this.mediaRecorder = new MediaRecorder(this.stream);
            } catch (err) {
                reject();
            }
            resolve();
        });
    }

    /**
     * Begins recording if access is granted.
     * @returns {Boolean} Denotes whether or not the recording successfully began.
     */
    startRecording() {
        if (!this.stream) {
            return false;
        }

        this.mediaRecorder.start();
        return true;
    }

    /**
     * Stops recording and stores utterance data in Url if recording
     * @returns {Object} Url to access utterance on the front end, and blob to access utterance in the back end
     */
    stopRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            return new Promise((resolve) => {
                this.mediaRecorder.ondataavailable = (e) => {
                    const blob = new Blob([e.data], {type: 'audio/webm;'});
                    const recordingUrl = window.URL.createObjectURL(blob);
                    const audio = {blob, recordingUrl};
                    resolve(audio);
                };
            });
        }
        throw new Error('Could not record successfully.');
    }
}
