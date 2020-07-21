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

import com.google.appengine.api.blobstore.BlobstoreFailureException;
import com.google.appengine.api.datastore.DatastoreFailureException;
import com.google.common.annotations.VisibleForTesting; 
import com.google.speech.tools.voxetta.data.Utterance; 
import com.google.speech.tools.voxetta.data.ErrorResponse;
import com.google.speech.tools.voxetta.data.StatusResponse; 
import com.google.speech.tools.voxetta.services.DatastoreUtteranceService; 
import com.google.speech.tools.voxetta.services.UtteranceService; 
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 
 * Servlet that uploads Utterance Entities. 
 */
@WebServlet("/upload-utterance")
public class UtteranceUploadServlet extends HttpServlet {

  private UtteranceService service = new DatastoreUtteranceService(); 
  private StatusResponse statusResponse; 
  private String audio;

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");

    // Get the BlobKey of the audio file that has been uploaded to Blobstore
    audio = service.getAudioBlob(request);

    // Create and save Utterance to Datastore
    Utterance utterance = new Utterance.UtteranceBuilder()
      .setAudio(audio)
      .setUserId(request.getParameter("userId"))
      .setPromptId("PROMPTID")
      .setDevice(request.getParameter("deviceType"))
      .setAge(Integer.parseInt(request.getParameter("userAge")))
      .setGender(request.getParameter("gender"))
      .build();

    try {
      service.saveUtterance(utterance);
      String successJson = new StatusResponse(true).toJson();
      response.getWriter().println(successJson); 
    } catch (DatastoreFailureException e) {
      String failureJson = 
          new ErrorResponse(false, "Error: Failed to upload Utterance to Datastore.").toJson();
      response.getWriter().println(failureJson);
    }
  }

  /** 
   * Allow the servlet's Datastore Utterance Service to be set for mocking purposes.
   *
   * @param inputService The service to serve as the UtteranceService.
   */
  @VisibleForTesting
  public void setService(UtteranceService inputService) {
    service = inputService; 
  }
}
