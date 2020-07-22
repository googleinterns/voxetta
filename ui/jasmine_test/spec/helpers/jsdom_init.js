/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {JSDOM} from 'jsdom';
import {StubMediaRecorder} from './stubs/StubMediaRecorder.js';
import {StubFormData} from './stubs/StubFormData.js';

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.window.alert = () => {};
global.navigator = dom.window.navigator;
global.navigator.mediaDevices = {getUserMedia: () => {}};
global.MediaRecorder = StubMediaRecorder;
global.requestAnimationFrame = () => {};
global.cancelAnimationFrame = () => {};
global.FormData = StubFormData;
