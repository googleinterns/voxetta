import {AudioRecorder} from '../../src/AudioRecorder.js';

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