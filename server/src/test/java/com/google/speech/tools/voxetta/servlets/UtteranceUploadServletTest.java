// Copyright 2019 Google LLC
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

import com.google.appengine.api.datastore.DatastoreFailureException;
import com.google.speech.tools.voxetta.data.Utterance;
import com.google.speech.tools.voxetta.data.ErrorResponse; 
import com.google.speech.tools.voxetta.data.StatusResponse;
import com.google.speech.tools.voxetta.services.UtteranceService;
import java.io.StringWriter;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mockito;

/**  
 * Verifies the intended behavior of UtteranceUploadServlet.java. 
 */
@RunWith(JUnit4.class)
public final class UtteranceUploadServletTest extends Mockito {

  private UtteranceService service; 
  private UtteranceUploadServlet servlet; 
  private HttpServletRequest request; 
  private HttpServletResponse response;
  private Utterance utterance; 

  @Before
  public void setUpMocksAndServletInstance() {
    // Mock the Datastore Utterance Service
    service = Mockito.mock(UtteranceService.class);

    // Create a new Blobstore Link Servlet & set its service 
    // to be the mocked Datastore Utterance Service
    servlet = new UtteranceUploadServlet();
    servlet.setService(service);

    // Mock the request and response 
    request = mock(HttpServletRequest.class);       
    response = mock(HttpServletResponse.class);
  }

  @Test
  public void doPost_SuccessfulDatastoreUpload_ReturnsSuccess() throws Exception {
    // Return the string 'audioBlobKey' when the mocked Datastore Utterance Service is called
    when(service.getAudioBlob(request)).thenReturn("audioBlobKey");

    // Create a writer that will record the doPost function's printed text
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(printWriter);

    // Call the doPost function now that all mocks are in place
    servlet.doPost(request, response);

    // Verify that the 'setContentType' function was truly called
    verify(response, atLeast(1)).setContentType("application/json"); 

    System.out.println(stringWriter.toString());

    // Assert that the function printed a JSON indicating success
    Assert.assertTrue(stringWriter.toString().contains(StatusResponse.convertToJson(new StatusResponse(true))));
  }

  @Test
  public void doPost_UnsuccessfulDatastoreUpload_ReturnsFailure() throws Exception {
    // Return the string 'audioBlobKey' when the mocked Datastore Utterance Service is called
    when(service.getAudioBlob(request)).thenReturn("audioBlobKey");

    // Throw a DatastoreFailureException when the saveUtterance() method is called
    Mockito.doThrow(DatastoreFailureException.class).when(service).saveUtterance(any(Utterance.class));

    // Create a writer that will record the doPost function's printed text
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(printWriter);

    // Call the doPost function now that all mocks are in place
    servlet.doPost(request, response);

    // Verify that the 'setContentType' function was truly called
    verify(response, atLeast(1)).setContentType("application/json"); 

    // Assert that the function printed a JSON indicating failure containing the appropriate error message
    Assert.assertTrue(stringWriter.toString().contains(
        StatusResponse.convertToJson(new ErrorResponse(false, "Error: Failed to upload Utterance to Datastore."))));
  }
}
