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

package com.google.speech.tools.voxetta.services;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.speech.tools.voxetta.data.Utterance; 
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

/** 
 * Functionality for uploading audio files to Blobstore & uploading the related Utterance
 * object to Datastore.  
 */
public class DatastoreUtteranceService implements UtteranceService {
  
  private DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();
  private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

  public void saveUtterance(Utterance utterance) {
    // Create and initialize a new Utterance Entity
    Entity utteranceEntity = new Entity("Utterance");
    utteranceEntity.setProperty("audioKey", utterance.getAudio());
    utteranceEntity.setProperty("userId", utterance.getUserId());
    utteranceEntity.setProperty("promptId", utterance.getPromptId());
    utteranceEntity.setProperty("device", utterance.getDevice());
    utteranceEntity.setProperty("age", utterance.getAge());
    utteranceEntity.setProperty("gender", utterance.getGender());
    
    // Store the Utterance Entity in Datastore 
    datastoreService.put(utteranceEntity); 
  }

  /** 
   * Returns the BlobKey of the just-uploaded audio file. 
   */
  public String getAudio(HttpServletRequest request) {
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("audio");

    // Return null if an audio file was not uploaded
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null; 
    }
 
    // Return the BlobKey of the uploaded file
    return blobKeys.get(0).getKeyString();
  }

  /** 
   * Return a Blobstore Upload URL that redirects to the Utterance Upload Servlet.
   */
  public String getFormUrl() {
    return blobstoreService.createUploadUrl("/upload-utterance"); 
  }

  /** 
   * Allow the servlet's Datastore service to be set for mocking purposes.
   */
  public void setDatastoreService(DatastoreService inputService) {
    datastoreService = inputService; 
  }

  /** 
   * Allow the servlet's Blobstore service to be set for mocking purposes.
   */
  public void setBlobstoreService(BlobstoreService inputService) {
    blobstoreService = inputService; 
  }
}
