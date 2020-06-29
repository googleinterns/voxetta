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
 
package com.google.speech.tools.voxetta.servlets;

import com.google.appengine.api.blobstore.BlobstoreFailureException;
import com.google.speech.tools.voxetta.services.DatastoreUtteranceService;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/** 
 * Servlet that returns a Blobstore URL. 
 */
@WebServlet("/blobstore-utterance-upload-link")
public class BlobstoreLinkServlet extends HttpServlet {

  private DatastoreUtteranceService service = new DatastoreUtteranceService(); 
 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");

    // Create and return a Blobstore Upload URL  
    try {
      String uploadUrl = service.getFormUrl();
      response.getWriter().println("{ \"success\": true, \"url\": \"" + uploadUrl + "\" }"); 
    } catch (BlobstoreFailureException e) {
      response.getWriter().println("{ \"success\": false, \"error\": \"Error: Failed to upload audio file to Blobstore.\" }");
    }
  }

  /** 
   * Allow the servlet's Datastore Utterance Service to be set for mocking purposes.
   */
  public void setService(DatastoreUtteranceService inputService) {
    service = inputService; 
  }
}
