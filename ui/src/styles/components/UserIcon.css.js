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
    div {
        display: inline-flex;
        align-items: center;
        padding: 0;
    }
    div:hover {
        background: #eeeeee;
    }

    mwc-icon-button {
        --mdc-icon-button-size: 30px;
        --mdc-icon-size: 30px;
    }

    span {
        display: none;
        margin: 0 8px 0 12px;
        font-size: 14px;
    }

    mwc-icon {
        display: none;
        color: #9aa0a6;
    }

    /* Breakpoints */

    /* Tablet */
    /* Enable more detailed user button at tablet+ */
    @media screen and (min-width: 600px) {
        div {
            padding: 6px;
            border: 1px solid #bdc1c6;
            border-radius: 999px;
        }

        span {
            display: initial;
        }

        mwc-icon {
            display: initial;
        }
    }
`;
