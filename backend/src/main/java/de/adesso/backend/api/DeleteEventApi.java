/**
 * NOTE: This class is auto generated by the swagger code generator program (1.0.12-1).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package de.adesso.backend.api;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Api(value = "deleteEvent", description = "the deleteEvent API")
public interface DeleteEventApi {

    @ApiOperation(value = "Termin löschen", nickname = "deleteEvent", notes = "Löscht existierenden Termin. Falls dieser nicht existiert wird ein Fehler geworfen (HTTP 409)", tags={ "developers", })
    @ApiResponses(value = { 
        @ApiResponse(code = 201, message = "Termin geloescht"),
        @ApiResponse(code = 400, message = "invalid input, object invalid"),
        @ApiResponse(code = 409, message = "Termin existiert nicht") })
    @RequestMapping(value = "/deleteEvent",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.POST)
    ResponseEntity<String> deleteEvent(@ApiParam(value = "ID des zu löschenden Termins"  )  @Valid @RequestBody String id);

}
