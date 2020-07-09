// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.speech.tools.voxetta.data;

import com.google.common.annotations.VisibleForTesting;
import com.google.gson.Gson;

/** 
 * A StatusResponse is the container for a servlet's response to a front-end fetch request.  
 */
public class StatusResponse {
  
  private boolean success;

  /**
   * Creates a new StatusResponse.
   *
   * @param success Represents if a backend fetch was successful or not. 
   */ 
  public StatusResponse(boolean success) {
    this.success = success;
  }

  /** 
   * Returns a JSON representation of a StatusResponse.  
   *
   * @return a JSON representation.
   */
  public String toJson() {
    Gson gson = new Gson();
    return gson.toJson(this);
  }

  /**
   * Returns status of statusResponse
   */
  @VisibleForTesting
  public boolean getSuccess() {
    return success;
  }
}
