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

import {CookieService} from './CookieService';

/**
 * Service responsible for saving audio files to an external database.
 */
export class UtteranceApiService {
    /**
     * Create an UtteranceApiService that can externally save audio files.
     */
    constructor() {
        this.blobUrl_;
        this.formData = undefined;
        this.cookieService = new CookieService();
    }

    /**
     * Save a recorded audio file to an external database.
     * @param {Object} audio - An object containing an audio Blob and its corresponding URL.
     * @returns {Boolean} Indicates whether or not an audio file was successfully uploaded.
     */
    async saveAudio(audio) {
        // Get Blobstore URL & Form Data
        const url = await this.getUploadUrl();

        if (!url) {
            return false;
        }

        this.getFormData(audio);

        const response = await fetch(url, {
            method: 'POST',
            body: this.formData,
        });
        const query = await response.json();

        if (!query.success) {
            return false;
        }
        return true;
    }

    /**
     * Retrieve and return the user form data to upload.
     * @param {Object} audio - An object containing an audio Blob and its corresponding URL.
     */
    getFormData(audio) {
        this.formData = new FormData();
        this.formData.append('audio', audio.blob, 'blob');
        this.formData.append('userId', this.cookieService.getUserId());
        this.formData.append('gender', this.cookieService.getGender());
        this.formData.append('userAge', this.cookieService.getUserAge());
        this.formData.append('deviceType', this.cookieService.getDeviceType());
    }

    /**
     * Retrieve and return a Blobstore upload link.
     * @returns {String} A Blobstore URL
     */
    async getUploadUrl() {
        const response = await fetch('/blobstore-utterance-upload-link');
        const query = await response.json();

        if (query.success) {
            return query.url;
        }

        return null;
    }
}
