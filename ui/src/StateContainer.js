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

import {LitElement, html} from 'lit-element';

import {CookieService} from './utils/CookieService';
import Views from './utils/ViewsEnum';
import {states as ToastStates} from './utils/ToastUtils';

import {Toast} from './components/feedback/Toast';
import {ViewContainer} from './ViewContainer';

export class StateContainer extends LitElement {
    static get properties() {
        return {
            view: {type: String},
            canRecord: {type: Boolean},
            isRecording: {type: Boolean},
            audioStream: {type: Object},
            toast: {type: Object},
        };
    }

    constructor() {
        super();

        this.cookieService = new CookieService();

        this.user = {
            userId: this.cookieService.getUserId(),
            gender: this.cookieService.getGender(),
            userAge: this.cookieService.getUserAge(),
            deviceType: this.cookieService.getDeviceType(),
        };

        this.view = Views.COLLECTION;
        this.canRecord = true;
        this.toast = {
            state: ToastStates.INACTIVE,
        };

        this.viewShadowRoot = undefined;
    }

    firstUpdated() {
        this.viewShadowRoot = this.shadowRoot.querySelector(
            'vox-view-container'
        ).shadowRoot;
    }

    /**
     * Updates user-related fields with the appropriate values.
     * @param {Object} userInfo - The information entered on the user form.
     */
    updateUserInformation(userInfo) {
        this.user = {
            userId: userInfo.userId,
            gender: userInfo.gender,
            userAge: userInfo.userAge,
            deviceType: userInfo.deviceType,
        };
    }

    /**
     * Updates the isRecording and audioStream properties with the most up-to-date
     * data from the vox-record-button component.
     */
    handleUpdateWave() {
        const recordComponent = this.viewShadowRoot.querySelector(
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
        const promptComponent = this.viewShadowRoot.querySelector(
            'vox-prompts'
        );
        promptComponent.getNewPrompt();
    }

    /**
     * Updates the view such that all components related to audio collection
     * are no longer visible.
     */
    handleEndSession() {
        this.canRecord = false;
    }

    /**
     * Handles user form updating
     * @param {Event} e object dispatched from user form
     */
    handleUserInfoUpdate(e) {
        this.updateUserInformation(e.detail.userInfo);
        this.cookieService.makeUserInfoCookie(e.detail.userInfo);
    }

    handleUpdateToast(e) {
        let toast;

        if (e.detail.state !== ToastStates.INACTIVE) {
            toast = {
                state: e.detail.state,
                message: e.detail.message,
            };
        } else {
            toast = {
                state: ToastStates.INACTIVE,
            };
        }

        this.toast = toast;
    }

    renderToast() {
        if (!this.toast || this.toast.state === ToastStates.INACTIVE) {
            return html``;
        }
        return html` <vox-toast message="${this.toast.message}"></vox-toast> `;
    }

    render() {
        return html` <div
            id="state-wrapper"
            @enter-form="${this.handleEnterForm}"
            @exit-form="${this.handleExitForm}"
            @update-user-info="${this.handleUserInfoUpdate}"
            @change-prompt="${this.handleChangePrompt}"
            @skip-prompt="${this.handleChangePrompt}"
            @end-session="${this.handleEndSession}"
            @update-wave="${this.handleUpdateWave}"
            @update-toast="${this.handleUpdateToast}"
        >
            <vox-view-container
                .view=${this.view}
                ?can-record=${this.canRecord}
                ?is-recording=${this.isRecording}
                .audio-stream=${this.audioStream}
                .user=${this.user}
                .toast=${this.toast}
            >
                <div slot="toast">
                    ${this.renderToast()}
                </div>
            </vox-view-container>
        </div>`;
    }
}

customElements.define('vox-state-container', StateContainer);
