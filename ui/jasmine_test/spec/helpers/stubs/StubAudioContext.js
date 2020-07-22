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

import {StubSource} from './StubSource.js';
import {StubAnalyser} from './StubAnalyser.js';

export class StubContext {
 
    constructor() {
        this.stubSource = new StubSource();
        this.stubAnalyser = new StubAnalyser();
        this.createMediaStreamSource = jasmine.createSpy('createMediaStreamSource').and.returnValue(this.stubSource);
        this.createAnalyser = jasmine.createSpy('createAnalyser').and.returnValue(this.stubAnalyser);
    }
 
}
