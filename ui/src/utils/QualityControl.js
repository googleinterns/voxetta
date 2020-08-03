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
 * Responsible for quality control  
 */
export class QualityControl {
    
   /**
    * Creates an quality control instance
    * @param {Object} context - Audio context used to extract data from utterance.
    * @param {Object} blob - the blob containig utterance data
    * @private {Object} Allows access to data of the utterance  
    */
    constructor(context, blob, audioBuffer) {
        this.context = context;
        this.blob = blob;
        this.audioBuffer = audioBuffer;
    }
    
   /**
    * Checks if sound is of good quality: not too short or silent
    */
    async isQualitySound() {
        const blobArrayBuffer = await this.blob.arrayBuffer();
        this.audioBuffer = await this.context.decodeAudioData(blobArrayBuffer);

        const qualityResult = {
            success: true,
            errorMessage: '',
        };

        const audioResult = this.silenceCheck();

        if (this.audioBuffer.duration < 2.0) {
            qualityResult.success = false;
            qualityResult.errorMessage += 'Recording is too short. Try again!';
        } else if (audioResult) {
            qualityResult.success = false;
            qualityResult.errorMessage += audioResult;
        }

        return qualityResult;
    }

   /**
    * Checks if the sound is too silent by finding the average of the 100 biggest values
    * of the buffer's data
    */
    silenceCheck() {
        const soundCutOff = 0.2;
        const bufferArray = this.audioBuffer.getChannelData(0);
        const noDuplicateValues = Array.from(new Set(bufferArray));  // makes sure all values are unique
        const biggestValues = this.nLargest(noDuplicateValues, 100);
        const average = this.findAverage(biggestValues);
        if (average > soundCutOff) {
            return null;
        } else {
            return 'Recording is too silent. Try again!';
        }
    }

   /**
    * Helper function for silenceCheck that returns the 100 biggest values of an array
    */
    nLargest(arr, n) {
        const sorted = [...arr].sort((a, b) => b - a);
        return sorted.slice(0, n);
    }

   /**
    * Helper function for silenceCheck that returns the average of the numbers in an array
    */
    findAverage(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total / arr.length;
    }
}