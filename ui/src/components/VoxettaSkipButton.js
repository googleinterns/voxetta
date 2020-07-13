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

import {Icon} from '@material/mwc-icon';

export class VoxettaSkipButton extends LitElement {
    static get properties() {
        return {
            prompt: {type: String},
            state: {type: String},
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
                text-transform: capitalize;
                width: 50px; 
            }
            button:hover {
                background-color: #dcdcdc;
            }
        `;
    }

    render() {
        return html`
            <button @click="${this.handleSkip}">
                <mwc-icon>skip_next</mwc-icon>
                skip
            </button>
        `;
    }

    /**
     * Emits an event that causes a new prompt to be rendered
     * on the recording page. 
     */
    handleSkip() {
        const event = new CustomEvent('skip-button', {});
        this.dispatchEvent(event);
    }
}

customElements.define('vox-skip-button', VoxettaSkipButton);
