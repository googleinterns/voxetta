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

package com.google.speech.tools.voxetta.data;

/** 
 * An Utterance is the container for a speaker's verbal response to a given prompt.  
 */
public final class Utterance {

  private String audio;
  private String userId;
  private String promptId;
  private String device; 
  private int age;
  private String gender; 

  /**
   * Creates a new Utterance.
   *
   * @param audio The reference to the audio file. Must be non-null.
   * @param userId The id of the speaker. Must be non-null.
   * @param promptId The id of the prompt the audio file is responding to. Must be non-null.
   * @param device The name of the device the speaker is using to record audio files. Must be non-null.
   * @param age The age of the speaker. Must be a positive integer between 1 and 120, inclusive. 
   * @param gender The gender of the speaker. Must be non-null.
   */
  public Utterance(String audio, String userId, String promptId, String device, int age, String gender) {
    verifyConstructorLegality(audio, userId, promptId, device, age, gender);

    this.audio = audio; 
    this.userId = userId; 
    this.promptId = promptId;
    this.device = device; 
    this.age = age; 
    this.gender = gender; 
  }

  // Ensure the legality of the Utterance constructor's arguments
  private void verifyConstructorLegality(String audio, String userId, String promptId, String device, int age, String gender) {
    // Ensure no applicable argument is null
    if (audio == null) { throw new IllegalArgumentException("audio cannot be null"); }
    if (userId == null) { throw new IllegalArgumentException("userId cannot be null"); }
    if (promptId == null) { throw new IllegalArgumentException("promptId cannot be null"); }
    if (device == null) { throw new IllegalArgumentException("device cannot be null"); }
    if (gender == null) { throw new IllegalArgumentException("gender cannot be null"); }

    // Ensure age is between 1 and 120, inclusive
    if (!(1 <= age && age <= 120)) { throw new IllegalArgumentException("age must be between 1 and 120, inclusive"); }
  }

  /**
   * Return the reference to the audio file.
   */
  public String getAudio() {
    return audio;
  }

  /**
   * Return the id of the speaker.
   */
  public String getUserId() {
    return userId;
  }

  /**
   * Return the id of the prompt the audio file is responding to.
   */
  public String getPromptId() {
    return promptId;
  }

  /**
   * Return the name of the device the speaker is using to record audio files.
   */
  public String getDevice() {
    return device;
  }

  /**
   * Return the age of the speaker.
   */
  public int getAge() {
    return age;
  }

  /**
   * Return gender of the speaker.
   */
  public String getGender() {
    return gender;
  }
}
