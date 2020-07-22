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

import {CountryService} from '../../src/utils/CountryService';

import fetchMock from 'fetch-mock';

describe('Testing that the Country Service', () => {

    const countryService = new CountryService(); 

    it('properly parses a text file into a country array', async () => {

        const dummySuccessResponse = 'Canada\nUnited States\nMexico'

        // Mock successful fetch
        fetchMock.mock('/src/data/countries.txt', {
            status: 200,
            body: dummySuccessResponse
        });

        const countryArray = await countryService.getCountries();
        expect(countryArray).toEqual(['Canada', 'United States', 'Mexico']);
    });
});
