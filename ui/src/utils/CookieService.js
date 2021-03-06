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

/**
 * Service responsible for creating and fetching cookies.
 */
export class CookieService {
    /**
     * Create a cookie for each component of user information.
     * @param {Object} userInfo - An object containing various
     *  components of user information.
     */
    makeUserInfoCookie(userInfo) {
        document.cookie = `userId=${userInfo.userId}`;
        document.cookie = `gender=${userInfo.gender}`;
        document.cookie = `userAge=${userInfo.userAge}`;
        document.cookie = `deviceType=${userInfo.deviceType}`;
    }

    /**
     * Create a cookie for each component of user information.
     * @param {String} key - The name of a cookie key whose value is sought.
     * @return {String} The value of the given cookie key, or an empty string
     *  if a cookie has not been set for such a key.
     */
    getCookieValue(key) {
        const {cookie} = document;
        if (cookie.includes(`${key}=`)) {
            return cookie
                .split('; ')
                .find(entry => entry.startsWith(key))
                .split('=')[1];
        }
        return '';
    }

    /**
     * Retrieves the user's id from a cookie, if it exists.
     * @return {String} The user id stored in a cookie, or an empty string
     * if such a cookie does not exist.
     */
    getUserId() {
        return this.getCookieValue('userId');
    }

    /**
     * Retrieves the user's gender from a cookie, if it exists.
     * @return {String} The gender type stored in a cookie, or an empty string
     * if such a cookie does not exist.
     */
    getGender() {
        return this.getCookieValue('gender');
    }

    /**
     * Retrieves the user's age from a cookie, if it exists.
     * @return {Number} The user age stored in a cookie, or an empty string
     * if such a cookie does not exist.
     */
    getUserAge() {
        return this.getCookieValue('userAge');
    }

    /**
     * Retrieves the user's device type from a cookie, if it exists.
     * @return {String} The device type stored in a cookie, or an empty string
     * if such a cookie does not exist.
     */
    getDeviceType() {
        return this.getCookieValue('deviceType');
    }
}
