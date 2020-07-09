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
import com.google.common.annotations.VisibleForTesting;
import com.google.gson.Gson;

import com.google.speech.tools.voxetta.data.Prompt;
import com.google.speech.tools.voxetta.data.PromptBuilder;

import com.google.speech.tools.voxetta.data.StatusResponse;
import java.util.List;

/**
 * Implements prompt service using Google Datastore API.
 */
public class DatastorePromptService implements PromptService {

    private DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
    private Gson gson = new Gson();

    public DatastorePromptService() {
    }

    @Override
    public StatusResponse savePrompt(String type, String body) {

        // TODO(eldrickb): validation
        Entity promptEntity = new Entity("Prompt");

        promptEntity.setProperty("type", type);
        promptEntity.setProperty("body", body);

        promptEntity.setProperty("read", 0);

        datastoreService.put(promptEntity);

        return new StatusResponse(true);
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
        List<Entity> unreadQueries = datastoreService.prepare(new Query("Prompt")
            .setFilter(unreadFilter))
            .asList(Builder.withLimit(1));

        // if none, return empty json
        if (unreadQueries.size() < 1) {
            return gson.toJson(new Object());
        }

        // TODO(eldrickb): transactionize
        Entity retrievedEntity = unreadQueries.get(0);

        // set prompt as read
        retrievedEntity.setProperty("read", 1);
        datastoreService.put(retrievedEntity);

        // return the prompt as JSON
        Prompt retrievedPrompt = new PromptBuilder().buildFromEntity(retrievedEntity);
        return gson.toJson(retrievedPrompt);
    }

    /**
     * Allow the servlet's Datastore service to be set for mocking purposes.
     *
     * @param inputService The service to serve as the DatastoreService.
     */
    @VisibleForTesting
    public void setDatastoreService(DatastoreService inputService) {
        datastoreService = inputService;
    }
}
