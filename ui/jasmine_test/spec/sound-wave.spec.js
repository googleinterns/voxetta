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

import {SoundWave} from '../../src/components/SoundWave.js';
import {StubContext} from './helpers/stubs/StubAudioContext.js';
import {StubCanvasCtx} from './helpers/stubs/StubCanvasCtx.js';
import {StubAnalyser} from './helpers/stubs/StubAnalyser.js';
import {StubFreqs} from './helpers/stubs/StubFreqs.js';

describe('Testing the Sound Wave methods', function() {

    let canvas;
    let stream;
    let audioContextMock;

    beforeEach(() => {
        canvas = jasmine.createSpyObj('canvas', ['getContext']);
        stream = jasmine.createSpyObj('stream', ['active']);
        spyOn(global, 'requestAnimationFrame');
        audioContextMock = new StubContext();
    });

    it('create sound wave', () => {
        const soundWave = new SoundWave(canvas, stream, audioContextMock);
        soundWave.createSoundWave(); 
        expect(audioContextMock.createAnalyser).toHaveBeenCalled();
        expect(audioContextMock.createMediaStreamSource).toHaveBeenCalled();  
        expect(audioContextMock.stubSource.connect).toHaveBeenCalledWith(audioContextMock.stubAnalyser);
        expect(requestAnimationFrame).toHaveBeenCalled();
    });

    it('stops sound wave', () => {
        const soundWave = new SoundWave(canvas, stream, audioContextMock);
        spyOn(global, 'cancelAnimationFrame');
        soundWave.stopSoundWave(); 
        expect(cancelAnimationFrame).toHaveBeenCalled();
    });
    
    it('draw on canvas', () => {
        const canvasCtx = new StubCanvasCtx();
        const analyser = new StubAnalyser();
        const freqs = new StubFreqs();
        const soundWave = new SoundWave(canvas, stream, audioContextMock, canvasCtx, analyser, freqs);
        soundWave.draw();
        expect(canvasCtx.beginPath).toHaveBeenCalled();
        expect(canvasCtx.moveTo).toHaveBeenCalled();
        expect(canvasCtx.lineTo).toHaveBeenCalled();  
        expect(canvasCtx.stroke).toHaveBeenCalled();
        expect(requestAnimationFrame).toHaveBeenCalled();
    });

});