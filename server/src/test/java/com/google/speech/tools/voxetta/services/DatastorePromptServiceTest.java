package com.google.speech.tools.voxetta.services;

import com.google.appengine.api.datastore.DatastoreFailureException;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;
import com.google.speech.tools.voxetta.data.PromptBuilder;
import com.google.speech.tools.voxetta.data.StatusResponse;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class DatastorePromptServiceTest extends Mockito {

    private LocalServiceTestHelper serviceHelper =
        new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
    private DatastorePromptService service;
    private DatastoreService datastoreService;
    private HttpServletRequest request;
    private PreparedQuery preparedQuery;

    private Gson gson = new Gson();

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
        datastoreService = Mockito.mock(DatastoreService.class);
        service = new DatastorePromptService();
        service.setDatastoreService(datastoreService);

        request = Mockito.mock(HttpServletRequest.class);

        preparedQuery = Mockito.mock(PreparedQuery.class);
    }

    @Test
    public void getOnePrompt_DatastorePromptRetrieval_ReturnsPrompt() {

        // mock entity
        Entity mockEntity = new Entity(KeyFactory.createKey("Prompt", 7823648));
        mockEntity.setProperty("type", "text");
        mockEntity.setProperty("body", "dummy prompt");
        String mockEntityAsPromptJson = gson.toJson(new PromptBuilder().buildFromEntity(mockEntity));

        // mock entityList
        List<Entity> entityList = new LinkedList<Entity>();
        entityList.add(mockEntity);

        // prepare mocked responses
        when(datastoreService.prepare(any(Query.class))).thenReturn(preparedQuery);
        when(preparedQuery.asList(any(FetchOptions.class))).thenReturn(entityList);

        // assert equal
        String retrievedPrompt = service.getOnePrompt();
        Assert.assertEquals(mockEntityAsPromptJson, retrievedPrompt);
    }

    @Test
    public void getOnePrompt_DatastorePromptRetrieval_ReturnsEmptyPrompt() {

        // mock empty entityList
        List<Entity> entityList = new LinkedList<Entity>();

        // prepare mocked responses
        when(datastoreService.prepare(any(Query.class))).thenReturn(preparedQuery);
        when(preparedQuery.asList(any(FetchOptions.class))).thenReturn(entityList);

        // assert empty JSON is returned
        String retrievedPrompt = service.getOnePrompt();
        Assert.assertEquals(gson.toJson(new Object()), retrievedPrompt);
    }

    @Test
    public void savePrompt_PromptSavingSuccess_ReturnsTrue() {

        StatusResponse savePromptResponse = service.savePrompt("text", "mock prompt body");
        Assert.assertTrue(savePromptResponse.getSuccess());
    }

    @Test
    public void savePrompt_PromptSavingFailure_ReturnsFalse() {

        when(datastoreService.put(any(Entity.class))).thenThrow(new DatastoreFailureException("Failure"));

        StatusResponse savePromptResponse = service.savePrompt("text", "mock prompt body");
        Assert.assertFalse(savePromptResponse.getSuccess());
    }
}
