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

    .container {
        align-items: center;
        color: #3c4043;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        width: 100vw;
    }

    .header-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 270x;
    }

    .title-container {
        width: 250px;
    }

    .icon-container {
        width: 20px;
    }

    h1,h2 {
        font-family: 'Roboto';
        font-weight: normal;
        margin-top: 5px;
        margin-left: 0px;
        margin-right: 0px;
        width: 270px;
    }

    h1.title {
        font-size: 30px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    h2.description {
        font-size: 18px;
        margin-bottom: 10px;
    }

    mwc-icon {
        --mdc-icon-size: 40px;
        float: left;
        position: relative;
    }

    mwc-textfield {
        --mdc-theme-primary: #1a73e8;
        padding: 10px;
        width: 300px;
    }

    mwc-select {
        --mdc-theme-primary: #1a73e8;
        padding: 10px;
        width: 300px;
    }

    mwc-button {
        padding: 10px;
        width: 250px;
    }

    mwc-button.save {
        --mdc-theme-primary: #1a73e8;
        --mdc-theme-on-primary: white;
    }
    
    mwc-button.cancel {
        --mdc-theme-primary: white;
        --mdc-theme-on-primary: #1a73e8;
    }
`;
