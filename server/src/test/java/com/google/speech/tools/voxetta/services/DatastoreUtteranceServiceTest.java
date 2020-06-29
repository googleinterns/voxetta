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

package com.google.speech.tools.voxetta.services;

import com.google.appengine.api.blobstore.BlobstoreFailureException;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.datastore.DatastoreFailureException;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.speech.tools.voxetta.data.Utterance; 
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList; 
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mockito;

/** 
* Verifies the intended behavior of DatastoreUtteranceService.java. 
*/
@RunWith(JUnit4.class)
public final class DatastoreUtteranceServiceTest extends Mockito {

  private LocalServiceTestHelper serviceHelper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private BlobstoreService blobstoreService;
  private DatastoreService datastoreService; 
  private DatastoreUtteranceService service; 
  private HttpServletRequest request; 

  @Before
  public void setUpServiceHelper() {
    serviceHelper.setUp();
  }

  @After
  public void tearDownServiceHelper() {
    serviceHelper.tearDown();
  }

  @Before 
  public void setUpMocksAndServletInstance() {
    // Mock the Blobstore & Datastore API services
    blobstoreService = Mockito.mock(BlobstoreService.class);
    datastoreService = Mockito.mock(DatastoreService.class);

    // Create a new Datastore Utterance Service & 
    // set its Blobstore & Datastore services to be the mocked services
    service = new DatastoreUtteranceService();
    service.setBlobstoreService(blobstoreService);
    service.setDatastoreService(datastoreService);

    // Mock a HTTP request
    request = Mockito.mock(HttpServletRequest.class);
  }

  @Test (expected = DatastoreFailureException.class)
  public void saveUtterance_DatastoreConnectionFailure_ThrowsDatastoreFailureException() throws Exception {
    when(datastoreService.put(any(Entity.class))).thenThrow(DatastoreFailureException.class);
    Utterance utterance = new Utterance("audio", "userId", "promptId", "device", 100, "gender");
    service.saveUtterance(utterance);
  }

  @Test 
  public void getAudio_BlobUploadCallbackRequestValidUpload_ReturnsKey() throws Exception {
    // Create a list of BlobKeys 
    BlobKey blobKey = new BlobKey("BlobKey"); 
    List<BlobKey> blobKeys = new ArrayList<>();  
    blobKeys.add(blobKey); 

    // Create a map of blobs
    Map<String, List<BlobKey>> blobs = new HashMap<>(); 
    blobs.put("audio", blobKeys);

    // Ensure the correct key was returned
    when(blobstoreService.getUploads(any(HttpServletRequest.class))).thenReturn(blobs);
    String key = service.getAudio(request);
    Assert.assertEquals(key, "BlobKey");
  }

  @Test 
  public void getAudio_BlobUploadCallbackRequestInvalidUpload_ReturnsNull() throws Exception {
     // Create an empty map of blobs (no audio file was uploaded)
    Map<String, List<BlobKey>> blobs = new HashMap<>(); 

    // Ensure no key was returned
    when(blobstoreService.getUploads(any(HttpServletRequest.class))).thenReturn(blobs);
    Assert.assertNull(service.getAudio(request));
  }

  @Test (expected = IllegalStateException.class)
  public void getAudio_NotBlobUploadCallbackRequest_ThrowsIllegalStateException() throws Exception {
    when(blobstoreService.getUploads(any(HttpServletRequest.class))).thenThrow(IllegalStateException.class);
    String audio = service.getAudio(request);
  }

  @Test 
  public void getFormUrl_BlobstoreConnectionSuccess_ReturnsUrl() throws Exception {
    when(blobstoreService.createUploadUrl("/upload-utterance")).thenReturn("url");
    String url = service.getFormUrl();
    Assert.assertEquals("url", url);
  }

  @Test (expected = BlobstoreFailureException.class)
  public void getFormUrl_BlobstoreConnectionFailure_ThrowsBlobstoreFailureException() throws Exception {
    when(blobstoreService.createUploadUrl("/upload-utterance")).thenThrow(BlobstoreFailureException.class);
    String url = service.getFormUrl();
  }
}
