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

import {CookieService} from '../../src/utils/CookieService';

describe('Testing that the Cookie Service', () => {
    
    const cookieService = new CookieService(); 

    it('returns a value if a cookie for a given key exists', async () => {
        spyOn(cookieService, 'getCookie').and.returnValue('userId=291192; age=20;');

        const value = await cookieService.getCookieValue('userId');
        expect(value).toEqual('291192');
    });

    it('returns an empty string if a cookie for a given key does not exist', async () => {
        spyOn(cookieService, 'getCookie').and.returnValue('userId=291192; age=20;');

        const value = await cookieService.getCookieValue('gender');
        expect(value).toEqual('');
    }); 
});
