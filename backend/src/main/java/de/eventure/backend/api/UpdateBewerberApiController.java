package de.eventure.backend.api;

import de.eventure.backend.model.Bewerber;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.eventure.backend.repositories.BewerberRepository;
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
public class UpdateBewerberApiController implements UpdateBewerberApi {

    private static final Logger log = LoggerFactory.getLogger(UpdateBewerberApiController.class);

    private final ObjectMapper objectMapper;

    @Autowired
    private BewerberRepository bewerberRepository;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public UpdateBewerberApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Bewerber> updateBewerber(@ApiParam(value = "Bewerber, der bearbeitet wird"  )  @Valid @RequestBody Bewerber bewerber) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if (accept != null && accept.contains("application/json") && content != null && content.contains("application/json")) {
            if (!bewerberRepository.exists(bewerber.getId())) {
                return new ResponseEntity<Bewerber>(HttpStatus.CONFLICT);
            }
            bewerber = bewerberRepository.save(bewerber);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(bewerber);
        }
        return new ResponseEntity<Bewerber>(HttpStatus.BAD_REQUEST);
    }

}
