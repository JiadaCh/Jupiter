package org.jiada.jupiter.exception;

import org.jiada.jupiter.exception.dto.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashSet;
import java.util.Set;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex) {
        Set<ErrorMessage> errorMessage = new HashSet<>();
        if (ex.getMessage().equals("usuario.correo_unique")) {
            errorMessage.add(new ErrorMessage("El correo ya existe"));
        }
        if (ex.getMessage().equals("usuario.nombre_unique")) {
            errorMessage.add(new ErrorMessage("El nombre del usuario ya existe"));
        }
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Set<ErrorMessage> errors = new HashSet<>();
        ex.getBindingResult().getFieldErrors().forEach((error) -> errors.add(new ErrorMessage(error.getDefaultMessage())));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

}
