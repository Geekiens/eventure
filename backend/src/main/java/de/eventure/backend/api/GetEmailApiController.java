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
import java.util.ArrayList;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Controller
public class GetEmailApiController implements GetEmailApi {

    private static final Logger log = LoggerFactory.getLogger(GetEmailApiController.class);

    @Autowired
    private EmailRepository emailRepository;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetEmailApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Email>> getEmail() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, OPTIONS");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            List<Email> alleEmails = (List<Email>) emailRepository.findAll();

            List<Email> aktiveEmails = new ArrayList<Email>();
            for (Email email : alleEmails){
                if (email.getAktiv() && !email.getIstFolgemail()) {
                    aktiveEmails.add(email);

                }
            }

            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<Email>) aktiveEmails);
        }

        return new ResponseEntity<List<Email>>(HttpStatus.BAD_REQUEST);
    }

}
