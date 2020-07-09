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

import {VoxettaRecordButton} from './VoxettaRecordButton';
import {VoxettaUserForm} from './VoxettaUserForm';
import {VoxettaUserIcon} from './VoxettaUserIcon';

export class VoxettaApp extends LitElement {

    static get properties() {
        return {
            state: {type: String}
        };
    }

    constructor() {
        super();
        this.state = 'RECORD-PAGE'; 
    }

    render() {  
        return html`
            ${this.displayComponents()}
            
        `;
    }

    /**
     * Returns the appropriate components based upon the current state of the 
     * application. 
     * @returns {HTML} The HTML containing the appropriate components to render.
     */
    displayComponents() {
        switch (this.state) {
            case 'RECORD-PAGE':
                return html`
                    <vox-user-icon 
                        @enter-form="${(e) => { this.state = e.detail.state }}"
                        ></vox-user-icon>
                    <vox-record-button></vox-record-button>
                `;
            case 'USER-FORM':
                 return html`
                    <vox-user-form @exit-form="${(e) => { this.state = e.detail.state }}">
                        </vox-user-form>
                `;
        }       
    }
}

customElements.define('vox-app', VoxettaApp);
