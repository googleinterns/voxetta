import {LitElement, html} from 'lit-element';

import {ButtonStates} from '../utils/ButtonStatesEnum';

export class ButtonSection extends LitElement {
    static get properties() {
        return {
            state: {type: String},
        };
    }

    constructor() {
        this.state;
    }

    render() {
        switch (this.state) {
            case ButtonStates.BEFORE_UPLOAD:
                return html``;

            case ButtonStates.RECORDING:
                return html` <div class="buttons top-level-component">
                    <div class="button-container"></div>
                    <div class="record-button-container">
                        <vox-record-button> </vox-record-button>
                    </div>
                    <div class="button-container">
                        <vox-skip-button> </vox-skip-button>
                    </div>
                </div>`;
        }
    }
}

customElements.define('vox-button-section', ButtonSection);
