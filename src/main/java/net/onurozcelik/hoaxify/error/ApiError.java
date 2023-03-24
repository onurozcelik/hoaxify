package net.onurozcelik.hoaxify.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;
import net.onurozcelik.hoaxify.shared.Views;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
	@JsonView(Views.Base.class)
    private int status;
	@JsonView(Views.Base.class)
    private String message;
	@JsonView(Views.Base.class)
    private String path;
	@JsonView(Views.Base.class)
    private long timestamp = new Date().getTime();
	@JsonView(Views.Base.class)
    private Map<String, String> validations;

    public ApiError(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;
    }
}
