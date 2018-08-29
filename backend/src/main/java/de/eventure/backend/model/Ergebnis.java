package de.eventure.backend.model;

import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.BewerberReaktion;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Ergebnis
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
public class Ergebnis   {
  @JsonProperty("videoPfad")
  @Lob
  private String videoPfad;


  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonProperty("id")
  private Long id = null;

  @JsonProperty("punkteKalender")
  @Valid
  private int[] punkteKalender;

  @JsonProperty("punkteAnrufer")
  @Valid
  private int[] punkteAnrufer;

  @JsonProperty("punkteVideo")
  @Valid
  private int[] punkteVideo;

  @JsonProperty("punkteAntworten")
  @Valid
  private int[] punkteAntworten;

  @JsonProperty("punkteOptionen")
  @Valid
  private int[] punkteOptionen;

  @JsonProperty("punkteWeiterleiten")
  @Valid
  private int[] punkteWeiterleiten;

  @JsonProperty("punkteLoeschen")
  @Valid
  private int[] punkteLoeschen;

  @JsonProperty("punkteSumme")
  @Valid
  private int[] punkteSumme;

  @JsonProperty("verbleibendeZeit")
  private Integer verbleibendeZeit = null;

  @JsonProperty("angenommeneAnrufe")
  private boolean[] angenommeneAnrufe = {false, false, false, false, false, false};

  @JsonProperty("kalendereintraege")
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name="kalendereintrag_id")
  private List<Kalendereintrag> kalendereintraege = null;


  @JsonProperty("bewerberReaktionen")
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name="bewerberReaktion_id")
  private List<BewerberReaktion> bewerberReaktionen = null;

  public Ergebnis videoPfad(String videoPfad) {
    this.videoPfad = videoPfad;
    return this;
  }

   /**
   * Get videoPfad
   * @return videoPfad
  **/
  @ApiModelProperty(value = "")


  public String getVideoPfad() {
    return videoPfad;
  }

  public void setVideoPfad(String videoPfad) {
    this.videoPfad = videoPfad;
  }

  public Ergebnis verbleibendeZeit(Integer verbleibendeZeit) {
    this.verbleibendeZeit = verbleibendeZeit;
    return this;
  }

  /**
   * Get id
   * @return id
   **/
  @ApiModelProperty(value = "")

  @Valid

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }




  /**
   * Get verbleibendeZeit
   * @return verbleibendeZeit
  **/
  @ApiModelProperty(value = "")


  public Integer getVerbleibendeZeit() {
    return verbleibendeZeit;
  }

  public void setVerbleibendeZeit(Integer verbleibendeZeit) {
    this.verbleibendeZeit = verbleibendeZeit;
  }

  public Ergebnis bewerberReaktionen(List<BewerberReaktion> bewerberReaktionen) {
    this.bewerberReaktionen = bewerberReaktionen;
    return this;
  }

   /**
   * Get bewerberReaktion
   * @return bewerberReaktion
  **/
  @ApiModelProperty(value = "")

  @Valid

  public List<BewerberReaktion> getBewerberReaktionen() {
    return bewerberReaktionen;
  }

  public void setBewerberReaktion(List<BewerberReaktion> bewerberReaktionen) {
    this.bewerberReaktionen = bewerberReaktionen;
  }

  public List<Kalendereintrag> getKalendereintraege() {
    return kalendereintraege;
  }

  public void setKalendereintraege(List<Kalendereintrag> kalendereintraege) {
    this.kalendereintraege = kalendereintraege;
  }

  public void setBewerberReaktionen(List<BewerberReaktion> bewerberReaktionen) {
    this.bewerberReaktionen = bewerberReaktionen;
  }

  public int[] getPunkteAntworten() {
    return punkteAntworten;
  }

  public void setPunkteAntworten(int[] punkteAntworten) {
    this.punkteAntworten = punkteAntworten;
  }

  public int[] getPunkteAnrufer() {
    return punkteAnrufer;
  }

  public void setPunkteAnrufer(int[] punkteAnrufer) {
    this.punkteAnrufer = punkteAnrufer;
  }

  public boolean[] getAngenommeneAnrufe() {
    return angenommeneAnrufe;
  }

  public void setAngenommeneAnrufe(boolean[] angenommeneAnrufe) {
    this.angenommeneAnrufe = angenommeneAnrufe;
  }

  public int[] getPunkteVideo() {
    return punkteVideo;
  }

  public void setPunkteVideo(int[] punkteVideo) {
    this.punkteVideo = punkteVideo;
  }

  public int[] getPunkteKalender() {
    return punkteKalender;
  }

  public void setPunkteKalender(int[] punkteKalender) {
    this.punkteKalender = punkteKalender;
  }

  public int[] getPunkteOptionen() {
    return punkteOptionen;
  }

  public void setPunkteOptionen(int[] punkteOptionen) {
    this.punkteOptionen = punkteOptionen;
  }

  public int[] getPunkteWeiterleiten() {
    return punkteWeiterleiten;
  }

  public void setPunkteWeiterleiten(int[] punkteWeiterleiten) {
    this.punkteWeiterleiten = punkteWeiterleiten;
  }

  public int[] getPunkteLoeschen() {
    return punkteLoeschen;
  }

  public void setPunkteLoeschen(int[] punkteLoeschen) {
    this.punkteLoeschen = punkteLoeschen;
  }

  public int[] getPunkteSumme() {
    return punkteSumme;
  }

  public void setPunkteSumme(int[] punkteSumme) {
    this.punkteSumme = punkteSumme;
  }



  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Ergebnis ergebnis = (Ergebnis) o;
        return Objects.equals(this.verbleibendeZeit, ergebnis.verbleibendeZeit) &&
                Objects.equals(this.id, ergebnis.id) &&
        Objects.equals(this.bewerberReaktionen, ergebnis.bewerberReaktionen);
  }

  @Override
  public int hashCode() {
    return Objects.hash(verbleibendeZeit, bewerberReaktionen);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Ergebnis {\n");
    sb.append("    verbleibendeZeit: ").append(toIndentedString(verbleibendeZeit)).append("\n");
    sb.append("    bewerberReaktion: ").append(toIndentedString(bewerberReaktionen)).append("\n");
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
}

