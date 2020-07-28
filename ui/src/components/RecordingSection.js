import {LitElement, html} from 'lit-element';

import {CollectionStates} from '../utils/CollectionStatesEnum';

export class RecordingSection extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
        };
    }

    /**
     * @returns {Boolean} If the current local state property is the recording state
     */
    getIsRecordingState() {
        return this.collectionState === CollectionStates.RECORDING;
    }

    renderFeedbackWindow() {
        switch (this.collectionState) {
            case CollectionStates.RECORDING:
                return html` <vox-sound-wave
                    .collectionState=${this.collectionState}
                    .audioStream=${this.audioStream}
                >
                </vox-sound-wave>`;
            case CollectionStates.BEFORE_UPLOAD:
                return html`put play button here`;
            case CollectionStates.QC_ERROR:
                return html`qc error`;
            default:
                return html``;
        }
    }

    render() {
        return html` <div id="feedback top-level-component">
                ${this.renderFeedbackWindow()}
            </div>

            <div class="buttons top-level-component">
                <div class="button-container"></div>
                <div class="record-button-container">
                    <vox-record-button .collectionState=${this.collectionState}>
                    </vox-record-button>
                </div>
                <div class="button-container">
                    <vox-skip-button> </vox-skip-button>
                </div>
            </div>`;
    }
}

customElements.define('vox-recording-section', RecordingSection);
