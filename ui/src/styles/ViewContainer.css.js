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

// TODO(eldrickb, in styling): clean this up
export default css`
    /* skeleton  */

    #view-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100%;
    }

    #collection-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .top-level-component {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    header.top-level-component {
        align-items: center;
        flex-direction: row;
        height: 70px;
    }

    header > div {
        flex: 1;
    }

    vox-prompts {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .prompts {
        flex: 1;
    }

    /* Details */

    header {
        padding: 0 12px;
        box-shadow: 0px -2px 8px rgba(128, 134, 139, 0.09),
            0px 4px 8px rgba(128, 134, 139, 0.06),
            0px 1px 2px rgba(60, 64, 67, 0.3),
            0px 2px 6px rgba(60, 64, 67, 0.15);
    }

    .progress {
        text-align: center;
        color: #9aa0a6;
        font-weight: 500;
    }

    .progress span {
        text-align: center;
    }

    /* 
        Breakpoints 
    */
`;
