package de.adesso.backend.api;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ElementType.FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = RestrictedHTMLValidator.class)

public @interface RestrictedHTML {
    String message() default "{org.hibernate.validator.constraints.SafeHtml.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
