package net.onurozcelik.hoaxify.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import net.onurozcelik.hoaxify.error.ApiError;
import net.onurozcelik.hoaxify.shared.Views;
import net.onurozcelik.hoaxify.user.User;
import net.onurozcelik.hoaxify.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();;

	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	public ResponseEntity<?> handleAuthentication(
			@RequestHeader(name = "Authorization") String authorization) {
		String base64Encoded = authorization.split("Basic ")[1];
		String decoded = new String(Base64.getDecoder().decode(base64Encoded));
		String[] parts = decoded.split(":");
		String username = parts[0];
		User inDB = userRepository.findByUsername(username);
		return ResponseEntity.ok(inDB);
	}
}
