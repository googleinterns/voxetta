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
 
import {LitElement, html, css} from 'lit-element';

import {CookieService} from './CookieService';
import {TextField} from '@material/mwc-textfield';
import {Select} from '@material/mwc-select';
import {ListItem} from '@material/mwc-list/mwc-list-item';
import {Button} from '@material/mwc-button';
 
/**
 * Component responsible for providing users a means to provide
 * their personal information. 
 */
export class VoxettaUserForm extends LitElement {

    static get styles() {
        return css`
            .container {
                align-items: center; 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap;
                justify-content: center; 
                text-align: center;  
                width: 100%; 
            }
            h1.title {
                font-family: 'Roboto';
                font-size: 30px;
            }
            h2.description {
                font-family: 'Roboto';
                font-size: 20px;
            }
            mwc-textfield {
                --mdc-theme-primary: #1a73e8;
                padding: 10px; 
                width: 300px;
            }
            mwc-select {
                --mdc-theme-primary: #1a73e8;
                padding: 10px; 
                widith: 300px;
            }
            mwc-button {
                padding: 10px;
                width: 300px; 
            }
            mwc-button.save {
                --mdc-theme-primary: #1a73e8;
                --mdc-theme-on-primary: white;
            }
            mwc-button.cancel {
                --mdc-theme-primary: white;
                --mdc-theme-on-primary: #1a73e8;
            }
        `;
    }

    constructor() {
        super();
        this.cookieService = new CookieService();
        this.userId = this.cookieService.getCookieValue("userId");
        this.gender = this.cookieService.getCookieValue("gender");
        this.userAge = this.cookieService.getCookieValue("userAge");
        this.deviceType = this.cookieService.getCookieValue("deviceType"); 
    }
 
    render() {
        return html`
            <section class="container">
                <h1 class="title">User information</h1>
                <h2 class="description">
                    Your recording will be tagged with the following</h2>
                <article id="user-form" class="container">
                    <mwc-textfield 
                        id="user-id"
                        outlined 
                        label="User identifier"
                        value=${this.userId}>
                    </mwc-textfield>
                    <mwc-select
                        id="gender-list" 
                        outlined 
                        label="Gender" 
                        placeholder="Select your gender"
                        value=${this.gender}>
                            <mwc-list-item disabled></mwc-list-item>
                            <mwc-list-item value="Female">Female</mwc-list-item>
                            <mwc-list-item value="Male">Male</mwc-list-item>  
                            <mwc-list-item value="Other">Other</mwc-list-item>     
                    </mwc-select>
                    <mwc-textfield 
                        id="user-age"
                        type="number"
                        outlined 
                        label="Age" 
                        placeholder="Enter your age"
                        min=0
                        max=120
                        value=${this.userAge}>
                    </mwc-textfield>
                    <mwc-textfield 
                        id="device-type"
                        outlined 
                        label="Device" 
                        placeholder="Device type"
                        value=${this.deviceType}>
                    </mwc-textfield>
                    <mwc-button 
                        class="save"
                        unelevated 
                        label="Save"
                        @click=${this.processForm}>
                    </mwc-button>
                </article>
                <mwc-button 
                    class="cancel"
                    unelevated 
                    label="Cancel"
                    @click=${this.handleCancelClick}>
                </mwc-button>
            </section>
        `;
    }

    /**
     * Checks to see if the user submitted valid information, and if so,
     * saves the user information in a cookie. 
     */
    processForm() {
        this.userId = this.shadowRoot.getElementById('user-id').value;
        this.gender = this.shadowRoot.getElementById('gender-list').value;
        this.userAge = this.shadowRoot.getElementById('user-age').value;
        this.deviceType = this.shadowRoot.getElementById('device-type').value;

        if (this.ensureFormCompleteness()) {
            const userInfo = {
                userId: this.userId, 
                gender: this.gender,
                userAge: this.userAge,
                deviceType: this.deviceType
            };
            this.cookieService.makeUserInfoCookie(userInfo);
        } 
    }

    /**
     * Ensures the validity of a submitted form in regards to completeness. 
     * @returns {Boolean} Denotes if the submitted form was fully completed.
     */
    ensureFormCompleteness() {
        const idComplete = 
            this.ensureInputCompleteness('user-id', 'Please enter a valid user id.');
        const genderComplete =
            this.ensureInputCompleteness('gender-list', 'Please select a gender.');
        const ageComplete =
            this.ensureInputCompleteness('user-age', 
                'Please enter a valid age between 0 and 120.');
        const deviceComplete =
            this.ensureInputCompleteness('device-type', 'Please enter a device name.');

        return idComplete && genderComplete && ageComplete && deviceComplete;  
    }

    /**
     * Ensures that a given input was complete when submitted. If not, it triggers an
     * incompleteness-related error message for the given input. 
     * @param {String} id - The HTML ID of the input whose completeness needs checked.
     * @param {String} errMsg - The message to display if an input was 
     *  submitted incomplete.
     * @returns {Boolean} Denotes if a submitted input was complete.
     */
    ensureInputCompleteness(id, errMsg) {
        const input = this.shadowRoot.getElementById(id);
        if (!input.value) {
            input.setCustomValidity(errMsg);
            input.reportValidity();
            return false; 
        } else {
            input.setCustomValidity('');
            input.reportValidity();
            return true; 
        }
    }

    /**
     * Emits an event that causes the form page to close and the record
     * page to appear. 
     */
    handleCancelClick() {
        let event = new CustomEvent('exit-form', {
            detail: {
                state: 'RECORD-PAGE'
            }
        });
        this.dispatchEvent(event);
    }
}
 
customElements.define('vox-user-form', VoxettaUserForm);
