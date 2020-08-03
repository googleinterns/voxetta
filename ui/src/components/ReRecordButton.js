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

import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/ReRecordButton.css';

export class ReRecordButton extends LitElement {
    static get properties() {
        return {};
    }

    dispatchReRecord() {
        const event = new CustomEvent('re-record', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    render() {
        return html` <button @click="${this.dispatchReRecord}">
            <mwc-icon>refresh</mwc-icon>
            re-record
        </button>`;
    }
}

customElements.define('vox-re-record-button', ReRecordButton);
