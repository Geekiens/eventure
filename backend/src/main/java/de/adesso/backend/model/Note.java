package de.adesso.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.threeten.bp.LocalDate;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Note
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Entity
public class Note   {
  @JsonProperty("title")
  private String title = null;

  @JsonProperty("start")
  private String start = null;

  @JsonProperty("end")
  private String end = null;

  @JsonProperty("terminArt")
  private String terminArt = null;

  @JsonProperty("allDay")
  private Boolean allDay = null;

  @JsonProperty("beschreibung")
  private String beschreibung = null;


  @JsonProperty("notizTypen")
  @Valid
  @ManyToMany(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
  @JoinTable(name = "note_typ", joinColumns = @JoinColumn(referencedColumnName = "id", name = "note_id"), inverseJoinColumns = @JoinColumn(name = "typ_id"))
  private List<NotizTyp> notizTypen = new ArrayList<NotizTyp>();

  @JsonProperty("fachobjektTyp")
  private String fachobjektTyp = null;

  @JsonProperty("fachobjektKennzeichen")
  private String fachobjektKennzeichen = null;

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @JsonProperty("id")
  private long id;

  @JsonProperty("ersteller")
  private String ersteller = null;

  @JsonProperty("erinnerung")
  private String erinnerung = null;

  @JsonProperty("kontaktReferenz")
  private String kontaktReferenz = null;

  @JsonProperty("bearbeiter")
  @Valid
  @ElementCollection
  @CollectionTable(name ="bearbeiter")
  private List<String> bearbeiter = new ArrayList<String>();

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @JsonProperty("status")
  private String status;

  public Note title(String title) {
    this.title = title;
    return this;
  }

   /**
   * Get title
   * @return title
  **/
  @ApiModelProperty(example = "Dr. Hans Meier anrufen", required = true, value = "")
  @NotNull


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Note start(String start) {
    this.start = start;
    return this;
  }

   /**
   * Get start
   * @return start
  **/
  @ApiModelProperty(example = "2018-02-03", required = true, value = "")
  @NotNull

  @Valid

  public String getStart() {
    return start;
  }

  public void setStart(String start) {
    this.start = start;
  }

  public Note end(String end) {
    this.end = end;
    return this;
  }

   /**
   * Get end
   * @return end
  **/
  @ApiModelProperty(example = "2018-02-04", required = true, value = "")
  @NotNull

  @Valid

  public String getEnd() {
    return end;
  }

  public void setEnd(String end) {
    this.end = end;
  }

  public Note terminArt(String terminArt) {
    this.terminArt = terminArt;
    return this;
  }

   /**
   * Get terminArt
   * @return terminArt
  **/
  @ApiModelProperty(example = "Fachobjekt", required = true, value = "")
  @NotNull


  public String getTerminArt() {
    return terminArt;
  }

  public void setTerminArt(String terminArt) {
    this.terminArt = terminArt;
  }

  public Note allDay(Boolean allDay) {
    this.allDay = allDay;
    return this;
  }

   /**
   * Get allDay
   * @return allDay
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public Boolean isAllDay() {
    return allDay;
  }

  public void setAllDay(Boolean allDay) {
    this.allDay = allDay;
  }

  public Note beschreibung(String beschreibung) {
    this.beschreibung = beschreibung;
    return this;
  }

   /**
   * Get beschreibung
   * @return beschreibung
  **/
  @ApiModelProperty(example = "Erinnern, dass das Formular xy ausgefüllt werden muss.", required = true, value = "")
  @NotNull


  public String getBeschreibung() {
    return beschreibung;
  }

  public void setBeschreibung(String beschreibung) {
    this.beschreibung = beschreibung;
  }


  public Note fachobjektTyp(String fachobjektTyp) {
    this.fachobjektTyp = fachobjektTyp;
    return this;
  }

   /**
   * Get fachobjektTyp
   * @return fachobjektTyp
  **/
  @ApiModelProperty(example = "Versicherungsnummer", required = true, value = "")
  @NotNull


  public String getFachobjektTyp() {
    return fachobjektTyp;
  }

  public void setFachobjektTyp(String fachobjektTyp) {
    this.fachobjektTyp = fachobjektTyp;
  }

  public Note fachobjektKennzeichen(String fachobjektKennzeichen) {
    this.fachobjektKennzeichen = fachobjektKennzeichen;
    return this;
  }

   /**
   * Get fachobjektKennzeichen
   * @return fachobjektKennzeichen
  **/
  @ApiModelProperty(example = "1234-ABC", required = true, value = "")
  @NotNull


  public String getFachobjektKennzeichen() {
    return fachobjektKennzeichen;
  }

  public void setFachobjektKennzeichen(String fachobjektKennzeichen) {
    this.fachobjektKennzeichen = fachobjektKennzeichen;
  }

  public Note id(long id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(example = "23", required = true, value = "")
  @NotNull


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Note ersteller(String ersteller) {
    this.ersteller = ersteller;
    return this;
  }

   /**
   * Get ersteller
   * @return ersteller
  **/
  @ApiModelProperty(example = "3456BenutzerID", required = true, value = "")
  @NotNull


  public String getErsteller() {
    return ersteller;
  }

  public void setErsteller(String ersteller) {
    this.ersteller = ersteller;
  }

  public Note erinnerung(String erinnerung) {
    this.erinnerung = erinnerung;
    return this;
  }

   /**
   * Get erinnerung
   * @return erinnerung
  **/
  @ApiModelProperty(example = "keine", required = true, value = "")
  @NotNull


  public String getErinnerung() {
    return erinnerung;
  }

  public void setErinnerung(String erinnerung) {
    this.erinnerung = erinnerung;
  }

  public Note kontaktReferenz(String kontaktReferenz) {
    this.kontaktReferenz = kontaktReferenz;
    return this;
  }

   /**
   * Get kontaktReferenz
   * @return kontaktReferenz
  **/
  @ApiModelProperty(example = "Kontakt?", required = true, value = "")
  @NotNull


  public String getKontaktReferenz() {
    return kontaktReferenz;
  }

  public void setKontaktReferenz(String kontaktReferenz) {
    this.kontaktReferenz = kontaktReferenz;
  }


  public Note bearbeiter(List<String> bearbeiter) {
    this.bearbeiter = bearbeiter;
    return this;
  }

  public Note addBearbeiterItem(String bearbeiterItem) {
    this.bearbeiter.add(bearbeiterItem);
    return this;
  }

   /**
   * Get bearbeiter
   * @return bearbeiter
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public List<String> getBearbeiter() {
    return bearbeiter;
  }

  public void setBearbeiter(List<String> bearbeiter) {
    this.bearbeiter = bearbeiter;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Note note = (Note) o;
    return Objects.equals(this.title, note.title) &&
        Objects.equals(this.start, note.start) &&
        Objects.equals(this.end, note.end) &&
        Objects.equals(this.terminArt, note.terminArt) &&
        Objects.equals(this.allDay, note.allDay) &&
        Objects.equals(this.beschreibung, note.beschreibung) &&
        Objects.equals(this.notizTypen, note.notizTypen) &&
        Objects.equals(this.fachobjektTyp, note.fachobjektTyp) &&
        Objects.equals(this.fachobjektKennzeichen, note.fachobjektKennzeichen) &&
        Objects.equals(this.id, note.id) &&
        Objects.equals(this.ersteller, note.ersteller) &&
        Objects.equals(this.erinnerung, note.erinnerung) &&
        Objects.equals(this.kontaktReferenz, note.kontaktReferenz) &&
        Objects.equals(this.bearbeiter, note.bearbeiter);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, start, end, terminArt, allDay, beschreibung, notizTypen, fachobjektTyp, fachobjektKennzeichen, id, ersteller, erinnerung, kontaktReferenz, bearbeiter);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Note {\n");
    
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    start: ").append(toIndentedString(start)).append("\n");
    sb.append("    end: ").append(toIndentedString(end)).append("\n");
    sb.append("    terminArt: ").append(toIndentedString(terminArt)).append("\n");
    sb.append("    allDay: ").append(toIndentedString(allDay)).append("\n");
    sb.append("    beschreibung: ").append(toIndentedString(beschreibung)).append("\n");
    sb.append("    NotizTypen: ").append(toIndentedString(notizTypen)).append("\n");
    sb.append("    fachobjektTyp: ").append(toIndentedString(fachobjektTyp)).append("\n");
    sb.append("    fachobjektKennzeichen: ").append(toIndentedString(fachobjektKennzeichen)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    ersteller: ").append(toIndentedString(ersteller)).append("\n");
    sb.append("    erinnerung: ").append(toIndentedString(erinnerung)).append("\n");
    sb.append("    kontaktReferenz: ").append(toIndentedString(kontaktReferenz)).append("\n");
    sb.append("    bearbeiter: ").append(toIndentedString(bearbeiter)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }


  public List<NotizTyp> getNotizTypen() {
    return notizTypen;
  }

  public void setNotizTypen(List<NotizTyp> notizTypen) {
    this.notizTypen = notizTypen;
  }
}

