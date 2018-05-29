package de.adesso.backend.repositories;
import org.springframework.data.repository.CrudRepository;
import de.adesso.backend.model.Benutzer;

public interface BenutzerRepository extends CrudRepository<Benutzer, Long>{

}
