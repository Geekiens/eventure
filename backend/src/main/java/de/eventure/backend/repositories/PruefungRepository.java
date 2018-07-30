package de.eventure.backend.repositories;

import de.eventure.backend.model.Bewerber;
import de.eventure.backend.model.Pruefung;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PruefungRepository extends CrudRepository<Pruefung, Long> {

   // List<Pruefung> findAllByBewerberEqualsAndStatusEquals(Bewerber bewerber, String status);
}



