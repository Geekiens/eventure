package de.adesso.backend;

import de.adesso.backend.model.*;
import de.adesso.backend.repositories.EventRepository;
import de.adesso.backend.repositories.NoteRepository;
import de.adesso.backend.repositories.NotizTypRepository;
import de.adesso.backend.repositories.TerminTypRepository;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;

@PropertySource(ignoreResourceNotFound = true, value = "assetspath.properties")
@Controller
public class DemoData {
    private static final Logger log = LoggerFactory.getLogger(DemoData.class);
    @Value("${pathToResources}")
    String path;

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private TerminTypRepository terminTypRepository;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private NotizTypRepository notizTypRepository;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        this.demoTerminTypen();
        this.demoEvents();
        this.demoNotizTypen();
        this.demoNotes();
    }

    private void demoEvents() {
        if (!eventRepository.findAll().iterator().hasNext()) {
            File file = new File(path + "events.json");
            try {
                BufferedReader br = new BufferedReader(new FileReader(file));
                StringBuilder sb = new StringBuilder();
                String st;
                while ((st = br.readLine()) != null)
                    sb.append(st);
                JSONArray dummyArray = new JSONArray(sb.toString());
                for (int i = 0; i < dummyArray.length(); i++) {
                    Event evt = new Event();
                    evt.setTitle(dummyArray.getJSONObject(i).getString("title"));
                    evt.setStart(dummyArray.getJSONObject(i).getString("start"));
                    evt.setEnd(dummyArray.getJSONObject(i).getString("end"));
                    evt.setFaelligkeit(dummyArray.getJSONObject(i).getString("faelligkeit"));
                    //TODO
                    evt.setFaelligkeitsHistorie(new ArrayList<FaelligkeitsEintrag>());
                    evt.setTerminArt(dummyArray.getJSONObject(i).getString("terminArt"));
                    evt.setAllDay(dummyArray.getJSONObject(i).getBoolean("allDay"));
                    evt.setBeschreibung(dummyArray.getJSONObject(i).getString("beschreibung"));
                    evt.setTerminStatus(dummyArray.getJSONObject(i).getString("terminStatus"));
                    ArrayList<TerminTyp> tts = new ArrayList<>();
                    for (int j = 0; j < dummyArray.getJSONObject(i).getJSONArray("terminTypen").length(); j++) {
                        TerminTyp tt = terminTypRepository.findOne(Long.parseLong(dummyArray.getJSONObject(i).getJSONArray("terminTypen").getJSONObject(j).getString("id")));
                        tts.add(tt);
                    }
                    evt.setTerminTypen(tts);
                    evt.setFachobjektKennzeichen(dummyArray.getJSONObject(i).getString("fachobjektKennzeichen"));
                    evt.setFachobjektTyp(dummyArray.getJSONObject(i).getString("fachobjektTyp"));
                    evt.setErsteller(dummyArray.getJSONObject(i).getString("ersteller"));
                    evt.setErstellDatum(dummyArray.getJSONObject(i).getString("erstellDatum"));
                    evt.setErinnerung(dummyArray.getJSONObject(i).getString("erinnerung"));
                    evt.setKontaktReferenz(dummyArray.getJSONObject(i).getString("kontaktReferenz"));
                    evt.setKalenderVon(dummyArray.getJSONObject(i).getString("kalenderVon"));
                    //TODO
                    evt.setBearbeiter(new ArrayList<String>());
                    eventRepository.save(evt);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void demoTerminTypen() {
        if (!terminTypRepository.findAll().iterator().hasNext()) {
            File file2 = new File(path + "terminTypen.json");
            try {
                BufferedReader br = new BufferedReader(new FileReader(file2));
                StringBuilder sb = new StringBuilder();
                String st;
                while ((st = br.readLine()) != null)
                    sb.append(st);
                JSONArray dummyArray = new JSONArray(sb.toString());
                for (int i = 0; i < dummyArray.length(); i++) {
                    TerminTyp terminTyp = new TerminTyp();
                    terminTyp.setLabel(dummyArray.getJSONObject(i).getString("label"));
                    terminTyp.setValue(dummyArray.getJSONObject(i).getString("value"));
                    terminTyp.setColor(dummyArray.getJSONObject(i).getString("color"));
                    terminTyp.setIsTypePersonal(dummyArray.getJSONObject(i).getBoolean("isTypePersonal"));
                    terminTyp.setIsTypeSubject(dummyArray.getJSONObject(i).getBoolean("isTypeSubject"));
                    terminTypRepository.save(terminTyp);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void demoNotes() {
        if (!noteRepository.findAll().iterator().hasNext()) {
            File file = new File(path + "notes.json");
            try {
                BufferedReader br = new BufferedReader(new FileReader(file));
                StringBuilder sb = new StringBuilder();
                String st;
                while ((st = br.readLine()) != null)
                    sb.append(st);
                JSONArray dummyArray = new JSONArray(sb.toString());
                for (int i = 0; i < dummyArray.length(); i++) {
                    Note note = new Note();
                    note.setTitle(dummyArray.getJSONObject(i).getString("title"));
                    note.setEnd(dummyArray.getJSONObject(i).getString("faelligkeit"));
                    note.setStart(dummyArray.getJSONObject(i).getString("erstellDatum"));
                    note.setFachobjektKennzeichen(dummyArray.getJSONObject(i).getString("fachobjektKennzeichen"));
                    note.setErsteller(dummyArray.getJSONObject(i).getString("ersteller"));
                    note.setStatus(dummyArray.getJSONObject(i).getString("notizStatus"));
                    note.setErinnerung(dummyArray.getJSONObject(i).getString("erinnerung"));
                    note.setBeschreibung(dummyArray.getJSONObject(i).getString("beschreibung"));
                    note.setFachobjektTyp(dummyArray.getJSONObject(i).getString("fachobjektTyp"));
                    note.setTerminArt(dummyArray.getJSONObject(i).getString("terminArt"));
                    note.setKontaktReferenz(dummyArray.getJSONObject(i).getString("kontaktReferenz"));
                    ArrayList<NotizTyp> ntt = new ArrayList<>();
                    for (int j = 0; j < dummyArray.getJSONObject(i).getJSONArray("notizTypen").length(); j++) {
                        NotizTyp nt = notizTypRepository.findOne(Long.parseLong(dummyArray.getJSONObject(i).getJSONArray("notizTypen").getJSONObject(j).getString("id")));
                        ntt.add(nt);
                    }
                    note.setNotizTypen(ntt);
                    noteRepository.save(note);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void demoNotizTypen() {
        if (!notizTypRepository.findAll().iterator().hasNext()) {
            File file2 = new File(path + "notizTypen.json");
            try {
                BufferedReader br = new BufferedReader(new FileReader(file2));
                StringBuilder sb = new StringBuilder();
                String st;
                while ((st = br.readLine()) != null)
                    sb.append(st);
                JSONArray dummyArray = new JSONArray(sb.toString());
                for (int i = 0; i < dummyArray.length(); i++) {
                    NotizTyp notizTyp = new NotizTyp();
                    notizTyp.setLabel(dummyArray.getJSONObject(i).getString("label"));
                    notizTyp.setValue(dummyArray.getJSONObject(i).getString("value"));
                    notizTyp.setColor(dummyArray.getJSONObject(i).getString("color"));
                    notizTypRepository.save(notizTyp);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
