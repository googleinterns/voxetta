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

package com.google.speech.tools.voxetta.data;

/**
 * Client-facing schema for Prompts.
 */
public class Prompt {

    private final long id;
    private final Type type;
    private final String body;

    enum Type {
        TEXT,
        IMAGE
    }

    /**
     * @param id   {long} database ID of the prompt. param type {String} type of prompt.
     * @param body {String} body (or content) of the prompt.
     */
    public Prompt(long id, String type, String body) throws IllegalArgumentException {
        this.id = id;
        this.body = body;

        if (type.equalsIgnoreCase("text")) {
            this.type = Type.TEXT;
        } else if (type.equalsIgnoreCase("image")) {
            this.type = Type.IMAGE;
        } else {
            throw new IllegalArgumentException("Prompt is incorrectly defined");
        }
    }

    /**
     * @return {long} database ID of the prompt.
     */
    public long getId() {
        return id;
    }

    /**
     * @return {String} type of the prompt.
     */
    public String getType() {
        return type.toString();
    }

    /**
     * @return {String} body (or content) of the prompt.
     */
    public String getBody() {
        return body;
    }

}