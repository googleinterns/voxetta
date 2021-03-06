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

    mwc-select {
        --mdc-theme-primary: #1a73e8;
        width: 300px; 
    }

    h3 {
        font-family: 'Roboto';
        font-size: 28px; 
        font-weight: normal;
        padding: 30px 40px 0px 40px;
    }
    
    p {
        font-family: 'Roboto';
        font-size: 18px; 
        font-weight: bolder; 
        padding: 0px 40px 0px 40px;
    }
`;
