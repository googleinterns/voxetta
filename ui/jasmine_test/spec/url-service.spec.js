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

import {UrlService} from '../../src/utils/UrlService';

describe('Testing that the URL Service', () => {

    const urlService = new UrlService(); 

    beforeEach(async () => {
        const query = '&userId=12345&project=test' +
            '&lang=english&vendor=google';
        spyOn(urlService, 'getUrlQuery').and.returnValue(query);
    });

    it('returns null if a parameter is not present', () => {
        const value = urlService.getParamValue('userAge');
        expect(value).toBeNull();
    });

    it('properly parses the user id from the query string', () => {
        const value = urlService.getUserId();
        expect(value).toEqual('12345');
    });

    it('properly parses the project id from the query string', () => {
        const value = urlService.getProjectId();
        expect(value).toEqual('test');
    });

    it('properly parses the language from the query string', () => {
        const value = urlService.getLang();
        expect(value).toEqual('english');
    });

    it('properly parses the vendor id from the query string', () => {
        const value = urlService.getVendorId();
        expect(value).toEqual('google');
    });
});
