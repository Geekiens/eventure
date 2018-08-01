package de.eventure.backend.api;

import de.eventure.backend.model.Bewerber;
import de.eventure.backend.model.Pruefung;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.eventure.backend.repositories.BewerberRepository;
import de.eventure.backend.repositories.PruefungRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Controller
public class GetPruefungByIDController implements GetPruefungByID {

    private static final Logger log = LoggerFactory.getLogger(GetPruefungByIDController.class);

    @Autowired
    private PruefungRepository pruefungRepository;


    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetPruefungByIDController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Pruefung> getAbgeschlossenePruefungenFuerBewerber(@PathParam("id") Long id) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, OPTIONS");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((Pruefung) pruefungRepository.findOne(id));


        }

        return new ResponseEntity<Pruefung>(HttpStatus.BAD_REQUEST);
    }
}