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

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.common.annotations.VisibleForTesting; 
import com.google.speech.tools.voxetta.data.Utterance;
import javax.servlet.http.HttpServletRequest; 

/** 
 * Functionality necessary to successfully upload Utterances to an external database.   
 */
public interface UtteranceService {

  /** 
   * Saves an Utterance to an external database.  
   */
  public void saveUtterance(Utterance utterance);

  /** 
   * Returns a reference to the just-uploaded audio file. 
   */
  public String getAudioBlob(HttpServletRequest request);

  /** 
   * Return an upload URL that redirects to the Utterance Upload Servlet.
   */
  public String getAudioBlobUploadUrl(); 
}
