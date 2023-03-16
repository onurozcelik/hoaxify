package net.onurozcelik.hoaxify.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import net.onurozcelik.hoaxify.shared.*;
import net.onurozcelik.hoaxify.error.ApiError;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        String username = user.getUsername();
        String displayName = user.getDisplayName();
        ApiError error = new ApiError(400, "Validation error", "api/1.0/users");
        Map<String, String> validationErrors = new HashMap<>();
        if (username == null || username.isEmpty()) {
            validationErrors.put("username", "Username cannot be null or empty");
        }
        if (displayName == null || displayName.isEmpty()) {
            validationErrors.put("displayName", "Display name cannot be null or empty");
        }
        error.setValidations(validationErrors);
        if (!validationErrors.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("User created"));
    }
}