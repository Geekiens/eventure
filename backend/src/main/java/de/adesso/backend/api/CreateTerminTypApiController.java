package de.adesso.backend.api;

import de.adesso.backend.model.TerminTyp;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.repositories.TerminTypRepository;
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
public class CreateTerminTypApiController implements CreateTerminTypApi {

    @Autowired
    private TerminTypRepository terminTypRepository;

    private static final Logger log = LoggerFactory.getLogger(CreateTerminTypApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public CreateTerminTypApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<TerminTyp> createTerminTyp(@ApiParam(value = "TerminTyp, der hinzugefügt wird"  )  @Valid @RequestBody TerminTyp termintyp) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if(accept != null && accept.contains("application/json") && content != null && content.contains("application/json")){
            terminTypRepository.save(termintyp);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(termintyp);
        }
        return new ResponseEntity<TerminTyp>(HttpStatus.BAD_REQUEST);
    }

}
