package de.adesso.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.repositories.NoteRepository;
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
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class DeleteNoteApiController implements DeleteNoteApi {

    @Autowired
    private NoteRepository noteRepository;

    private static final Logger log = LoggerFactory.getLogger(DeleteNoteApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public DeleteNoteApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<String> deleteNote(@ApiParam(value = "ID des zu löschende Notiz"  )  @Valid @RequestBody String id) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if(accept != null && accept.contains("application/json") && content != null && content.contains("application/json")){
            if (!noteRepository.exists(Long.parseLong(id))) {
                return new ResponseEntity<String>(HttpStatus.CONFLICT);
            }
            noteRepository.delete(Long.parseLong(id));
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(id);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

}
