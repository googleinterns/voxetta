package com.google.speech.tools.voxetta.testUtils;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.http.HttpServletResponse;

public class StringWriterStub {

    public static StringWriter stubStringWriter(HttpServletResponse response) throws IOException {

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(printWriter);

        return stringWriter;
    }
}
