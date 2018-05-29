package de.adesso.backend.repositories;
import org.springframework.data.repository.CrudRepository;
import de.adesso.backend.model.Note;

public interface NoteRepository extends CrudRepository<Note, Long> {
}
