package net.onurozcelik.hoaxify.error;

import java.util.Date;
import java.util.Map;

import lombok.Data;

import java.util.HashMap;

@Data
public class ApiError {
    private int status;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validations = new HashMap<>();

    public ApiError(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;
    }
}
