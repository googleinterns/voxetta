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
    constructor(context) {
        this.context = context;
    }
    
   /**
    * Checks if sound is of good quality
    */
    isQualitySound() {
        if(this.lengthCheck()) {
            return true;
        } else {
            return false;
        }
    }

   /**
    * Checks if audio is too short
    */
    lengthCheck() {
        if (this.context.currentTime < 2.0) {
            alert('Audio recording failed: recording was too short. Try again');
            return false;
        } else {
            return true;
        }
    }
}