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

import {CookieService} from './utils/CookieService';

import {VoxettaWaveCanvas} from './components/VoxettaWaveCanvas';
import {VoxettaPrompts} from './components/VoxettaPrompts';
import {VoxettaRecordButton} from './components/VoxettaRecordButton';
import {VoxettaSkipButton} from './components/VoxettaSkipButton';
import {VoxettaUserForm} from './components/VoxettaUserForm';
import {VoxettaUserIcon} from './components/VoxettaUserIcon';

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
            state: {type: String},
            promptState: {type: Boolean},
            isRecording: {type: Boolean},
            audioStream: {type: Object}
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
            }
            div.header {
                align-items: flex-start; 
                box-shadow: 0 3px 1px -1px #dcdcdc;
                height: 10vh;
                width: 100vw;
            }
            div.prompts {
                height: 60vh;
                width: 100vw;
            }
            div.buttons {
                height: 30vh; 
                width: 100vw;
            }
            div.record-button-container {
                height: 100%;
                width: 20vw;
            }
            div.button-container {
                height: 100%;
                width: 40vw;
            }
        `;
    }

    constructor() {
        super();
        this.cookieService = new CookieService();
        this.state = States.RECORD_PAGE; 
        this.promptState = true; 
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
                    <div class="header">
                        <vox-user-icon 
                            @enter-form="${() => { this.state = States.USER_FORM }}">
                        </vox-user-icon>
                    </div>
                    <div class="prompts">
                        <vox-prompts
                            .promptState=${this.prompt}></vox-prompts>
                        <vox-sound-wave 
                            .isRecording=${this.isRecording} 
                            .audioStream=${this.audioStream}>
                        </vox-sound-wave>
                    </div>
                    <div class="buttons">
                        <div class="button-container"></div>
                        <div class="record-button-container">
                            <vox-record-button
                                @record-state-change="${(e) => { 
                                    this.isRecording = e.detail.isRecording;
                                    this.audioStream = e.detail.audioStream; }}"
                                @next-prompt="${() => { this.promptState = !this.promptState }}">
                            </vox-record-button>
                        </div>
                        <div class="button-container">
                            <vox-skip-button
                                @skip-button="${() => { this.promptState = !this.promptState }}">
                            </vox-skip-button>
                        </div>
                    </div>
                `;
            case States.USER_FORM:
                 return html`
                    <vox-user-form
                        .userId = ${this.userId}
                        .gender = ${this.gender}
                        .userAge = ${this.userAge}
                        .deviceType = ${this.deviceType}
                        @update-user-info="${(e) => { 
                            this.updateUserInformation(e.detail.userInfo);
                            this.cookieService.makeUserInfoCookie(e.detail.userInfo); }}"
                        @exit-form="${() => { this.state = States.RECORD_PAGE }}">
                    </vox-user-form>
                `;
        }     
    }

    /**
     * Updates user-related fields with the approriate values.
     * @param {Object} userInfo - The information entered on the user form.
     */
    updateUserInformation(userInfo) {
        this.userId = userInfo.userId;
        this.gender = userInfo.gender;
        this.userAge = userInfo.userAge;
        this.deviceType = userInfo.deviceType;
    }
}

customElements.define('vox-app', VoxettaApp);
