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

import com.google.appengine.api.blobstore.BlobstoreFailureException;
import com.google.speech.tools.voxetta.services.DatastoreUtteranceService;
import java.io.StringWriter;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.junit.Assert;
import org.junit.Before; 
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mockito;

/** 
 * Verifies the intended behavior of BlobstoreLinkServlet.java. 
 */
@RunWith(JUnit4.class)
public final class BlobstoreLinkServletTest extends Mockito {

  private DatastoreUtteranceService service; 
  private BlobstoreLinkServlet servlet; 
  private HttpServletRequest request; 
  private HttpServletResponse response; 

  @Before
  public void setUpMocksAndServletInstance() {
    // Mock the Datastore Utterance Service
    service = Mockito.mock(DatastoreUtteranceService.class);

    // Create a new Blobstore Link Servlet & set its service 
    // to be the mocked Datastore Utterance Service
    servlet = new BlobstoreLinkServlet();
    servlet.setService(service);

    // Mock the request and response 
    request = mock(HttpServletRequest.class);       
    response = mock(HttpServletResponse.class);
  }

  @Test
  public void doGet_SuccessfulUrlRetrieval_ReturnsUrl() throws Exception {
    // Return the string 'url' when the mocked Datastore Utterance Service is called 
    when(service.getFormUrl()).thenReturn("url");

    // Create a writer that will record the doGet function's printed text
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(printWriter);
    
    // Call the doGet function now that all mocks are in place
    servlet.doGet(request, response);

    // Verify that the 'setContentType' function was truly called
    verify(response, atLeast(1)).setContentType("application/json"); 

    // Assert that the function printed a JSON indicating success containing the appropriate URL 
    Assert.assertTrue(stringWriter.toString().contains("{ \"success\": true, \"url\": \"url\" }"));
  }

  @Test
  public void doGet_UnsuccessfulUrlRetrieval_ReturnsFailure() throws Exception {
    // Throw a BlobstoreFailureException when the mocked Datastore Utterance Service is called 
    when(service.getFormUrl()).thenThrow(BlobstoreFailureException.class);

    // Create a writer that will record the doGet function's printed text
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(printWriter);
    
    // Call the doGet function now that all mocks are in place
    servlet.doGet(request, response);

    // Verify that the 'setContentType' function was truly called
    verify(response, atLeast(1)).setContentType("application/json"); 

    // Assert that the function printed a JSON indicating failure containing the appropriate error message
    Assert.assertTrue(stringWriter.toString().contains("{ \"success\": false, " +
        "\"error\": \"Error: Failed to upload audio file to Blobstore.\" }"));
  }
}
