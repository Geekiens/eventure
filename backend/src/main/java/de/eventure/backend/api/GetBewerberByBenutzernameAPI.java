
package de.eventure.backend.api;

        import de.eventure.backend.model.Bewerber;
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

@Api(value = "getBewerberByBenutzername", description = "the getBewerber API")
public interface GetBewerberByBenutzernameAPI {

    @ApiOperation(value = "Alle Bewerber", nickname = "getBewerberByBenutzername", notes = "", response = Bewerber.class, responseContainer = "List", tags={ "admin", })
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Alle angelegten Bewerber", response = Bewerber.class),
            @ApiResponse(code = 400, message = "bad input parameter") })
    @RequestMapping(value = "/getBewerberByBenutzername",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<Bewerber> getBewerberByBenutzername(String benutzername);

}
