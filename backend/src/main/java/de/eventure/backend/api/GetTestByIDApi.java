
package de.eventure.backend.api;

import de.eventure.backend.model.Test;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Api(value = "getTestByID", description = "the getTest API")
public interface GetTestByIDApi {

    @ApiOperation(value = "Alle Test", nickname = "getTestByID", notes = "", response = Test.class, responseContainer = "List", tags={ "admin", })
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Alle angelegten Test", response = Test.class),
            @ApiResponse(code = 400, message = "bad input parameter") })
    @RequestMapping(value = "/getTestByID",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<Test> getTestByID(Long id);

}
