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

import * as PromptApi from '../../src/utils/PromptApiService';
import fetchMock from 'fetch-mock';

describe('Testing that the Prompt API Service ', () => {
    afterEach(() => {
        fetchMock.reset();
    });

    it('returns a prompt', async () => {
        const dummyPrompt = {
            type: 'text',
            body: 'jasmine test',
            vendorName: 'jasmine mock',
            id: 9283742,
        };

        // Mock successful fetch
        fetchMock.mock('/prompt', {
            status: 200,
            body: dummyPrompt,
        });

        const answer = await PromptApi.getNewPrompt();

        expect(answer).toEqual({
            status: 'SUCCESS',
            prompt: dummyPrompt,
        });
    });

    it('returns empty when no prompt exists', async () => {
        const dummyPrompt = {};

        // Mock successful empty fetch
        fetchMock.mock('prompt', {
            status: 200,
            body: dummyPrompt,
        });

        const answer = await PromptApi.getNewPrompt();

        expect(answer).toEqual({
            status: 'EMPTY',
        });
    });
});
