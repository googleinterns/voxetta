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
  ACTIVE_RECORD_PAGE: 'active_record_page',
  UNACTIVE_RECORD_PAGE: 'unactive_record_page',
  USER_FORM: 'user_form',
}

export class VoxettaApp extends LitElement {

    /**
     * @property state - The current state of the application.
     * @property promptState - Is negated whenever a new prompt is 
     * to be displayed. 
     * @property isRecording - Whether or not the application is 
     *  actively recording.
     * @property audioStream - The stream of audio that is being
     *  actively recorded, if applicable.
     */
    static get properties() {
        return {
            state: {type: String},
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
        this.state = States.ACTIVE_RECORD_PAGE; 
        this.promptState = true; 
        this.userId = this.cookieService.getCookieValue('userId');
        this.gender = this.cookieService.getCookieValue('gender');
        this.userAge = this.cookieService.getCookieValue('userAge');
        this.deviceType = this.cookieService.getCookieValue('deviceType'); 
    }

    /**
     * Returns the appropriate components based upon the current state of the 
     * application. 
     * @returns {HTML} The HTML containing the appropriate components to render.
     */
    displayComponents() {
        switch (this.state) {
            case States.ACTIVE_RECORD_PAGE:
                return html`
                    ${this.getActiveRecordTemplate()}
                `;
            case States.UNACTIVE_RECORD_PAGE:
                return html`
                    ${this.getUnactiveRecordTemplate()}
                `;
            case States.USER_FORM:
                return html`
                    ${this.getUserFormTemplate()}
                `;
        }      
    }

    /**
     * The componenets associated with the active recording state. 
     * @returns {HTML} The HTML template for the active recording state.
     */
    getActiveRecordTemplate() {
        return html`
            <div class="header">
                <vox-user-icon 
                    @enter-form="${() => {this.state = States.USER_FORM}}">
                </vox-user-icon>
            </div>
            <div class="prompts">
                <vox-prompts
                    .promptState=${this.promptState}
                    @end-session="${() => {this.state = States.UNACTIVE_RECORD_PAGE}}">
                </vox-prompts>
                <vox-sound-wave 
                    .isRecording=${this.isRecording} 
                    .audioStream=${this.audioStream}>
                </vox-sound-wave>
            </div>
            <div class="buttons">
                <div class="button-container"></div>
                <div class="record-button-container">
                    <vox-record-button
                        @update-wave="${(e) => { 
                            this.isRecording = e.detail.isRecording;
                            this.audioStream = e.detail.audioStream; }}"
                        @change-prompt="${this.handleChangePrompt}">
                    </vox-record-button>
                </div>
                <div class="button-container">
                    <vox-skip-button
                        @skip-prompt="${this.handleChangePrompt}">
                    </vox-skip-button>
                </div>
            </div>
                `;
    }

    /**
     * The componenets associated with the unactive recording state. 
     * @returns {HTML} The HTML template for the unactive recording state.
     */
    getUnactiveRecordTemplate() {
        return html`
            <div class="header">
                <vox-user-icon 
                    @enter-form="${() => {this.state = States.USER_FORM}}">
                </vox-user-icon>
            </div>
            <div class="prompts">
                <vox-prompts
                    .promptState=${this.promptState}
                    @end-session="${() => {this.state = States.UNACTIVE_RECORD_PAGE}}">
                </vox-prompts>
                <vox-sound-wave 
                    .isRecording=${this.isRecording} 
                    .audioStream=${this.audioStream}>
                </vox-sound-wave>
            </div>
        `;
    }

    /**
     * The componenets associated with the user form state. 
     * @returns {HTML} The HTML template for the user form state.
     */
    getUserFormTemplate() {
        return html`
            <vox-user-form
                .userId = ${this.userId}
                .gender = ${this.gender}
                .userAge = ${this.userAge}
                .deviceType = ${this.deviceType}
                @update-user-info="${(e) => { 
                    this.updateUserInformation(e.detail.userInfo);
                    this.cookieService.makeUserInfoCookie(e.detail.userInfo); }}"
                @exit-form="${() => { this.state = States.ACTIVE_RECORD_PAGE }}">
            </vox-user-form>
        `;
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

    /**
     * Causes a new prompt to render in the vox-prompts child component. 
     */
    handleChangePrompt() {
        const promptComponent = this.shadowRoot.querySelector('vox-prompts');
        promptComponent.getNewPrompt();   
    }

    render() {  
        return html`
            ${this.displayComponents()}
        `;
    }
}

customElements.define('vox-app', VoxettaApp);
