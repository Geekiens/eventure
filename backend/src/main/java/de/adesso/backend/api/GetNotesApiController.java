package de.adesso.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.model.Note;
import de.adesso.backend.repositories.NoteRepository;
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
import java.util.List;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class GetNotesApiController implements GetNotesApi {

    @Autowired
    private NoteRepository noteRepository;

    private static final Logger log = LoggerFactory.getLogger(GetNotesApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetNotesApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Note>> getNotes(@ApiParam(value = "Name des Sachbearbeiters") @Valid @RequestParam(value = "name", required = false) String name,@ApiParam(value = "Vertragsnummer nach der gesucht werden soll") @Valid @RequestParam(value = "contractNumber", required = false) String contractNumber) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body((List<Note>)noteRepository.findAll());
        }

        return new ResponseEntity<List<Note>>(HttpStatus.BAD_REQUEST);
    }

}
