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

import style from '../styles/components/SkipButton.css.js';

export class SkipButton extends LitElement {
    static get properties() {
        return {disabled: {type: Boolean}};
    }

    static get styles() {
        return style;
    }

    /**
     * Emits an event that causes a new prompt to be rendered
     * on the recording page.
     */
    handleSkip() {
        const event = new CustomEvent('skip-prompt', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <button @click="${this.handleSkip}" ?disabled=${this.disabled}>
                <mwc-icon>skip_next</mwc-icon>
                skip
            </button>
        `;
    }
}

customElements.define('vox-skip-button', SkipButton);
