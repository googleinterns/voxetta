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

import {AudioRecorder} from '../../src/utils/AudioRecorder.js';

describe('Testing the Audio Recorder methods', function() {

    let audioStream;
    const audioRecorder = new AudioRecorder();

    beforeEach(async () => {
        audioStream = jasmine.createSpyObj('audioStream', ['active']);
        let promise = Promise.resolve(audioStream);
        spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(promise);
        await audioRecorder.initRecorder();
    });

    it('asks for mic', async () => {
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    });
    
    it('records audio', async () => {
        audioRecorder.startRecording();
        expect(audioRecorder.mediaRecorder.start).toHaveBeenCalled();
    });

    it('stops recording', async () => {
        audioRecorder.startRecording();
        let obj = audioRecorder.stopRecording();
        expect(audioRecorder.mediaRecorder.stop).toHaveBeenCalled();
        expect(obj[0]).toBe(audioRecorder.recordingUrl);
    });
});