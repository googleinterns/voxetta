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

/**
 * Component encapsulating the Voxetta app.
 */
export class VoxettaApp extends LitElement {
    render() {
        return html`
            <main>
                Welcome to the Voxetta app
            </main>
        `;
    }
}

customElements.define('vox-app', VoxettaApp);
