// Copyright 2020 Google LLC
 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
 
//     https://www.apache.org/licenses/LICENSE-2.0
 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
package com.google.speech.tools.voxetta;
 
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/** 
* Servlet that returns a Blobstore URL. 
*/
@WebServlet("/blobstore-link")
public class BlobstoreLinkServlet extends HttpServlet {
 
  private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Redirect to Datastore processing after Blobstore processing
    String uploadUrl = blobstoreService.createUploadUrl("/upload-utterance");
 
    response.setContentType("text/html");
    response.getWriter().println(uploadUrl);
  }

  /** 
  * Allow the servlet's Blobstore service to be set for mocking purposes
  */
  public void setBlobstoreService(BlobstoreService inputService) {
      blobstoreService = inputService; 
  }
}
