package com.google.speech.tools.voxetta.servlets;

import com.google.gson.Gson;
import com.google.speech.tools.voxetta.data.Prompt;
import com.google.speech.tools.voxetta.data.Prompt.Type;
import com.google.speech.tools.voxetta.data.StatusResponse;
import com.google.speech.tools.voxetta.services.DatastorePromptService;
import com.google.speech.tools.voxetta.services.PromptService;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jdk.net.SocketFlow.Status;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import static com.google.speech.tools.voxetta.testUtils.StringWriterStub.stubStringWriter;

public class PromptServletTest extends Mockito {


    private HttpServletRequest request;
    private HttpServletResponse response;
    private PromptService promptService;
    private PromptServlet servlet;

    private final Gson gson = new Gson();

    @Before
    public void setUpMocks() {
        request = Mockito.mock(HttpServletRequest.class);
        response = Mockito.mock(HttpServletResponse.class);
        promptService = Mockito.mock(DatastorePromptService.class);

        servlet = new PromptServlet();
        servlet.setService(promptService);
    }

    @Test
    public void doGet_GetOnePrompt_ReturnsPrompt() throws IOException {

        // mock prompt response
        String mockedPrompt = gson.toJson(new Prompt(42312, Type.TEXT, "mocked body"));
        when(promptService.getOnePrompt()).thenReturn(mockedPrompt);

        // mock writer
        StringWriter stringWriter = stubStringWriter(response);

        // call doGet
        servlet.doGet(request, response);

        // verify response was called at least once
        verify(response, atLeast(1)).setContentType("application/json");

        // assert that prompt JSON is included in response
        Assert.assertTrue(stringWriter.toString().contains(mockedPrompt));
    }

    @Test
    public void doGet_GetOneEmptyPrompt_ReturnsEmptyPrompt() throws IOException {

        // mock prompt response
        String mockedPrompt = gson.toJson(new Object());
        when(promptService.getOnePrompt()).thenReturn(mockedPrompt);

        // mock writer
        StringWriter stringWriter = stubStringWriter(response);

        // call doGet
        servlet.doGet(request, response);

        // verify response was called at least once
        verify(response, atLeast(1)).setContentType("application/json");

        // assert that empty prompt JSON is included in response
        Assert.assertTrue(stringWriter.toString().contains(mockedPrompt));
    }

    @Test
    public void doPost_SubmitOnePrompt_ReturnsTrue() throws IOException {
        // mock prompt service
        when(promptService.savePrompt(any(String.class), any(String.class))).thenReturn(new StatusResponse(true));

        // mock writer
        StringWriter stringWriter = stubStringWriter(response);

        servlet.doPost(request, response);

        // verify response was called at least once
        verify(response, atLeast(1)).setContentType("application/json");

        // assert that status response JSON is included in response
        Assert.assertTrue(stringWriter.toString().contains(new StatusResponse(true).toJson()));
    }

    @Test
    public void doPost_SubmitOnePrompt_ReturnsFalse() throws IOException {
        // mock prompt service
        when(promptService.savePrompt(any(String.class), any(String.class))).thenReturn(new StatusResponse(false));

        // mock writer
        StringWriter stringWriter = stubStringWriter(response);

        servlet.doPost(request, response);

        // verify response was called at least once
        verify(response, atLeast(1)).setContentType("application/json");

        // assert that status response JSON is included in response
        Assert.assertTrue(stringWriter.toString().contains(new StatusResponse(false).toJson()));
    }

}
