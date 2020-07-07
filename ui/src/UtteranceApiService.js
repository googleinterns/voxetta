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

/**
 * Service responsible for saving audio files to an external database. 
 */
export class UtteranceApiService {

    /**
     * Create an UtteranceApiService that can externally save audio files.
     */
    constructor() {
        /**
         * A Blobstore upload link.
         * @private
         */
        this.blobUrl; 
        this.getUploadUrl();
    }

    /**
     * Set the blobUrl property to be a Blobstore upload link. 
     */
    async getUploadUrl() {
        const response = await fetch('/blobstore-utterance-upload-link');
        const query = await response.json();

        if (query.success) {
            this.blobUrl = query.url; 
        } else {
            alert("Error: Unable to access database.");
        }
    } 

    /**
     * Save a recorded audio file to an external database. 
     * @param {Object} audio - An object containing an audio Blob and its corresponding URL.
     */
    async saveAudio(audio) {
        const formData = new FormData();
        formData.append('audio', audio.blob, 'blob');

        const response = await fetch(this.blobUrl, { 
            method: 'POST',
            body: formData 
        });
        const query = await response.json(); 

        if (!query.success) {
            alert("Error: Unable to upload file.");
        } 
    }
}