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
 
import {LitElement, html, css} from 'lit-element';

import {CountryService} from '../utils/CountryService';

import {Select} from '@material/mwc-select';
import {ListItem} from '@material/mwc-list/mwc-list-item';
 
/**
 * Component responsible for providing users a means to select
 * the country they are located in. 
 */
export class CountrySelector extends LitElement {

    static get properties() {
        return {
            countries: {type: Array}
        };
    }

    static get styles() {
        return css`
            div {
                align-items: center; 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap;
                justify-content: center; 
                text-align: center;  
            }
            mwc-select {
                width: 300px; 
            }
            h3 {
                font-family: 'Roboto';
                font-size: 28px; 
                font-weight: normal;
                padding: 0px 20px 0px 20px;
            }
            p {
                font-family: 'Roboto';
                font-size: 18px; 
                font-weight: bolder; 
                padding: 0px 20px 0px 20px;
            }
        `;
    }

    constructor() {
        super();
        this.countries = []; 
        this.countryService = new CountryService(); 
    }

    async firstUpdated() {
        this.countries = await this.countryService.getCountries();
    }

    /**
     * Determines if a country has been selected and handles the app state 
     * accordingly. 
     */
    checkSelection() {
        const countryList = this.shadowRoot.getElementById('country-list');
        if (countryList.checkValidity()) {
            this.country = countryList.value;
            this.handleCountrySelected();
        }
    }

    /**
     * Emits an event that causes the country selector to close and the appropriate
     * Terms of Service to appear. 
     */
    handleCountrySelected() {
        const event = new CustomEvent('country-selected', {
            bubbles: true,
            composed: true,
            detail: { 
                country: this.country
            }
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <div>
                <h3>This site enables Google to collect audio samples from you, for 
                    the purpose of developing and improving speech recognition 
                    technologies</h3>
                <p>You must fill out the form for your country and agree to the 
                    terms before using this site:</p>
                <div class="mwc-select">
                    <mwc-select
                        id="country-list" 
                        outlined 
                        required
                        label="Select your country"
                        @click="${this.checkSelection}">
                            <mwc-list-item disabled></mwc-list-item>
                            ${this.countries.map(country => 
                                html`<mwc-list-item value=${country}>
                                ${country}</mwc-list-item>`)}
                    </mwc-select>
                </div>
            </div>
        `;
    }
}
 
customElements.define('vox-country-selector', CountrySelector);
