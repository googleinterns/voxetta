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

describe('Testing that the Cookie Service getCookieValue()', () => {
    
    const cookieService = new CookieService(); 
    const userInfo = {
        userId: '291192',
        gender: 'Female',
        userAge: 20,
        deviceType: 'Pixelbook'
    }

    // Create a cookie with the example user information
    cookieService.makeUserInfoCookie(userInfo);

    it('returns a value if a cookie for a given key exists', async () => {
        const value = cookieService.getCookieValue('userId');
        expect(value).toEqual('291192');
    });

    it('returns an empty string if a cookie for a given key does not exist', async () => {
        const value = cookieService.getCookieValue('country');
        expect(value).toEqual('');
    }); 
});

describe('Testing that the Cookie Service getter functions', () => {
    
    const cookieService = new CookieService(); 
    const userInfo = {
        userId: '291192',
        gender: 'Female',
        userAge: 20,
        deviceType: 'Pixelbook'
    }

    // Create a cookie with the example user information
    cookieService.makeUserInfoCookie(userInfo);

    it('properly retrieves userId via cookie', async () => {
        const userId = cookieService.getUserId(); 
        expect(userId).toEqual('291192');
    }); 

    it('properly retrieves gender via cookie', async () => {
        const gender = cookieService.getGender(); 
        expect(gender).toEqual('Female');
    }); 

    it('properly retrieves userAge via cookie', async () => {
        const userAge = cookieService.getUserAge(); 
        expect(userAge).toEqual('20');
    }); 

    it('properly retrieves deviceType via cookie', async () => {
        const deviceType = cookieService.getDeviceType(); 
        expect(deviceType).toEqual('Pixelbook');
    }); 
});
