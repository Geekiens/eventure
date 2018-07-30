package de.eventure.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.eventure.backend.model.Ergebnis;
import de.eventure.backend.repositories.ErgebnisRepository;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Controller
public class UpdateErgebnisApiController implements UpdateErgebnisApi {

    private static final Logger log = LoggerFactory.getLogger(UpdateErgebnisApiController.class);

    @Autowired
    private ErgebnisRepository ergebnisRepository;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Autowired
    public UpdateErgebnisApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Ergebnis> updateErgebnis(@ApiParam(value = "Ergebnis, bearbeitet wurde") @Valid @RequestBody Ergebnis ergebnis) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if (accept != null && accept.contains("application/json") && content != null && content.contains("application/json")) {
            if (!ergebnisRepository.exists(ergebnis.getId())) {
                return new ResponseEntity<Ergebnis>(HttpStatus.CONFLICT);
            }
            ergebnis = ergebnisRepository.save(ergebnis);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(ergebnis);
        }
        return new ResponseEntity<Ergebnis>(HttpStatus.BAD_REQUEST);

    }
}
