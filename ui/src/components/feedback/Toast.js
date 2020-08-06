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

import {IconButton} from '@material/mwc-icon-button';

import style from '../../styles/components/feedback/Toast.css.js';
import * as ToastUtils from '../../utils/ToastUtils.js';

/**
 * Component that displays error messages as a "toast" at the bottom of the app view.
 */
export class Toast extends LitElement {
    static get properties() {
        return {
            message: {type: String},
            icon: {type: String},
        };
    }

    static get styles() {
        return style;
    }

    /**
     * Clears the toast and emits an event to handle the the 
     * user's toast interaction properly.
     */
    handleToastInteraction() {
        ToastUtils.clearToast(this);

        if (this.icon !== 'clear') {
            const event = new CustomEvent('toast-' + this.icon, {
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(event);
        }
    }

    render() {
        return html`
            <div class="toast">
                <p>${this.message}</p>

                <mwc-icon-button
                    icon="${this.icon}"
                    @click=${this.handleToastInteraction}
                ></mwc-icon-button>
            </div>
        `;
    }
}

customElements.define('vox-toast', Toast);
