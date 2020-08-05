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
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
    }
    mwc-icon-button {
        --mdc-icon-button-size: 80px;
        --mdc-icon-size: 40px;
        border-radius: 50%;
        box-shadow: 0px 7px 26px rgba(128, 134, 139, 0.09),
            0px 3px 16px rgba(128, 134, 139, 0.06),
            0px 2px 4px rgba(60, 64, 67, 0.1),
            0px 8px 12px rgba(60, 64, 67, 0.11);
        background-color: white;
        color: #3c4043;
    }

    .recording {
        background: #ea4335;
        box-shadow: 0px 2px 14px rgba(234, 67, 53, 0.4),
            0px 8px 12px rgba(60, 64, 67, 0.11),
            0px 2px 4px rgba(60, 64, 67, 0.1),
            0px 3px 16px rgba(128, 134, 139, 0.06),
            0px 7px 26px rgba(128, 134, 139, 0.09);
        color: white;
    }

    .confirm {
        background: #34a853;
        box-shadow: 0px 2px 14px rgba(52, 168, 83, 0.5),
            0px 8px 12px rgba(60, 64, 67, 0.11),
            0px 2px 4px rgba(60, 64, 67, 0.1),
            0px 3px 16px rgba(128, 134, 139, 0.06),
            0px 7px 26px rgba(128, 134, 139, 0.09);
        color: white;
    }
`;
