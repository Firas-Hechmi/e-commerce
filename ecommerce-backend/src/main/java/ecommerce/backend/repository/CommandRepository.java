package ecommerce.backend.repository;

import ecommerce.backend.models.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandRepository extends JpaRepository<Command,Long>  {
    List<Command> findAllByUserId(Long id);
}
