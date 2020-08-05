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
