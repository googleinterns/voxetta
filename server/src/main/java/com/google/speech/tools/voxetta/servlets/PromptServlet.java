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

package com.google.speech.tools.voxetta.servlets;

import com.google.common.annotations.VisibleForTesting;
import com.google.speech.tools.voxetta.data.StatusResponse;
import com.google.speech.tools.voxetta.services.PromptService;
import com.google.speech.tools.voxetta.services.UtteranceService;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.google.speech.tools.voxetta.utils.ParamParser.getParameter;

import com.google.speech.tools.voxetta.services.DatastorePromptService;

/**
 * Servlet that handles the  "/prompt" endpoint
 */
@WebServlet("/prompt")
public class PromptServlet extends HttpServlet {

    private PromptService promptService = new DatastorePromptService();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.getWriter().write(promptService.getOnePrompt());
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws IOException {

        final String type = getParameter(request, "type", "");
        final String body = getParameter(request, "body", "");

        StatusResponse promptServiceResponse = promptService.savePrompt(type, body);

        response.setContentType("application/json");
        response.getWriter().write(promptServiceResponse.toJson());
    }

    /**
     * Allow the servlet's Datastore Utterance Service to be set for mocking purposes.
     *
     * @param inputService The service to serve as the UtteranceService.
     */
    @VisibleForTesting
    public void setService(PromptService inputService) {
        promptService = inputService;
    }
}
