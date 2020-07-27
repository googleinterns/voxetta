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

import {QualityControl} from '../../src/utils/QualityControl.js';

describe('Testing the quality control methods', function() {

    let qualityControl;

    beforeEach(() => {
        const context = jasmine.createSpyObj('context', ['decodeAudioData']);
        const blob = jasmine.createSpyObj('blob', ['arrayBuffer']);
        const buffer = jasmine.createSpyObj('buffer', ['getChannelData']);
        qualityControl = new QualityControl(context, blob, buffer);
    });

    it('checks if volume is too low', () => {
        spyOn(qualityControl, 'nLargest');
        spyOn(qualityControl, 'findAverage');
        qualityControl.silenceCheck(); 
        expect(qualityControl.audioBuffer.getChannelData).toHaveBeenCalled();
        expect(qualityControl.nLargest).toHaveBeenCalled();
        expect(qualityControl.findAverage).toHaveBeenCalled();
    });

    it('checks if got the n largests', () => {
        const mockArr = [10, 4, 6, 3, 27, 5];
        expect(qualityControl.nLargest(mockArr, 2)).toEqual([27, 10]);
    });

    it('checks if got the average', () => {
        const mockArr = [10, 4, 6, 3, 27];
        expect(qualityControl.findAverage(mockArr)).toEqual(10);
    });

});