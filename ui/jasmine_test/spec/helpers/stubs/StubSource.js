export class StubSource {
 
    constructor() {
        this.connect = jasmine.createSpy('connect');
    }
 
}
