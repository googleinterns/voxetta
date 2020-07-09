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

import {IconButton} from '@material/mwc-icon-button';

/**
 * Button responsible for enabling the user to record and upload audio files. 
 */
export class VoxettaUserIcon extends LitElement {

    render() {
        // TO DO (ashley) : stylize and add an actual icon
        return html`
            <mwc-icon-button 
                icon="filler"
                @click=${this.handleUserIconClick}
            </button>
        `;
    }

    /**
     * Emits an event that causes the record page to close and the user
     * form to appear. 
     */
    handleUserIconClick() {
        let event = new CustomEvent('enter-form', {
            detail: {
                state: 'USER-FORM'
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('vox-user-icon', VoxettaUserIcon);