package de.adesso.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.model.TerminTyp;
import de.adesso.backend.repositories.TerminTypRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class GetTerminTypenApiController implements GetTerminTypenApi {

    @Autowired
    private TerminTypRepository terminTypRepository;

    private static final Logger log = LoggerFactory.getLogger(GetTerminTypenApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetTerminTypenApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<TerminTyp>> getTypes() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<TerminTyp>) terminTypRepository.findAll());
        }

        return new ResponseEntity<List<TerminTyp>>(HttpStatus.BAD_REQUEST);
    }

}
