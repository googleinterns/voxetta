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
    //    private final VendorName;
//    private final ProjectId;
    private final String type;
    private final String body;

    public Prompt(long id, String type, String body) {
        this.id = id;
        this.type = type;
        this.body = body;
    }

    public long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getBody() {
        return body;
    }

}