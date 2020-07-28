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
 * Service responsible for creating and fetching the appropriate 
 * parameters from the URL query string.   
 */
export class UrlService {

    /**
     * Determines the value of a given URL parameter key.
     * @param {String} key - The name of a parameter key whose value is sought.
     * @return {String} The value of the given parameter key, or null
     *  if the parameter was not included in the given URL.
     */
    getParamValue(key) {
        const query = window.location.search.slice(1);
        if (query.includes(`${key}=`)) {
            return query
                .split('&')
                .find(entry => entry.startsWith(key))
                .split('=')[1];
        }
        return null;
    }  

    /**
     * Retrieves the user's id from the URL, if it is present.
     * @return {String} The user id stored in the URL, or null
     * if such a parameter does not exist.
     */
    getUserId() {
        return this.getParamValue('userId');
    }

    /**
     * Retrieves the language from the URL, if it is present.
     * @return {String} The language stored in the URL, or null
     * if such a parameter does not exist.
     */
    getLang() {
        return this.getParamValue('lang');
    }

    /**
     * Retrieves the project id from the URL, if it is present.
     * @return {String} The project id stored in the URL, or null
     * if such a parameter does not exist.
     */
    getProjectId() {
        return this.getParamValue('project');
    }

    /**
     * Retrieves the vendor id from the URL, if it is present.
     * @return {String} The vendor stored in the URL, or null
     * if such a parameter does not exist.
     */
    getVendorId() {
        return this.getParamValue('vendor');
    }
}
