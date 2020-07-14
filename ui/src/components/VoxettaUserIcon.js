/*
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import {LitElement, html, css} from 'lit-element';

import {Icon} from '@material/mwc-icon';
import {IconButton} from '@material/mwc-icon-button';

/**
 * Button responsible for enabling the user to record and upload audio files. 
 */
export class VoxettaUserIcon extends LitElement {

    static get styles() {
        return css`
            mwc-icon-button {
                --mdc-icon-button-size: 60px;
                --mdc-icon-size: 30px; 
                color: #3c4043;
            }
        `;
    }

    /**
     * Emits an event that causes the record page to close and the user
     * form to appear. 
     */
    handleUserIconClick() {
        const event = new CustomEvent('enter-form', {});
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <mwc-icon-button 
                icon="account_circle"
                @click=${this.handleUserIconClick}
            </button>
        `;
    }
}

customElements.define('vox-user-icon', VoxettaUserIcon);