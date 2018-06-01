package de.eventure.backend.api;

import de.eventure.backend.model.Email;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.eventure.backend.repositories.EmailRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Controller
public class UpdateEmailApiController implements UpdateEmailApi {

    private static final Logger log = LoggerFactory.getLogger(UpdateEmailApiController.class);

    @Autowired
    private EmailRepository emailRepository;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public UpdateEmailApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Email> updateEmail(@ApiParam(value = "Email, bearbeitet wurde") @Valid @RequestBody Email email) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if (accept != null && accept.contains("application/json") && content != null && content.contains("application/json")) {
            if (!emailRepository.exists(email.getId())) {
                return new ResponseEntity<Email>(HttpStatus.CONFLICT);
            }
            email = emailRepository.save(email);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(email);
        }
        return new ResponseEntity<Email>(HttpStatus.BAD_REQUEST);

    }
}
