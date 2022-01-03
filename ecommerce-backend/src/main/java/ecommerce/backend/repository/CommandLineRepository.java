package ecommerce.backend.repository;

import ecommerce.backend.models.CommandLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandLineRepository extends JpaRepository<CommandLine,Long> {
    List<CommandLine> findAllByCommandId(Long command_id);
}
