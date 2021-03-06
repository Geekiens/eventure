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

@Api(value = "getOffenePruefungenFuerBewerber", description = "the getOffenePruefungenFuerBewerber API")
public interface GetOffenePruefungenFuerBewerberApi {

    @ApiOperation(value = "Sucht alle offene Prüfungen des Bewerbers", nickname = "getOffenePruefungenFuerBewerber", notes = "", response = Pruefung.class, responseContainer = "List", tags={ "alle", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Alle offene Prüfungen des Bewerbers", response = Pruefung.class, responseContainer = "List"),
        @ApiResponse(code = 400, message = "bad input parameter") })
    @RequestMapping(value = "/getOffenePruefungenFuerBewerber",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<List<Pruefung>> getOffenePruefungenFuerBewerber(@ApiParam(value = "ID des Bewerbers") @Valid @RequestParam(value = "id", required = false) Long id);

}
