package ecommerce.backend.controllers;

import ecommerce.backend.playload.request.UpdatedUser;
import ecommerce.backend.repository.UserRepository;
import ecommerce.backend.models.User;
import ecommerce.backend.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    private UserDetailsServiceImpl userDetailsService;
    private UserRepository userRepository;

    @Autowired
    public  UserController(UserDetailsServiceImpl userDetailsService,UserRepository userRepository){
        this.userDetailsService=userDetailsService;
        this.userRepository=userRepository;
    }

    @GetMapping("/api/user")
    @ResponseBody
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public UserDetails getUser(@RequestParam(name="username") String username) {

        return userDetailsService.loadUserByUsername(username);
    }

    @PostMapping("/api/user/update")
    @ResponseBody
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> update(@RequestBody UpdatedUser updatedUser){
            return userDetailsService.updateUser((updatedUser));
    }

}
