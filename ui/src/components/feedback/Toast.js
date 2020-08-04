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
 * Component that displays error messages as a "toast" at the top of the app view.
 */
export class Toast extends LitElement {
    static get properties() {
        return {
            message: {type: String},
            reupload: {type: Boolean},
        };
    }

    static get styles() {
        return style;
    }

    dispatchClearToast() {
        ToastUtils.clearToast(this);
    }

    /**
     * Emits an event that results in an attempt to manually
     * resubmit the last failed audio upload.
     */
    handleReuploadAudio() {
        const event = new CustomEvent('reupload-audio', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
        ToastUtils.clearToast(this);
    }

    render() {
        return html`
            <div class="toast">
                <p>${this.message}</p>

                <!-- Display the reupload button if it is a reupload toast -->
                ${this.reupload
                    ? html`
                        <mwc-icon-button
                            icon="autorenew"
                            @click=${this.handleReuploadAudio}
                        ></mwc-icon-button>
                      `
                    : html``}

                <mwc-icon-button
                    icon="clear"
                    @click=${this.dispatchClearToast}
                ></mwc-icon-button>
            </div>
        `;
    }
}

customElements.define('vox-toast', Toast);
