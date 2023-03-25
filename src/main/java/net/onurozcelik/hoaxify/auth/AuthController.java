package net.onurozcelik.hoaxify.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import net.onurozcelik.hoaxify.shared.CurrentUser;
import net.onurozcelik.hoaxify.shared.Views;
import net.onurozcelik.hoaxify.user.User;

@RestController
public class AuthController {

	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	public ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		return ResponseEntity.ok(user);
	}
}
