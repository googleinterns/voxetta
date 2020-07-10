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

// TODO: merge with UtteranceApiService.js (in Ashley's PR)

const getNewPrompt = async () => {
    let resp;
    try {
        resp = await fetch('/prompt');
    } catch (e) {
        return {
            status: 'FAILURE',
        };
    }

    const prompt = await resp.json();

    if (Object.keys(prompt).length === 0) {
        return {
            status: 'EMPTY',
        };
    } else {
        return {
            status: 'SUCCESS',
            prompt,
        };
    }
};

const resetAllPromptsUnread = async () => {
    let resp;
    try {
        resp = await fetch('/prompt/all', {method: 'POST'});
    } catch (e) {
        throw new Error(e);
    }

    if (Object.keys(resp).length === 0) {
        return resp;
    } else {
        return resp.body();
    }
};

export {getNewPrompt, resetAllPromptsUnread};
