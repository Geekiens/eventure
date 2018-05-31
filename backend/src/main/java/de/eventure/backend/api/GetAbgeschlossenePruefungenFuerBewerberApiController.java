package de.eventure.backend.api;

import de.eventure.backend.model.Pruefung;
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
public class GetAbgeschlossenePruefungenFuerBewerberApiController implements GetAbgeschlossenePruefungenFuerBewerberApi {

    private static final Logger log = LoggerFactory.getLogger(GetAbgeschlossenePruefungenFuerBewerberApiController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public GetAbgeschlossenePruefungenFuerBewerberApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }

    public ResponseEntity<List<Pruefung>> getAbgeschlossenePruefungenFuerBewerber(@ApiParam(value = "Benutzername des Bewerbers") @Valid @RequestParam(value = "benutzername", required = false) String benutzername) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("application/json")) {
            try {
                return new ResponseEntity<List<Pruefung>>(objectMapper.readValue("[ {  \"bewerber\" : {    \"name\" : \"\",    \"mailAdresse\" : \"\",    \"benutzername\" : \"\",    \"passowrt\" : \"\",    \"beworbenFuer\" : \"\",    \"pruefungen\" : [ null, null ]  },  \"test\" : {    \"emails\" : [ {      \"titel\" : \"titel\",      \"absender\" : \"absender\",      \"erscheintDirekt\" : true,      \"erscheintNachMS\" : 6,      \"text\" : \"text\",      \"prioritaet\" : \"prioritaet\",      \"id\" : 5.962133916683182377482808078639209270477294921875,      \"absendeDatum\" : \"absendeDatum\",      \"antworten\" : [ {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      }, {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      } ],      \"aktiv\" : true    }, {      \"titel\" : \"titel\",      \"absender\" : \"absender\",      \"erscheintDirekt\" : true,      \"erscheintNachMS\" : 6,      \"text\" : \"text\",      \"prioritaet\" : \"prioritaet\",      \"id\" : 5.962133916683182377482808078639209270477294921875,      \"absendeDatum\" : \"absendeDatum\",      \"antworten\" : [ {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      }, {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      } ],      \"aktiv\" : true    } ],    \"testFuer\" : \"testFuer\",    \"titel\" : \"titel\",    \"id\" : 5.63737665663332876420099637471139430999755859375,    \"zeit\" : 0,    \"aktiv\" : true  },  \"Ergebnis\" : {    \"videoPfad\" : \"videoPfad\",    \"verbleibendeZeit\" : 2,    \"bewerberReaktionen\" : {      \"reaktionsArt\" : \"reaktionsArt\",      \"text\" : \"text\",      \"email\" : {        \"titel\" : \"titel\",        \"absender\" : \"absender\",        \"erscheintDirekt\" : true,        \"erscheintNachMS\" : 6,        \"text\" : \"text\",        \"prioritaet\" : \"prioritaet\",        \"id\" : 5.962133916683182377482808078639209270477294921875,        \"absendeDatum\" : \"absendeDatum\",        \"antworten\" : [ {          \"titel\" : \"titel\",          \"folgeMail\" : null,          \"text\" : \"text\",          \"id\" : 1.46581298050294517310021547018550336360931396484375        }, {          \"titel\" : \"titel\",          \"folgeMail\" : null,          \"text\" : \"text\",          \"id\" : 1.46581298050294517310021547018550336360931396484375        } ],        \"aktiv\" : true      }    }  },  \"id\" : 7.061401241503109105224211816675961017608642578125,  \"status\" : \"status\"}, {  \"bewerber\" : {    \"name\" : \"\",    \"mailAdresse\" : \"\",    \"benutzername\" : \"\",    \"passowrt\" : \"\",    \"beworbenFuer\" : \"\",    \"pruefungen\" : [ null, null ]  },  \"test\" : {    \"emails\" : [ {      \"titel\" : \"titel\",      \"absender\" : \"absender\",      \"erscheintDirekt\" : true,      \"erscheintNachMS\" : 6,      \"text\" : \"text\",      \"prioritaet\" : \"prioritaet\",      \"id\" : 5.962133916683182377482808078639209270477294921875,      \"absendeDatum\" : \"absendeDatum\",      \"antworten\" : [ {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      }, {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      } ],      \"aktiv\" : true    }, {      \"titel\" : \"titel\",      \"absender\" : \"absender\",      \"erscheintDirekt\" : true,      \"erscheintNachMS\" : 6,      \"text\" : \"text\",      \"prioritaet\" : \"prioritaet\",      \"id\" : 5.962133916683182377482808078639209270477294921875,      \"absendeDatum\" : \"absendeDatum\",      \"antworten\" : [ {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      }, {        \"titel\" : \"titel\",        \"folgeMail\" : null,        \"text\" : \"text\",        \"id\" : 1.46581298050294517310021547018550336360931396484375      } ],      \"aktiv\" : true    } ],    \"testFuer\" : \"testFuer\",    \"titel\" : \"titel\",    \"id\" : 5.63737665663332876420099637471139430999755859375,    \"zeit\" : 0,    \"aktiv\" : true  },  \"Ergebnis\" : {    \"videoPfad\" : \"videoPfad\",    \"verbleibendeZeit\" : 2,    \"bewerberReaktionen\" : {      \"reaktionsArt\" : \"reaktionsArt\",      \"text\" : \"text\",      \"email\" : {        \"titel\" : \"titel\",        \"absender\" : \"absender\",        \"erscheintDirekt\" : true,        \"erscheintNachMS\" : 6,        \"text\" : \"text\",        \"prioritaet\" : \"prioritaet\",        \"id\" : 5.962133916683182377482808078639209270477294921875,        \"absendeDatum\" : \"absendeDatum\",        \"antworten\" : [ {          \"titel\" : \"titel\",          \"folgeMail\" : null,          \"text\" : \"text\",          \"id\" : 1.46581298050294517310021547018550336360931396484375        }, {          \"titel\" : \"titel\",          \"folgeMail\" : null,          \"text\" : \"text\",          \"id\" : 1.46581298050294517310021547018550336360931396484375        } ],        \"aktiv\" : true      }    }  },  \"id\" : 7.061401241503109105224211816675961017608642578125,  \"status\" : \"status\"} ]", List.class), HttpStatus.NOT_IMPLEMENTED);
            } catch (IOException e) {
                log.error("Couldn't serialize response for content type application/json", e);
                return new ResponseEntity<List<Pruefung>>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<List<Pruefung>>(HttpStatus.NOT_IMPLEMENTED);
    }

}
