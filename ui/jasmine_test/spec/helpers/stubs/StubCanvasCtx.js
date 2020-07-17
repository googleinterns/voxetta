export class StubCanvasCtx {
 
    constructor() {
        this.fillStyle = 'white';
        this.fillRect = jasmine.createSpy('fillRect');
        this.beginPath = jasmine.createSpy('beginPath');
        this.moveTo = jasmine.createSpy('moveTo');
        this.lineTo = jasmine.createSpy('lineTo');
        this.stroke = jasmine.createSpy('stroke');
    }
 
}
