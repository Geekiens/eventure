package de.adesso.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.model.Event;
import de.adesso.backend.repositories.EventRepository;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class GetEventsApiController implements GetEventsApi {

    @Autowired
    private EventRepository eventRepository;

    private static final Logger log = LoggerFactory.getLogger(GetEventsApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetEventsApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Event>> getEvents(@ApiParam(value = "Name des Sachbearbeiters") @Valid @RequestParam(value = "name", required = false) String name,@ApiParam(value = "Vertragsnummer nach der gesucht werden soll") @Valid @RequestParam(value = "contractNumber", required = false) String contractNumber) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<Event>)eventRepository.findAllByKalenderVon(name));
        }

        return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Event>> getDueEvents(@ApiParam(value = "Name des Sachbearbeiters") @Valid @RequestParam(value = "name", required = false) String name,@ApiParam(value = "Vertragsnummer nach der gesucht werden soll") @Valid @RequestParam(value = "contractNumber", required = false) String contractNumber) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type");
            headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, OPTIONS");
            headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            Date date = new Date();

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String dateString = dateFormat.format(new Date());
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<Event>)eventRepository.findAllByKalenderVonAndFaelligkeitIsBeforeAndTerminStatusEquals(name, dateString,"offen"));
        }

        return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
    }
}
