import {AudioRecorder} from '../../src/AudioRecorder.js';

describe("Testing the Audio Recorder methods", function() {

    it("Start recording called", function(){
        let audioRecorder = new AudioRecorder();
        spyOn(audioRecorder, "startRecording");
        audioRecorder.startRecording();
        expect(audioRecorder.startRecording).toHaveBeenCalled();
    });

    it("Stop recording called", function(){
        let audioRecorder = new AudioRecorder();
        spyOn(audioRecorder, "stopRecording");
        let Url = audioRecorder.stopRecording();
        expect(audioRecorder.stopRecording).toHaveBeenCalled();
        expect(Url).toBe(audioRecorder.recordingUrl);
    });

});