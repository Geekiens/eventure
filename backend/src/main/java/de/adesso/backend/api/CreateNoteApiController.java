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
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class CreateNoteApiController implements CreateNoteApi {

    @Autowired
    private NoteRepository noteRepository;

    private static final Logger log = LoggerFactory.getLogger(CreateNoteApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public CreateNoteApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<Note> createNote(@ApiParam(value = "Notiz, der hinzugefügt wird"  )  @Valid @RequestBody Note note) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if (accept != null && accept.contains("application/json") && content != null && content.contains("application/json")) {
            noteRepository.findOne(note.getId());
            noteRepository.save(note);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(note);
        }
        return new ResponseEntity<Note>(HttpStatus.BAD_REQUEST);
    }

}
