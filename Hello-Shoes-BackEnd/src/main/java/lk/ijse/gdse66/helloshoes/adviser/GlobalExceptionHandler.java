package lk.ijse.gdse66.helloshoes.adviser;

import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.exception.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Map<String, Object>> handleServiceException(ServiceException exp) {
        HttpStatus status;
        if (exp instanceof NotFoundException) {
            status = HttpStatus.NOT_FOUND;
        } else if (exp instanceof DuplicateRecordException) {
            status = HttpStatus.CONFLICT;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return ResponseEntity.status(status).body(getErrorAttributes(status.value(), status, exp.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleDataValidationException(MethodArgumentNotValidException exp) {

        Map<String, Object> errorAttribute = getErrorAttributes(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, "Data Validation Failed...!");
        ArrayList<Map<String, Object>> errorList = new ArrayList<>();

        for (FieldError fieldError : exp.getFieldErrors()) {
            LinkedHashMap<String, Object> errorMap = new LinkedHashMap<>();
            errorMap.put("field", fieldError.getField());
            errorMap.put("message", fieldError.getDefaultMessage());
            errorMap.put("rejected", fieldError.getRejectedValue());
            errorList.add(errorMap);
        }
        errorAttribute.put("errors", errorList);
        return errorAttribute;
    }

    public Map<String, Object> getErrorAttributes(int code, HttpStatus status, String message) {
        LinkedHashMap<String, Object> errorAttributes = new LinkedHashMap<>();
        errorAttributes.put("code", code);
        errorAttributes.put("status", status);
        errorAttributes.put("message", message);
        return errorAttributes;
    }
}
