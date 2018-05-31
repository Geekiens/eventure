/**
 * NOTE: This class is auto generated by the swagger code generator program (1.0.12-1).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package de.eventure.backend.api;

import de.eventure.backend.model.Pruefung;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Api(value = "createPruefung", description = "the createPruefung API")
public interface CreatePruefungApi {

    @ApiOperation(value = "Fügt eine neue Pruefung hinzu", nickname = "createPruefung", notes = "", tags={ "admin", })
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Pruefung erstellt"),
        @ApiResponse(code = 400, message = "invalid input, object invalid"),
        @ApiResponse(code = 409, message = "an existing item already exists") })
    @RequestMapping(value = "/createPruefung",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    ResponseEntity<Void> createPruefung(@ApiParam(value = "Pruefung, die hinzugefügt wird"  )  @Valid @RequestBody Pruefung test);

}