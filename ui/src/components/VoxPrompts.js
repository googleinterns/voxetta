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

import * as promptApi from '../utils/PromptApiService';

export class VoxPrompts extends LitElement {
    static get properties() {
        return {
            prompt: {type: String},
            state: {type: String},
        };
    }

    constructor() {
        super();
        this.state = 'NOT_ASKED';
        this.getNewPrompt();
    }

    async getNewPrompt() {
        this.state = 'LOADING';
        const promptRequest = await promptApi.getNewPrompt();

        if (promptRequest.status === 'SUCCESS') {
            this.state = 'SUCCESS';
            this.prompt = promptRequest.prompt;
        } else if (promptRequest.status === 'EMPTY') {
            this.state = 'FINISHED';
        } else {
            this.state = 'FAILURE';
        }
    }

    handleSkip() {
        this.getNewPrompt();
    }

    renderPromptType() {
        switch (this.prompt.type) {
            case 'TEXT':
                return html`<p>${this.prompt.body}</p>`;
            case 'IMAGE':
                return html`<img
                    src="${this.prompt.body}"
                    alt="Prompt Image"
                />`;
        }
    }

    renderPromptState() {
        switch (this.state) {
            case 'NOT_ASKED':
                return html`<p>haven't asked yet</p>`;
            case 'LOADING':
                return html`<p>Loading</p>`;
            case 'SUCCESS':
                return this.renderPromptType();
            case 'FAILURE':
                return html`<p><b>Prompt failed to load.</b></p>`;
            case 'FINISHED':
                return html`<p><i>No more prompts...</i></p>`;
        }
    }

    render() {
        return html`
            ${this.renderPromptState()}

            <button @click="${this.handleSkip}">skip</button>
            <button @click="${promptApi.resetAllPromptsUnread}">
                reset all prompts to unread
            </button>
        `;
    }
}

customElements.define('vox-prompts', VoxPrompts);
