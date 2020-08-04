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
import {UrlService} from './utils/UrlService';

import Views from './utils/ViewsEnum';
import * as ToastUtils from './utils/ToastUtils';
import {CollectionStates} from './utils/CollectionStatesEnum';

import {Toast} from './components/feedback/Toast';
import {ViewContainer} from './ViewContainer';

import style from './styles/StateContainer.css.js';

export class StateContainer extends LitElement {
    static get properties() {
        return {
            audioStream: {type: Object},
            canRecord: {type: Boolean},
            collectionState: {type: String},
            context: {type: Object},
            toast: {type: Object},
            view: {type: String},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();

        this.urlService = new UrlService();
        this.cookieService = new CookieService();

        this.setUserInfoOntoCookie();
        this.setProjectDetails();
        this.user = {
            userId: this.cookieService.getUserId(),
            gender: this.cookieService.getGender(),
            userAge: this.cookieService.getUserAge(),
            deviceType: this.cookieService.getDeviceType(),
        };

        this.canRecord = true;

        this.collectionState = CollectionStates.NOT_RECORDING;

        this.country = undefined;
        this.loginCompleted = false;
        this.reupload = false; 
        this.userInfoPresent = false;
        this.view = Views.COUNTRY_SELECTION;
        this.viewShadowRoot = undefined;
    }

    firstUpdated() {
        this.viewShadowRoot = this.shadowRoot.querySelector(
            'vox-view-container'
        ).shadowRoot;
    }

    updated(changedProperties) {
        if (
            changedProperties.has('collectionState') &&
            this.collectionState === CollectionStates.TRANSITIONING
        ) {
            this.handleChangePrompt();
        }
    }

    /**
     * Parses the URL for relevant project-related details.
     */
    setProjectDetails() {
        this.projectId = this.urlService.getProjectId();
        this.userLang = this.urlService.getLang();
        this.vendorId = this.urlService.getVendorId();
    }

    /**
     * If present and different from that stored in the cookies, give
     * the userId provided in the URL priority and clear every other
     * component of user information.
     */
    setUserInfoOntoCookie() {
        const userIdUrl = this.urlService.getUserId();
        const userIdCookie = this.cookieService.getUserId();
        if (userIdUrl && userIdUrl !== userIdCookie) {
            const user = {
                userId: userIdUrl,
                gender: '',
                userAge: '',
                deviceType: '',
            };
            this.cookieService.makeUserInfoCookie(user);
        }
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
     * Updates the state such that the country selector closes and
     * the appropriate terms of service appears.
     */
    handleCountrySelected(e) {
        this.country = e.detail.country;
        this.view = Views.TERMS_OF_SERVICE;
    }

    /**
     * Updates the state such that the Terms of Service closes and the
     * country selection component re-appears.
     */
    handleCancelTerms() {
        this.view = Views.COUNTRY_SELECTION;
    }

    /**
     * Updates the state such that the Terms of Service closes and the
     * user form appears.
     */
    handleAcceptTerms() {
        this.view = Views.USER_FORM;
    }

    /**
     * Updates the loginComplete property such that the application
     * knows the user's login process is complete.
     */
    handleFirstAccessOver() {
        this.loginCompleted = true;
    }

    /**
     * Updates the audioStream property with the most up-to-date
     * data from the vox-record-button component.
     */
    handleUpdateWave(e) {
        this.audioStream = e.detail.audioStream;
        this.context = e.detail.context;
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
     * Handles user form updating.
     * @param {Event} e Object dispatched from the user form.
     */
    handleUserInfoUpdate(e) {
        this.updateUserInformation(e.detail.userInfo);
        this.cookieService.makeUserInfoCookie(e.detail.userInfo);
    }

    handleAddToast(e) {
        this.toast = e.detail.message;
        this.reupload = e.detail.reupload; 
    }

    handleClearToast() {
        this.toast = undefined;
    }

    renderToast() {
        if (!this.toast) {
            return html``;
        }
 
        return html` 
            <vox-toast 
                message="${this.toast}"
                ?reupload="${this.reupload}"
            >
            </vox-toast> `;
    }

    /**
     * Updates the collection state when a new collection view is necessary
     * @param {Object} e Event object containing new state
     */
    updateCollectionState(e) {
        this.collectionState = e.detail.state;
    }

    /**
     * Saves the current audio file locally.
     * @param {Event} e Object dispatched from the record button.
     */
    handleSaveAudio(e) {
        this.latestAudio = e.detail.audio; 
    }

    /**
     * Attempts to reupload the latest audio file.
     */
    handleReuploadAudio() {
        const recordComponent = this.viewShadowRoot.querySelector(
            'vox-recording-section'
        );
        const buttonComponent = recordComponent.shadowRoot.querySelector(
            'vox-record-button'
        );
        buttonComponent.uploadAudio(this.latestAudio);
    }

    /**
     * Sets the collection state to transitioning,
     * which triggers the prompt component to fetch a new prompt
     */
    handleSkipPrompt() {
        this.collectionState = CollectionStates.TRANSITIONING;
    }

    render() {
        return html` <div
            id="state-wrapper"
            @accept-tos="${this.handleAcceptTerms}"
            @add-toast="${this.handleAddToast}"
            @cancel-tos="${this.handleCancelTerms}"
            @change-prompt="${this.handleChangePrompt}"
            @clear-toast="${this.handleClearToast}"
            @country-selected="${this.handleCountrySelected}"
            @end-session="${this.handleEndSession}"
            @enter-form="${this.handleEnterForm}"
            @exit-form="${this.handleExitForm}"
            @first-access-over="${this.handleFirstAccessOver}"
            @reupload-audio="${this.handleReuploadAudio}"
            @save-audio="${this.handleSaveAudio}"
            @skip-prompt="${this.handleSkipPrompt}"
            @update-collection-state=${this.updateCollectionState}
            @update-user-info="${this.handleUserInfoUpdate}"
            @update-wave="${this.handleUpdateWave}"
        >
            <vox-view-container
                .audioStream=${this.audioStream}
                .collectionState=${this.collectionState}
                .context=${this.context}
                .country=${this.country}
                .user=${this.user}
                .view=${this.view}
                ?is-recording=${this.isRecording}
                ?login-completed=${this.loginCompleted}
            >
            </vox-view-container>
            ${this.renderToast()}
        </div>`;
    }
}

customElements.define('vox-state-container', StateContainer);
