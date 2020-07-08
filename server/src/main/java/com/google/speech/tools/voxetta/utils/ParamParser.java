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

package com.google.speech.tools.voxetta.utils;

import javax.servlet.http.HttpServletRequest;

import java.util.Optional;

/**
 * Utility class to retrieve a param for a request and/or return a default
 */
public class ParamParser {

    /**
     * @return the request parameter, or the default value if the parameter is not found in the
     * request.
     */
    public static String getParameter(HttpServletRequest request, String name,
        String defaultValue) {
        return Optional.ofNullable(request.getParameter(name)).orElse(defaultValue);
    }
}
