/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LCENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.speech.tools.voxetta.data;

/**
 * Client-facing schema for Prompts.
 */
public class Prompt {

    private final long id;
    private final Type type;
    private final String body;

    /**
     * Determines the "type" of prompt and dictates what to expect in the prompt body.
     * TEXT = body will be an excerpt to be read out
     * IMAGE = body will be a URL to an image to be described
     */
    enum Type {
        TEXT,
        IMAGE
    }

    /**
     * @param id   {long} database ID of the prompt. param type {String} type of prompt.
     * @param type {Type} type of prompt this is.
     * @param body {String} body (or content) of the prompt.
     */
    public Prompt(long id, Type type, String body) throws IllegalArgumentException {
        this.id = id;
        this.body = body;
        this.type = type;
    }

    /**
     * @return {long} database ID of the prompt.
     */
    public long getId() {
        return id;
    }

    /**
     * @return {Type} type of the prompt.
     */
    public Type getType() {
        return type;
    }

    /**
     * @return {String} body (or content) of the prompt.
     */
    public String getBody() {
        return body;
    }
}