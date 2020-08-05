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

import {Icon} from '@material/mwc-icon';

import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/PlaybackButton.css';

export class PlaybackButton extends LitElement {
    static get properties() {
        return {
            audioUrl: {type: String},
            playing: {type: Boolean},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();

        this.audio = undefined;
        this.playing = false;
    }

    updated() {
        // only update if audio isn't set
        if (!this.audio && this.audioUrl) {
            this.audio = new Audio(this.audioUrl);
        }
    }

    /**
     * Plays or pauses audio depending on this.playing boolean
     */
    handleClick() {
        if (!this.playing) {
            this.playing = true;
            this.audio.play();
        } else {
            this.playing = false;
            this.audio.pause();

            // set to beginning
            this.audio.currentTime = 0;
        }
    }

    render() {
        return html` <button @click="${this.handleClick}">
            <mwc-icon
                >${this.playing
                    ? 'pause_circle_outline'
                    : 'play_circle_outline'}</mwc-icon
            >
            <span>${this.playing ? 'Pause' : 'Listen'}</span>
        </button>`;
    }
}

customElements.define('vox-playback-button', PlaybackButton);
