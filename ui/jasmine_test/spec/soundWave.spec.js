import {SoundWave} from '../../src/SoundWave.js';
import {StubContext} from './helpers/stubs/StubContext.js';
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
        const audioContextMock = new StubContext();
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