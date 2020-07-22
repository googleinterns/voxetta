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

import {ToSService} from '../utils/ToSService';

import {ListItem} from '@material/mwc-list/mwc-list-item';
 
/**
 * Component responsible for providing users a means to agree
 * to the terms of service. 
 */
export class ToS extends LitElement {

    static get properties() {
        return {
            country: {type: String},
            tos: {type: Array}
        };
    }

    static get styles() {
        return css`
            textarea.terms {
                border: none;
                font-family: 'Roboto';
                font-size: 15px; 
                height: 85vh;
                width: 90%;
                overflow: scroll; 
                padding: 5px 20px 0px 20px; 
            }
            div.button-container {
                align-items: center; 
                box-shadow: 0px -3px 1px -1px #dcdcdc;
                display: flex; 
                flex-direction: row; 
                flex-wrap: wrap;
                height: 12vh;
                justify-content: center; 
                text-align: center;  
            }
            mwc-button {
                font-size: 8x;
                padding: 10px;
            }
            mwc-button.accept {
                --mdc-theme-primary: #1a73e8;
                --mdc-theme-on-primary: white;
                width: 60vw;
            }
            mwc-button.cancel {
                --mdc-theme-primary: white;
                --mdc-theme-on-primary: #1a73e8;
                width: 15vw;
            }
        `;
    }

    constructor() {
        super();
        this.tos = [];
        this.tosService = new ToSService(); 
    }

    async firstUpdated() {
        this.tos = await this.tosService.getToS(this.country);
    }

    updated() {
        this.detectOverflow(); 
    }

    /**
     * Enables the 'accept-button' if it has been detected that the user has read the terms of service
     * in its entirety. 
     */
    checkScroll() {
        const termsContainer = this.shadowRoot.getElementById('terms-container');
        if(termsContainer.offsetHeight + termsContainer.scrollTop >= termsContainer.scrollHeight - 5) {
            this.shadowRoot.getElementById('accept-button').disabled = false;
        }
    }

    /**
     * Disables the 'accept-button' if it has been detected that the terms container cannot 
     * be viewed in its entirety without scrolling. 
     */
    detectOverflow() {
        const termsContainer = this.shadowRoot.getElementById('terms-container');
        if(termsContainer.clientHeight < termsContainer.scrollHeight) {
            this.shadowRoot.getElementById('accept-button').disabled = true;
        }
    }

    /**
     * Emits an event that causes the Terms of Service to close and the 
     * recording page to appear. 
     */
    handleAcceptTerms() {
        const event = new CustomEvent('accept-tos', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /**
     * Emits an event that causes the Terms of Service to close and the Country
     * Selector component to re-appear. 
     */
    handleCancelTerms() {
        const event = new CustomEvent('cancel-tos', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <textarea 
                id="terms-container"
                class="terms"
                dir="auto"
                readonly
                @scroll="${this.checkScroll}">
                    ${this.tos}
            </textarea>
            <div class="button-container">
                <mwc-button 
                    class="cancel"
                    unelevated 
                    label="Cancel"
                    @click=${this.handleCancelTerms}>
                </mwc-button>
                <mwc-button 
                    id="accept-button"
                    class="accept"
                    unelevated 
                    label="I have read and agree to terms"
                    @click=${this.handleAcceptTerms}>
                </mwc-button>
            </div>
        `;
    }
}
 
customElements.define('vox-tos', ToS);