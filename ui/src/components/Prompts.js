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

import * as promptApi from '../utils/PromptApiService';

import {Icon} from '@material/mwc-icon';

export class Prompts extends LitElement {
    static get properties() {
        return {
            prompt: {type: Object},
            state: {type: String}
        };
    }

    static get styles() {
        return css`
            button {
                background-color: white;
                border: none;
                color: #a0a0a0;
                cursor: pointer;
                font-family: 'Roboto';
            }
            button:hover {
                background-color: #dcdcdc;
            }
            div {
                align-items: center; 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap;
                justify-content: center; 
                text-align: center;  
            }
            p {
                font-family: 'Roboto';
                font-size: 30px; 
            }
        `;
    }

    constructor() {
        super();
        this.state = 'Loading';
    }

    firstUpdated() {
        this.getNewPrompt();
    }

    /**
     * Emits an event that causes audio-recording related components
     * to disappear. 
     */
    async getNewPrompt() {
        const promptRequest = await promptApi.getNewPrompt();

        if (promptRequest.status === 'SUCCESS') {
            this.state = 'SUCCESS';
            this.prompt = promptRequest.prompt;
        } else if (promptRequest.status === 'EMPTY') {
            this.handleSessionEnd();
            this.state = 'FINISHED';
        } else {
            this.state = 'FAILURE';
        }
    }

    /**
     * Determines the approriate method of rendering the current prompt.
     * @returns {HTML} The HTML associated with the current prompt. 
     */
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

    /**
     * Determines the approriate rendering action based on the current
     * prompt state.
     * @returns {HTML} The HTML associated with the current state. 
     */
    renderPromptState() {
        switch (this.state) {
            case 'SUCCESS':
                return this.renderPromptType();
            case 'LOADING':
                return html`<p>Loading...</p>`;
            case 'FAILURE':
                return html`<p><b>Prompt failed to load.</b></p>`;
            case 'FINISHED':
                return html`<p>Your work session is finished.</p>`;
        }
    }

    /**
     * Emits an event that causes audio-recording related components
     * to disappear. 
     */
    handleSessionEnd() {
        const event = new CustomEvent('end-session', {});
        this.dispatchEvent(event);
    }

    render() { 
        return html`
            <div id="prompt-screen">
                ${this.renderPromptState()}
                <button @click="${promptApi.resetAllPromptsUnread}">
                    reset all prompts to unread
                </button> 
            </div>
        `;
    }
}

customElements.define('vox-prompts', Prompts);
