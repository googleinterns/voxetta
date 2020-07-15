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

import {CookieService} from './utils/CookieService';
import style from './styles/VoxettaApp.css.js';

import {VoxettaWaveCanvas} from './components/VoxettaWaveCanvas';
import {VoxettaPrompts} from './components/VoxettaPrompts';
import {VoxettaRecordButton} from './components/VoxettaRecordButton';
import {VoxettaSkipButton} from './components/VoxettaSkipButton';
import {VoxettaUserForm} from './components/user/VoxettaUserForm';
import {VoxettaUserIcon} from './components/user/VoxettaUserIcon';

/**
 * Possible app view.
 */
const Views = {
    COLLECTION: 'collection',
    USER_FORM: 'user_form',
};

// TODO: sweep sweep sweep
// abstract views for space prompt occupies
// ensure views / states are concisely determined and shown
// try to make this code easier to understand
// make eslint not annoying

export class VoxettaApp extends LitElement {
    /**
     * @property view - The current view of the application.
     * @property isRecording - Whether or not the application is
     *  actively recording.
     * @property audioStream - The stream of audio that is being
     *  actively recorded, if applicable.
     */
    static get properties() {
        return {
            view: {type: String},
            canRecord: {type: Boolean},
            isRecording: {type: Boolean},
            audioStream: {type: Object},
        };
    }

    constructor() {
        super();
        this.cookieService = new CookieService();
        this.view = Views.COLLECTION;
        this.canRecord = true;
        this.userId = this.cookieService.getCookieValue('userId');
        this.gender = this.cookieService.getCookieValue('gender');
        this.userAge = this.cookieService.getCookieValue('userAge');
        this.deviceType = this.cookieService.getCookieValue('deviceType');
    }

    static get styles() {
        return style;
    }

    /**
     * Renders the componenets associated with the collection view.
     * @return {HTML} The HTML template for the collection view.
     */
    renderCollectionView() {
        return html`
            <div class="header">
                <div>
                    <vox-user-icon
                        @enter-form="${this.handleEnterForm}"
                        userId=${this.userId}
                    >
                    </vox-user-icon>
                </div>

                <!-- Hide progress when finished -->
                ${this.canRecord &&
                html`
                    <div class="progress">
                        <span>x of x</span>
                    </div>
                `}

                <div class="connection-status"></div>
            </div>
            <div class="prompts">
                <vox-prompts @end-session="${this.handleEndSession}">
                </vox-prompts>
            </div>

            <div id="feedback">
                <vox-sound-wave
                    .isRecording=${this.isRecording}
                    .audioStream=${this.audioStream}
                >
                </vox-sound-wave>
            </div>

            <!-- Hide recording when finished -->
            ${this.canRecord &&
            html` <div class="buttons">
                <div class="button-container"></div>
                <div class="record-button-container">
                    <vox-record-button
                        @update-wave="${this.handleUpdateWave}"
                        @change-prompt="${this.handleChangePrompt}"
                    >
                    </vox-record-button>
                </div>
                <div class="button-container">
                    <vox-skip-button @skip-prompt="${this.handleChangePrompt}">
                    </vox-skip-button>
                </div>
            </div>`}
        `;
    }

    /**
     * Renders the componenets associated with the user form view.
     * @return {HTML} The HTML template for the user form view.
     */
    renderUserFormView() {
        return html`
            <vox-user-form
                .userId=${this.userId}
                .gender=${this.gender}
                .userAge=${this.userAge}
                .deviceType=${this.deviceType}
                @update-user-info="${(e) => {
                    this.updateUserInformation(e.detail.userInfo);
                    this.cookieService.makeUserInfoCookie(e.detail.userInfo);
                }}"
                @exit-form="${this.handleExitForm}"
            >
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
     * Updates the isRecording and audioStream properties with the most up-to-date
     * data from the vox-record-button component.
     */
    handleUpdateWave() {
        const recordComponent = this.shadowRoot.querySelector(
            'vox-record-button'
        );
        this.isRecording = recordComponent.getIsRecording();
        this.audioStream = recordComponent.getAudioStream();
    }

    /**
     * Updates the view such that the record page closes and the user form appears.
     */
    handleEnterForm() {
        this.view = Views.USER_FORM;
    }

    /**
     * Updates the view such that the user form closes and the record page appears.
     */
    handleExitForm() {
        this.view = Views.COLLECTION;
        this.canRecord = true;
    }

    /**
     * Causes a new prompt to render in the vox-prompts child component.
     */
    handleChangePrompt() {
        const promptComponent = this.shadowRoot.querySelector('vox-prompts');
        promptComponent.getNewPrompt();
    }

    /**
     * Updates the view such that all components related to audio collection
     * are no longer visible.
     */
    handleEndSession() {
        this.canRecord = false;
    }

    render() {
        let viewTemplate;

        switch (this.view) {
            case Views.COLLECTION:
                viewTemplate = html` ${this.renderCollectionView()} `;
                break;
            case Views.USER_FORM:
                viewTemplate = html` ${this.renderUserFormView()} `;
                break;
        }

        return html` <main>
            ${viewTemplate}
        </main>`;
    }
}

customElements.define('vox-app', VoxettaApp);
