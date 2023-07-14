package com.shellwe.server.utils;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EachSizeValidator.class)
public @interface EachSize {
    String message() default "each tag under 10 length";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    int max() default Integer.MAX_VALUE;
}
