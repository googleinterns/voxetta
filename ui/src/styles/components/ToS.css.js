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

import {css} from 'lit-element';

export default css`
    div.tos-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: 100vh;
        width: 100vw;
    }
    textarea.terms {
        border: none;
        font-family: 'Roboto';
        font-size: 15px;
        height: 100%;
        flex: 1;
        overflow: scroll;
        padding-top: 3vh;
        width: 90%;

        overflow-x: hidden;
    }
    textarea.terms:focus {
        outline: none;
    }
    div.button-container {
        box-shadow: 0px 2px 6px rgba(60, 64, 67, 0.5),
            0px 1px 2px rgba(60, 64, 67, 0.3),
            0px 4px 8px rgba(128, 134, 139, 0.06),
            0px -2px 8px rgba(128, 134, 139, 0.09);

        width: 100vw;
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 80px;
        justify-content: center;
        text-align: center;
        position: relative;
        z-index: 999;
    }
    mwc-button {
        font-size: 8x;
        padding: 10px;
    }
    mwc-button.accept {
        --mdc-theme-on-primary: white;
    }
    mwc-button.cancel {
        --mdc-theme-primary: white;
        --mdc-theme-on-primary: #1a73e8;
    }
`;
