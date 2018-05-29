package de.adesso.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.adesso.backend.model.TerminTyp;
import de.adesso.backend.repositories.TerminTypRepository;
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
import java.text.SimpleDateFormat;
import java.util.Date;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class DeleteTerminTypApiController implements DeleteTerminTypApi {

    @Autowired
    private TerminTypRepository terminTypRepository;

    private static final Logger log = LoggerFactory.getLogger(DeleteTerminTypApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public DeleteTerminTypApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<String> deleteTerminTyp(@ApiParam(value = "ID des zu löschenden TerminTypS"  )  @Valid @RequestBody String id) {
        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if(accept != null && accept.contains("application/json") && content != null && content.contains("application/json")){
            if (!terminTypRepository.exists(Long.parseLong(id))) {
                return new ResponseEntity<String>(HttpStatus.CONFLICT);
            }
            TerminTyp tt = terminTypRepository.findOne(Long.parseLong(id));
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String dateString = dateFormat.format(new Date());
            tt.setAktivBis(dateString);
            terminTypRepository.save(tt);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(id);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

}
