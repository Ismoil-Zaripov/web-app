package com.web.server.exception;

import com.web.server.dto.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<Response<String>> notFound(NotFoundException ex) {
        return ResponseEntity.of(Optional.of(Response.notFound(ex.getMessage())));
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<Response<String>> badRequest(BadRequestException ex) {
        return ResponseEntity.of(Optional.of(Response.badRequest(ex.getMessage())));
    }

    @ExceptionHandler({ServerErrorException.class})
    public ResponseEntity<Response<String>> serverError(ServerErrorException ex) {
        return ResponseEntity.of(Optional.of(Response.serverError(ex.getMessage())));
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errors.put(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
            );
        });

        return new ResponseEntity<>(
                Response.fieldError(errors),
                HttpStatus.BAD_REQUEST
        );
    }

}
