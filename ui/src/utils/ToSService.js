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
 * terms of service.   
 */
export class ToSService {

    /**
     * Returns an array form of the appropriate terms file.
     * @return {Array} The paragraphs that make up the appropriate 
     * terms of service. 
     */
    async getToS(country) {
        const fileName = country.split(' ').join('_') + '.tos.txt';
        const terms = await fetch('./src/data/ToS/' + fileName, 
        {
            headers: {
                'Content-Type': 'text/plain',
            }
        })
            .then(response => response.text())

        return terms;
    }   
}
