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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;
import com.google.speech.tools.voxetta.data.StatusResponse;
import java.util.LinkedList;

public class DatastorePromptDebugService {

    private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    /**
     * Retrieves all prompts in the database as Entities. Primarily for manual debugging.
     *
     * @return {String} JSON array of all Prompt Entities.
     */
    public StatusResponse resetAllToUnread() {

        Iterable<Entity> iterableResults = datastore.prepare(new Query("Prompt")).asIterable();

        for (Entity entity : iterableResults) {
            entity.setProperty("read", 0);
            datastore.put(entity);
        }

        return new StatusResponse(true);
    }

    /**
     * Resets the read status of all prompts to 0 so they can be used again. Primarily for manual
     * debugging.
     *
     * @return a boolean denoting success or failure.
     */
    public String getAllPrompts() {

        Iterable<Entity> iterableResults = datastore.prepare(new Query("Prompt")).asIterable();

        LinkedList<Entity> prompts = new LinkedList<Entity>();
        for (Entity entity : iterableResults) {
            prompts.add(entity);
        }

        return gson.toJson(prompts);
    }
}
