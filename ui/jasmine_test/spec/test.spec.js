import {AudioRecorder} from '../../src/utils/AudioRecorder.js';

describe('Testing the Audio Recorder methods', function() {

    let audioStream;

    beforeEach(() => {
        audioStream = jasmine.createSpyObj('audioStream', ['active']);
        let promise = Promise.resolve(audioStream);
        spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(promise);
    });

    it('asks for mic', async () => {
        const audioRecorder = new AudioRecorder();
        await audioRecorder.initRecorder();
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    });
    
    it('records audio', async () => {
        const audioRecorder = new AudioRecorder();
        await audioRecorder.initRecorder();
        audioRecorder.startRecording();
        expect(audioRecorder.mediaRecorder.start).toHaveBeenCalled();
    });

    it('stops recording', async () => {
        const audioRecorder = new AudioRecorder();
        await audioRecorder.initRecorder();
        audioRecorder.startRecording();
        let obj = audioRecorder.stopRecording();
        expect(audioRecorder.mediaRecorder.stop).toHaveBeenCalled();
        expect(obj[0]).toBe(audioRecorder.recordingUrl);
    });

});