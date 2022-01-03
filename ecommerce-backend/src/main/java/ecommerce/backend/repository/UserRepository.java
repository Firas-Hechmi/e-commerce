package ecommerce.backend.repository;

import java.util.List;
import java.util.Optional;

import ecommerce.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Boolean existsByIdAndEmail(Long id,String email);

	Boolean existsByIdAndUsername(Long id,String username);


}
