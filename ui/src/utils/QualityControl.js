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
    */
    constructor(context, blob) {
        this.context = context;
        this.blob = blob;
        this.audioBuffer;
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

        const audioResult = this.soundCheck();

        if (this.audioBuffer.duration < 2.0) {
            qualityResult.success = false;
            qualityResult.errorMessage += 'Audio recording failed: recording was too short. Try again';
        } else if (audioResult) {
            qualityResult.success = false;
            qualityResult.errorMessage += audioResult;
        }

        return qualityResult;
    }

   /**
    * Checks if the sound is too silent
    */
    soundCheck() {
        const bufferArray = this.audioBuffer.getChannelData(0);
        const bufferSet = new Set(bufferArray);
        const arrOfSet = [];
        for (let data of bufferSet) {
            arrOfSet.push(data);
        }
        const arrOfBiggest = [];
        for(let i = 0; i < 100; i++){
            const max = Math.max(...arrOfSet);
            arrOfBiggest.push(max);
            const index = arrOfSet.indexOf(max);
            arrOfSet.splice(index, 1);
        }
        let total = 0;
        for (let i = 0; i < arrOfBiggest.length; i++) {
            total += arrOfBiggest[i];
        }
        const avg = total / arrOfBiggest.length;
        if (avg > 0.2) {
            return null;
        } else {
            return 'Audio recording failed: recording was silent. Try again';
        }
    }
}