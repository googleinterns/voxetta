export class StubMediaRecorder {

    constructor(){
        this.start = jasmine.createSpy("start");
        this.stop = jasmine.createSpy("stop");

    }
}