package de.eventure.backend.api;

import de.eventure.backend.model.Bewerber;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class GetBewerberApiController implements GetBewerberApi {

    private static final Logger log = LoggerFactory.getLogger(GetBewerberApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetBewerberApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Bewerber>> getBewerber() {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<Bewerber>>(objectMapper.readValue("[ {  \"name\" : \"\",  \"mailAdresse\" : \"\",  \"benutzername\" : \"\",  \"passowrt\" : \"\",  \"beworbenFuer\" : \"\",  \"pruefungen\" : [ null, null ]}, {  \"name\" : \"\",  \"mailAdresse\" : \"\",  \"benutzername\" : \"\",  \"passowrt\" : \"\",  \"beworbenFuer\" : \"\",  \"pruefungen\" : [ null, null ]} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<Bewerber>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<Bewerber>>(HttpStatus.NOT_IMPLEMENTED);
    }

}