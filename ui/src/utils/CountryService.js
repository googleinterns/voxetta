/*
Copyright 2020 Google LLC
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    https://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

/**
 * Service responsible for creating and fetching cookies.   
 */
export class CountryService {

    /**
     * Returns an array form of the 'countries.txt' file.
     * @return {Array} The name of every country the user may be located in. 
     */
    async getCountries() {
        const countries = await fetch('./src/data/countries.txt')
            .then(response => response.text())
            .then(countries => countries.split('\n'));
        return countries;
    }   
}