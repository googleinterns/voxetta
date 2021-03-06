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
 * Dispatches an error toast event from the element it is called from.
 * @param {LitElement} e Element to dispatch event from (usually `this`).
 * @param {*} message Message to display in error toast template.
 */
const dispatchErrorToast = (elem, message) => {
    const toastEvent = new CustomEvent('add-toast', {
        detail: {
            message,
            icon: 'clear',
        },
        bubbles: true,
        composed: true,
    });

    elem.dispatchEvent(toastEvent);
};

/**
 * Dispatches a retry toast event from the element it is called from.
 * @param {LitElement} e Element to dispatch event from (usually `this`).
 * @param {*} message Message to display in error toast template.
 */
const dispatchRetryToast = (elem, message) => {
    const toastEvent = new CustomEvent('add-toast', {
        detail: {
            message,
            icon: 'autorenew',
        },
        bubbles: true,
        composed: true,
    });

    elem.dispatchEvent(toastEvent);
};

/**
 * Dispatches an inactive toast event from the element it is called from,
 * which will clear the toast from the view
 * @param {LitElement} e Element to dispatch event from (usually `this`)
 */
const clearToast = (elem) => {
    const toastEvent = new CustomEvent('clear-toast', {
        bubbles: true,
        composed: true,
    });

    elem.dispatchEvent(toastEvent);
};

export {dispatchErrorToast, dispatchRetryToast, clearToast};
