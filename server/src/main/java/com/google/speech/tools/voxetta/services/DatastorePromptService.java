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

import com.google.appengine.api.datastore.FetchOptions.Builder;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;


import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;

import com.google.speech.tools.voxetta.data.Prompt;
import com.google.speech.tools.voxetta.data.PromptBuilder;

import java.util.LinkedList;
import java.util.List;

/**
 * Implements prompt service using Google Datastore API.
 */
public class DatastorePromptService implements PromptService {

    private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    public DatastorePromptService() {
    }

    @Override

    // TODO(eldrickb): change to StatusResponse object
    public boolean savePrompt(String type, String body) {

        // TODO(eldrickb): validation
        Entity promptEntity = new Entity("Prompt");

        promptEntity.setProperty("type", type);
        promptEntity.setProperty("body", body);

        promptEntity.setProperty("read", 0);

        datastore.put(promptEntity);

        return true;
    }

    /**
     * Returns one prompt from the database.
     * <p>
     * When it is retrieved, its "read" property is updated to 1. Once that happens, it can no
     * longer be retrieved via this function.
     *
     * @return one prompt from the Prompt database.
     */
    @Override
    public String getOnePrompt() {

        // get the prompt
        Filter unreadFilter = new FilterPredicate("read", FilterOperator.EQUAL, 0);
        List<Entity> unreadQueries = datastore.prepare(new Query("Prompt")
            .setFilter(unreadFilter))
            .asList(Builder.withLimit(1));

        // if none, return empty json
        if (unreadQueries.size() < 1) {
            return gson.toJson(unreadQueries);
        }

        // TODO(eldrickb): transactionize
        Entity retrievedEntity = unreadQueries.get(0);

        // set prompt as read
        retrievedEntity.setProperty("read", 1);
        datastore.put(retrievedEntity);

        // return the prompt as JSON
        Prompt retrievedPrompt = new PromptBuilder().buildFromEntity(retrievedEntity);
        return gson.toJson(retrievedPrompt);
    }
}
