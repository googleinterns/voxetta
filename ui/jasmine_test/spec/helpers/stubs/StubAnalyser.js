export class StubAnalyser {
 
    constructor() {
        this.frequencyBinCount = 32;
        this.getByteFrequencyData = jasmine.createSpy('getByteFrequencyData');
    }
 
}
