package de.adesso.backend.api;

import org.owasp.html.Sanitizers;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RestrictedHTMLValidator implements ConstraintValidator<RestrictedHTML, String> {

    @Override
    public void initialize(RestrictedHTML restrictedHTML) {

    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        String sanitized = Sanitizers.FORMATTING.sanitize(s);
        return sanitized.equals(s);
    }
}
