package de.eventure.backend.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Pruefung;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Bewerber
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
public class Bewerber   {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @JsonProperty("id")
    private Long id = null;

  @JsonProperty("benutzername")
  private String benutzername = null;

  @JsonProperty("passwort")
  private String passwort = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("status")
  private String status = null;

  @JsonProperty("mailAdresse")
  private String mailAdresse = null;

  @JsonProperty("beworbenFuer")
  private String beworbenFuer = null;

  @OneToMany(cascade = CascadeType.ALL)
  @JsonProperty("pruefungen")
  //@JsonIgnoreProperties("bewerber")
  @JoinTable(
          name="pruefungen_bewerber",
          joinColumns = @JoinColumn( name="bewerber_id"),
          inverseJoinColumns = @JoinColumn( name="pruefung_id"))
  private List<Pruefung> pruefungen = new ArrayList<Pruefung>();


  public Bewerber benutzername(String benutzername) {
    this.benutzername = benutzername;
    return this;
  }

   /**
   * Get benutzername
   * @return benutzername
  **/
  @ApiModelProperty(example = "", required = true, value = "")
  @NotNull


  public String getBenutzername() {
    return benutzername;
  }

  public void setBenutzername(String benutzername) {
    this.benutzername = benutzername;
  }

  public Bewerber passwort (String passwort) {
    this.passwort = passwort;
    return this;
  }

   /**
   * Get passwort
   * @return passwort
  **/
  @ApiModelProperty(example = "", value = "")


  public String getpasswort() {
    return passwort;
  }

  public void setpasswort(String passwort) {
    this.passwort = passwort;
  }

  public Bewerber name(String name) {
    this.name = name;
    return this;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  /**
   * Get name
   * @return name
  **/
  @ApiModelProperty(example = "", value = "")


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Bewerber mailAdresse(String mailAdresse) {
    this.mailAdresse = mailAdresse;
    return this;
  }



  public List<Pruefung> getPruefungen() {
    return pruefungen;
  }

  public void setPruefungen(List<Pruefung> pruefungen) {
    this.pruefungen = pruefungen;
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
   * Get mailAdresse
   * @return mailAdresse
  **/
  @ApiModelProperty(example = "", value = "")


  public String getMailAdresse() {
    return mailAdresse;
  }

  public void setMailAdresse(String mailAdresse) {
    this.mailAdresse = mailAdresse;
  }

  public Bewerber beworbenFuer(String beworbenFuer) {
    this.beworbenFuer = beworbenFuer;
    return this;
  }

   /**
   * Get beworbenFuer
   * @return beworbenFuer
  **/
  @ApiModelProperty(example = "", value = "")


  public String getBeworbenFuer() {
    return beworbenFuer;
  }

  public void setBeworbenFuer(String beworbenFuer) {
    this.beworbenFuer = beworbenFuer;
  }

  /*
  public Bewerber pruefungen(List<Pruefung> pruefungen) {
    this.pruefungen = pruefungen;
    return this;
  }

  public Bewerber addPruefungenItem(Pruefung pruefungenItem) {
    if (this.pruefungen == null) {
      this.pruefungen = new ArrayList<Pruefung>();
    }
    this.pruefungen.add(pruefungenItem);
    return this;
  }
*/
   /**
   * Get pruefungen
   * @return pruefungen
  **/
  /*
  @ApiModelProperty(value = "")

  @Valid

  public List<Pruefung> getPruefungen() {
    return pruefungen;
  }

  public void setPruefungen(List<Pruefung> pruefungen) {
    this.pruefungen = pruefungen;
  }
*/

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Bewerber bewerber = (Bewerber) o;
    return Objects.equals(this.benutzername, bewerber.benutzername) &&
        Objects.equals(this.passwort, bewerber.passwort) &&
        Objects.equals(this.name, bewerber.name) &&
            Objects.equals(this.id, bewerber.id) &&
            Objects.equals(this.mailAdresse, bewerber.mailAdresse) &&
        Objects.equals(this.beworbenFuer, bewerber.beworbenFuer);
       // Objects.equals(this.pruefungen, bewerber.pruefungen);
  }

  @Override
  public int hashCode() {
    return Objects.hash(benutzername, passwort, name, mailAdresse, beworbenFuer);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Bewerber {\n");
    
    sb.append("    benutzername: ").append(toIndentedString(benutzername)).append("\n");
    sb.append("    passwort: ").append(toIndentedString(passwort)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    mailAdresse: ").append(toIndentedString(mailAdresse)).append("\n");
    sb.append("    beworbenFuer: ").append(toIndentedString(beworbenFuer)).append("\n");
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

