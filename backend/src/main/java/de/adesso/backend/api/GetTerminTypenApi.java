/**
 * NOTE: This class is auto generated by the swagger code generator program (1.0.12-1).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package de.adesso.backend.api;

import de.adesso.backend.model.TerminTyp;
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


@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Api(value = "getTerminTypen", description = "the getTerminTypen API")
public interface GetTerminTypenApi {

    @ApiOperation(value = "Termintypen zurückgeben", nickname = "getTypes", notes = "keine", response = TerminTyp.class, responseContainer = "List", tags={ "developers", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Alle Termintypen", response = TerminTyp.class, responseContainer = "List"),
        @ApiResponse(code = 400, message = "no Events found") })
    @RequestMapping(value = "/getTerminTypen",
        produces = { "application/json" }, 
        //consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<List<TerminTyp>> getTypes();

}
