package de.eventure.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.eventure.backend.model.Test;
import de.eventure.backend.repositories.TestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Controller
public class GetTestByIDApiController implements GetTestByIDApi {

    private static final Logger log = LoggerFactory.getLogger(GetTestByIDApiController.class);

    @Autowired
    private TestRepository testRepository;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Autowired
    public GetTestByIDApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Test> getTestByID(@PathParam("id") Long id) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, OPTIONS");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((Test) testRepository.findOne(id));
        }

        return new ResponseEntity<Test>(HttpStatus.BAD_REQUEST);
    }

}
