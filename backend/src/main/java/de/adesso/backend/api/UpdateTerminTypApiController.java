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
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Controller
public class UpdateTerminTypApiController implements UpdateTerminTypApi {

    @Autowired
    private TerminTypRepository terminTypRepository;

    private static final Logger log = LoggerFactory.getLogger(UpdateTerminTypApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public UpdateTerminTypApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }


    public ResponseEntity<TerminTyp[]> updateTerminTyp(@ApiParam(value = "Bearbeiteter TerminTyp"  )  @Valid @RequestBody TerminTyp[] terminTyp) {

        String accept = request.getHeader("Accept");
        String content = request.getHeader("Content-Type");
        if (accept != null && accept.contains("application/json") && content != null && content.contains("application/json")) {
            int pos = 0;
            for (TerminTyp tt : terminTyp){
                tt.setPosition(pos++);
                if (!terminTypRepository.exists(tt.getId())) {
                    terminTypRepository.save(tt);
                }
                else{
                    terminTypRepository.findOne(tt.getId());
                    terminTypRepository.save(tt);
                     }
                }
			HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(terminTyp);

        }
        return new ResponseEntity<TerminTyp[]>(HttpStatus.BAD_REQUEST);
    }
}
