package net.onurozcelik.hoaxify.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

import java.util.HashMap;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
    private int status;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validations;

    public ApiError(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;
    }
}
