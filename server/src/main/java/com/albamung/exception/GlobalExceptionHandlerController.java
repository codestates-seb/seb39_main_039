package com.albamung.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandlerController {

//  @Bean
//  public ErrorAttributes errorAttributes() {
//    // Hide exception field in the return object
//    return new DefaultErrorAttributes() {
//      @Override
//      public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
//        return super.getErrorAttributes(webRequest, ErrorAttributeOptions.defaults().excluding(ErrorAttributeOptions.Include.EXCEPTION));
//      }
//    };
//  }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity handleCustomException(CustomException e) throws IOException {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }


//  @ExceptionHandler(AccessDeniedException.class)
//  public void handleAccessDeniedException(HttpServletResponse res) throws IOException {
//    res.sendError(HttpStatus.FORBIDDEN.value(), "Access denied");
//  }

//  @ExceptionHandler(Exception.class)
//  public void handleException(HttpServletResponse res) throws IOException {
//    res.sendError(HttpStatus.BAD_REQUEST.value(), "Something went wrong");
//  }

}
