package ecommerce.backend.security.services;

import ecommerce.backend.models.User;
import ecommerce.backend.playload.request.LoginRequest;
import ecommerce.backend.playload.request.UpdatedUser;
import ecommerce.backend.playload.response.MessageResponse;
import ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
    UserRepository userRepository;

	@Autowired
	AuthService authService;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Utilisateur " + username+" non trouvé !"));

		return UserDetailsImpl.build(user);
	}

	public ResponseEntity<?> updateUser(UpdatedUser updatedUser){
		Authentication authentication=authService.authenticateUser(updatedUser.getUsername(),updatedUser.getPassword());

		User user=userRepository.findById(updatedUser.getId())
				.orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé !"));
		if(userRepository.existsByEmail(updatedUser.getEmail()) && !userRepository.existsByIdAndEmail(updatedUser.getId(),updatedUser.getEmail())){
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Email existe déjà !"));
		}
		if(userRepository.existsByUsername(updatedUser.getNewUsername()) && !userRepository.existsByIdAndUsername(updatedUser.getId(),updatedUser.getNewUsername())){
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Identifiant existe déjà !"));
		}
		user.setUsername(updatedUser.getNewUsername());
		user.setEmail(updatedUser.getEmail());
		user.setFirstName(updatedUser.getFirstName());
		user.setLastName(updatedUser.getLastName());
		user.setAddress(updatedUser.getAddress());
		user.setCity(updatedUser.getCity());
		user.setCountry(updatedUser.getCountry());
		user.setPostalCode(updatedUser.getPostalCode());
		userRepository.save(user);
		LoginRequest loginRequest=new LoginRequest();
		loginRequest.setPassword(updatedUser.getPassword());
		loginRequest.setUsername(updatedUser.getNewUsername()
		);
		return authService.login(loginRequest);
	}


}
