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

import com.google.appengine.api.datastore.Entity;


/**
 * Builder pattern for Prompts.
 */
public class PromptBuilder {

    private long id;
    private String type;
    private String body;

    public PromptBuilder() {
    }

    public PromptBuilder setId(long id) {
        this.id = id;
        return this;
    }

    public PromptBuilder setType(String type) {
        this.type = type;
        return this;
    }

    public PromptBuilder setBody(String body) {
        this.body = body;
        return this;
    }

    /**
     * Builds a Prompt instance with the properties of a Prompt entity.
     *
     * @param entity Datastore entity.
     * @return a Prompt instnace with the properties of the entity.
     */
    public Prompt buildFromEntity(Entity entity) {
        return this
            .setId((long) entity.getKey().getId())
            .setType((String) entity.getProperty("type"))
            .setBody((String) entity.getProperty("body"))
            .build();
    }

    public Prompt build() {
        return new Prompt(id, type, body);
    }
}
