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

import {ToSService} from '../../src/utils/ToSService';

import fetchMock from 'fetch-mock';

describe('Testing that the ToS Service', () => {

    const tosService = new ToSService(); 

    it('properly retrieves the ToS for a country without spaces', async () => {

        const dummySuccessResponse = 
            'Terms of Service for Brazil.'

        // Mock successful fetch
        fetchMock.mock('/src/data/ToS/Brazil.tos.txt', {
            status: 200,
            body: dummySuccessResponse
        });

        const terms = await tosService.getToS('Brazil');
        expect(terms).toEqual('Terms of Service for Brazil.');
    });

    it('properly retrieves the ToS for a country with spaces', async () => {

        const dummySuccessResponse = 
            'Terms of Service for United States (English).'

        // Mock successful fetch
        fetchMock.mock('/src/data/ToS/United_States_(English).tos.txt', {
            status: 200,
            body: dummySuccessResponse
        });

        const terms = await tosService.getToS('United States (English)');
        expect(terms).toEqual('Terms of Service for United States (English).');
    });
});
