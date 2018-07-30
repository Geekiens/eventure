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
public class GetOffenePruefungenFuerBewerberApiController implements GetOffenePruefungenFuerBewerberApi {

    private static final Logger log = LoggerFactory.getLogger(GetOffenePruefungenFuerBewerberApiController.class);

    @Autowired
    private PruefungRepository pruefungRepository;

    @Autowired
    private BewerberRepository bewerberRepository;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetOffenePruefungenFuerBewerberApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Pruefung>> getOffenePruefungenFuerBewerber(@ApiParam(value = "ID des Bewerbers") @Valid @RequestParam(value = "id", required = false) Long id) {
        String accept = request.getHeader("Accept");
        Bewerber bewerber = bewerberRepository.findOne(id);
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, OPTIONS");
            //headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<Pruefung>) pruefungRepository.findAll());
                //    .body((List<Pruefung>) pruefungRepository.findAllByBewerberEqualsAndStatusEquals(bewerber, "offen"));
        }

        return new ResponseEntity<List<Pruefung>>(HttpStatus.BAD_REQUEST);
    }
}
