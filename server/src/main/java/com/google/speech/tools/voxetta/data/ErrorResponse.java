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
 * An ErrorResponse is the container for a servlet's response to a front-end fetch request upon failure.  
 */
public class ErrorResponse extends StatusResponse {
 
  private String error; 

  /**
   * Creates a new ErrorResponse.
   *
   * @param success Represents if a backend fetch was successful or not. 
   * @param error The error message associated with a given failure.
   */ 
  public ErrorResponse(boolean success, String error) {
    super(success);
    this.error = error;
  }
}
