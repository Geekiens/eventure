package de.eventure.backend.repositories;

import de.eventure.backend.model.Email;
import org.springframework.data.repository.CrudRepository;

public interface EmailRepository extends CrudRepository<Email, Long> {
}



