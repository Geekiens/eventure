package de.eventure.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.BewerberReaktionen;
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
  private String videoPfad = null;


  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonProperty("id")
  private Long id = null;


  @JsonProperty("verbleibendeZeit")
  private Integer verbleibendeZeit = null;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "bewerberReaktion", joinColumns = @JoinColumn(referencedColumnName = "id", name = "pruefung_id"), inverseJoinColumns = @JoinColumn(name = "ergebnis_id"))
  @JsonProperty("bewerberReaktionen")
  private BewerberReaktionen bewerberReaktionen = null;

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

  public Ergebnis bewerberReaktionen(BewerberReaktionen bewerberReaktionen) {
    this.bewerberReaktionen = bewerberReaktionen;
    return this;
  }

   /**
   * Get bewerberReaktionen
   * @return bewerberReaktionen
  **/
  @ApiModelProperty(value = "")

  @Valid

  public BewerberReaktionen getBewerberReaktionen() {
    return bewerberReaktionen;
  }

  public void setBewerberReaktionen(BewerberReaktionen bewerberReaktionen) {
    this.bewerberReaktionen = bewerberReaktionen;
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
    return Objects.equals(this.videoPfad, ergebnis.videoPfad) &&
        Objects.equals(this.verbleibendeZeit, ergebnis.verbleibendeZeit) &&
            Objects.equals(this.id, ergebnis.id) &&
        Objects.equals(this.bewerberReaktionen, ergebnis.bewerberReaktionen);
  }

  @Override
  public int hashCode() {
    return Objects.hash(videoPfad, verbleibendeZeit, bewerberReaktionen);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Ergebnis {\n");
    
    sb.append("    videoPfad: ").append(toIndentedString(videoPfad)).append("\n");
    sb.append("    verbleibendeZeit: ").append(toIndentedString(verbleibendeZeit)).append("\n");
    sb.append("    bewerberReaktionen: ").append(toIndentedString(bewerberReaktionen)).append("\n");
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

