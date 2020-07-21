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

/**
 * States for various toast statuses
 */
const states = {
    ERROR: 'ERROR',
    INACTIVE: 'INACTIVE',
};

/**
 * Dispatches an error toast event from the element it is called from
 * @param {LitElement} e Element to dispatch event from (usually `this`)
 * @param {*} message Message to display in error toast template
 */
const dispatchErrorToast = (e, message) => {
    const toastEvent = new CustomEvent('update-toast', {
        detail: {
            state: states.ERROR,
            message,
        },
        bubbles: true,
        composed: true,
    });

    e.dispatchEvent(toastEvent);
};

/**
 * Dispatches an inactive toast event from the element it is called from,
 * which will clear the toast from the view
 * @param {LitElement} e Element to dispatch event from (usually `this`)
 */
const dispatchInactiveToast = (e) => {
    const toastEvent = new CustomEvent('update-toast', {
        detail: {
            state: states.INACTIVE,
        },
        bubbles: true,
        composed: true,
    });

    e.dispatchEvent(toastEvent);
};

export {states, dispatchErrorToast, dispatchInactiveToast};
