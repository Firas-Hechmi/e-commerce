package ecommerce.backend.controllers;

import java.util.HashSet;

import java.util.Set;


import javax.validation.Valid;

import ecommerce.backend.models.ERole;
import ecommerce.backend.models.Role;
import ecommerce.backend.models.User;
import ecommerce.backend.playload.request.LoginRequest;
import ecommerce.backend.playload.request.SignupRequest;
import ecommerce.backend.security.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		return authService.login(loginRequest);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

		return authService.registerUser(signUpRequest);
	}
}
