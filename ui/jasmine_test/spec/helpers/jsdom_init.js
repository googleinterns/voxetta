import {JSDOM} from 'jsdom';
import {StubMediaRecorder} from './stubs/StubMediaRecorder.js';



const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
global.window.alert = () => {};
global.navigator.mediaDevices = {getUserMedia: () => {}};
global.MediaRecorder = StubMediaRecorder;