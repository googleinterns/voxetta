import {StubSource} from './StubSource.js';
import {StubAnalyser} from './StubAnalyser.js';

export class StubContext {
 
    constructor() {
        this.stubSource = new StubSource();
        this.stubAnalyser = new StubAnalyser();
        this.createMediaStreamSource = jasmine.createSpy("createMediaStreamSource").and.returnValue(this.stubSource);
        this.createAnalyser = jasmine.createSpy("createAnalyser").and.returnValue(this.stubAnalyser);
    }
 
}
