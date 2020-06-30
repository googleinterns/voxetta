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

//package com.google.speech.tools.voxetta;

package com.google.speech.tools.voxetta;

import com.google.appengine.api.blobstore.BlobstoreService;
import java.io.StringWriter;
import java.io.PrintWriter;
import javax.servlet.http.*;
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

  @Test
  public void VerifyBlobstoreLinkBehavior() throws Exception {
    // Mock the Blobstore API service
    BlobstoreService blobstoreService = Mockito.mock(BlobstoreService.class);

    // Return the string 'url' when the mocked Blobstore service is called
    when(blobstoreService.createUploadUrl("/upload-utterance")).thenReturn("url");

    // Create a new servlet & set its Blobstore service to be the mocked service
    BlobstoreLinkServlet servlet = new BlobstoreLinkServlet();
    servlet.setBlobstoreService(blobstoreService);

    // Mock the request and response 
    HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);

    // Create a writer that will record the doGet function's printed text
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(printWriter);

    // Call the doGet function now that all mocks are in place
    servlet.doGet(request, response);

    // Verify that the 'setContentType' function was truly called
    verify(response, atLeast(1)).setContentType("text/html"); 

    // Assert that the function printed the mock's retrieved 'url'
    Assert.assertTrue(stringWriter.toString().contains("url"));
  }
}