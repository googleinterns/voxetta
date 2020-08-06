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

    #feedback,

    .section-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    .feedback-container {
        height: 120px; 
    }

    .buttons {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 40px;
    } 

    .button-container {
        width: 50px;
    }

    .record-button-container {
        margin: 0 60px;
    }

    .button-container {
        width: 80px;
    }

    p {
        color: red;
        text-align: center;
    }

    /* Tablet */
    @media screen and (min-width: 600px) {
        .buttons {
            padding-bottom: 10vh;
        }
    }
`;
