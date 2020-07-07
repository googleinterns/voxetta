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

import promptApi from '../utils/PromptApi';

export class VoxPrompts extends LitElement {
    static get properties() {
        return {
            prompt: {type: String},
        };
    }
    constructor() {
        super();
        this.getNewPrompt();
    }

    getNewPrompt() {
        promptApi
            .getNewPrompt()
            .then((nextPrompt) => (this.prompt = nextPrompt));
    }

    handleSkip(e) {
        this.getNewPrompt();
    }

    determinePromptType() {
        if (this.prompt.type === 'TEXT') {
            return html`<p>${this.prompt.body}</p>`;
        } else if (this.prompt.type === 'IMAGE') {
            return html`<img src="${this.prompt.body}" alt="Prompt Image" />`;
        } else if (this.prompt.type === 'EMPTY') {
            return html`<p><i>No more prompts...</i></p>`;
        } else {
            throw console.error('Invalid prompt type');
        }
    }

    render() {
        return html`
            ${this.determinePromptType()}

            <button @click="${this.handleSkip}">skip</button>
            <button @click="${promptApi.resetAllPromptsUnread}">
                reset all prompts to unread
            </button>
        `;
    }
}

customElements.define('vox-prompts', VoxPrompts);
