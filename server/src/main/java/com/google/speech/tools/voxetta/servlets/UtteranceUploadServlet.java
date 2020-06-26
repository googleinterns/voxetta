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
 
package com.google.speech.tools.voxetta;
 
import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/** Servlet that handles Utterance Entities. */
@WebServlet("/upload-utterance")
public class UtteranceUploadServlet extends HttpServlet {
 
  private DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
  private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
 
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
 
    // Get the URL of the audio file that has been uploaded to Blobstore
    String audioKey = getUploadedFileKey(request, "audio");
    
    Entity utteranceEntity = new Entity("Utterance");
    utteranceEntity.setProperty("audioKey", audioKey);
    utteranceEntity.setProperty("userId", "FILLER");
    utteranceEntity.setProperty("promptId", "FILLER");
    utteranceEntity.setProperty("device", "FILLER");
    utteranceEntity.setProperty("age", 100);
    utteranceEntity.setProperty("gender", "FILLER");
    
    // Store the Utterance Entity in Datastore 
    datastoreService.put(utteranceEntity);
 
    // Redirect back to the main recording page
    response.sendRedirect("/index.html");
  }
 
  // Returns the BlobKey of an uploaded file, or null if a file was not uploaded
  private String getUploadedFileKey(HttpServletRequest request, String formInputElementName) {
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get(formInputElementName);

    // Return null if an audio file was not uploaded
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null; 
    }
 
    // Return the BlobKey of the uploaded file
    return blobKeys.get(0).getKeyString();
  }

  /** 
  * Allow the servlet's Datastore service to be set for mocking purposes
  */
  public void setDatastoreService(DatastoreService inputService) {
      datastoreService = inputService; 
  }

  /** 
  * Allow the servlet's Blobstore service to be set for mocking purposes
  */
  public void setBlobstoreService(BlobstoreService inputService) {
      blobstoreService = inputService; 
  }
}
