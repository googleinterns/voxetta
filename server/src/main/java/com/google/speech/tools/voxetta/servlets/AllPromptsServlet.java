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

import com.google.speech.tools.voxetta.services.DatastorePromptDebugService;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.google.speech.tools.voxetta.utils.ParamParser.getParameter;

import com.google.speech.tools.voxetta.services.DatastorePromptService;

/**
 * Servlet for seeing / resetting all prompts; used for manual debugging for now
 */
@WebServlet("/prompt/all")
public class AllPromptsServlet extends HttpServlet {

    private final DatastorePromptDebugService promptService = new DatastorePromptDebugService();

    /**
     * gets all prompts via PromptService.getAllPrompts()
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().write(promptService.getAllPrompts());
    }

    /**
     * resets the read status of all prompts.
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        response.getWriter().write(promptService.resetAllToUnread().toJson());
    }
}
