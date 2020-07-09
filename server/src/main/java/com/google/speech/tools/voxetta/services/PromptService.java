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

package com.google.speech.tools.voxetta.services;

import com.google.speech.tools.voxetta.data.StatusResponse;

/**
 * Outlines functions necessary to implement the Prompt Service.
 */
public interface PromptService {

    /**
     * Adds a prompt to the database.
     *
     * @param type Type of the prompt. Either "text" or "body".
     * @param body The body of the prompt. Is either a phrase or image link.
     * @return a boolean denoting success or failure.
     */

    public StatusResponse savePrompt(String type, String body);

    /**
     * Retrieves one prompt from the database.
     *
     * @return one prompt from the Prompt database.
     */
    public String getOnePrompt();
}
