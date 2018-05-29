package de.adesso.backend.repositories;
import org.springframework.data.repository.CrudRepository;
import de.adesso.backend.model.Event;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findAllByKalenderVon(String kalenderVon);
    List<Event> findAllByKalenderVonAndFaelligkeitIsBeforeAndTerminStatusEquals(String kalenderVon, String faelligkeit, String terminStatus);
}
