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
import {VoxettaRecordButton} from './VoxettaRecordButton';
import {VoxettaUserForm} from './VoxettaUserForm';
import {VoxettaUserIcon} from './VoxettaUserIcon';

/**
 * Possible app states.
 */
const States = {
  RECORD_PAGE: 'record_page',
  USER_FORM: 'user_form',
}

export class VoxettaApp extends LitElement {

    static get properties() {
        return {
            state: {type: String}
        };
    }

    constructor() {
        super();
        this.cookieService = new CookieService();
        this.state = States.RECORD_PAGE; 
        this.userId = this.cookieService.getCookieValue("userId");
        this.gender = this.cookieService.getCookieValue("gender");
        this.userAge = this.cookieService.getCookieValue("userAge");
        this.deviceType = this.cookieService.getCookieValue("deviceType");    
    }

    render() {  
        return html`
            ${this.displayComponents()}
        `;
    }

    /**
     * Returns the appropriate components based upon the current state of the 
     * application. 
     * @returns {HTML} The HTML containing the appropriate components to render.
     */
    displayComponents() {
        switch (this.state) {
            case States.RECORD_PAGE:
                return html`
                    <vox-user-icon 
                        @enter-form="${() => { this.state = States.USER_FORM }}">
                    </vox-user-icon>
                    <vox-record-button></vox-record-button>
                `;
            case States.USER_FORM:
                 return html`
                    <vox-user-form
                        .userId = ${this.userId}
                        .gender = ${this.gender}
                        .userAge = ${this.userAge}
                        .deviceType = ${this.deviceType}
                        @update-user-info="${(e) => { this.cookieService.makeUserInfoCookie(e.detail.userInfo); }}"
                        @exit-form="${() => { this.state = States.RECORD_PAGE }}">
                    </vox-user-form>
                `;
        }     
    }
}

customElements.define('vox-app', VoxettaApp);
