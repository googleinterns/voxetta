// var jsdom = require("jsdom");
import {JSDOM} from 'jsdom';
import {StubMediaRecorder} from '../../../src/StubMediaRecorder.js';
import {StubSoundWave} from '../../../src/StubSoundWave.js';



const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
global.window.alert = () => {};
global.navigator.mediaDevices = {getUserMedia: () => {}};
global.MediaRecorder = StubMediaRecorder;