package de.eventure.backend.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Email;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Test
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Test   {
  @JsonProperty("zeit")
  private Integer zeit = null;

  @JsonProperty("emails")
  @ManyToMany(cascade=CascadeType.DETACH)
  @JoinTable(name="email_test", joinColumns=@JoinColumn(name="test_id"), inverseJoinColumns=@JoinColumn(name="email_id"))
  private List<Email> emails = new ArrayList<Email>();

  @JsonProperty("titel")
  private String titel = null;

  @JsonProperty("durchfuehrungen")
  private int durchfuehrungen = 0;

  @JsonProperty("durchschnitt")
  private float[] durchschnitt;

  @JsonProperty("anrufe")
  private String[] anrufe;

  @JsonProperty("id")
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private Long id = null;



  @JsonProperty("kontext")
  @Lob
  private String kontext = null;

  @JsonProperty("beschreibung")
  @Lob
  private String beschreibung = null;

  @JsonProperty("position")
  private String position = null;

  @JsonProperty("aktiv")
  private Boolean aktiv = null;

  public Test zeit(Integer zeit) {
    this.zeit = zeit;
    return this;
  }

   /**
   * Get zeit
   * @return zeit
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public Integer getZeit() {
    return zeit;
  }

  public void setZeit(Integer zeit) {
    this.zeit = zeit;
  }

  public Test emails(List<Email> emails) {
    this.emails = emails;
    return this;
  }

  public Test addEmailsItem(Email emailsItem) {
    this.emails.add(emailsItem);
    return this;
  }

   /**
   * Get emails
   * @return emails
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull

  @Valid

  public List<Email> getEmails() {
    return emails;
  }

  public void setEmails(List<Email> emails) {
    this.emails = emails;
  }

  public Test titel(String titel) {
    this.titel = titel;
    return this;
  }

   /**
   * Get titel
   * @return titel
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public String getTitel() {
    return titel;
  }

  public void setTitel(String titel) {
    this.titel = titel;
  }

  public Test id(Long id) {
    this.id = id;
    return this;
  }

  public String getKontext() {
    return kontext;
  }

  public void setKontext(String kontext) {
    this.kontext = kontext;
  }

  public int getDurchfuehrungen() {
    return durchfuehrungen;
  }

  public void setDurchfuehrungen(int durchfuehrungen) {
    this.durchfuehrungen = durchfuehrungen;
  }

  public float[] getDurchschnitt() {
    return durchschnitt;
  }

  public void setDurchschnitt(float[] durchschnitt) {
    this.durchschnitt = durchschnitt;
  }

  public String[] getAnrufe() {
    return anrufe;
  }

  public void setAnrufe(String[] anrufe) {
    this.anrufe = anrufe;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getBeschreibung() {
    return beschreibung;
  }

  public void setBeschreibung(String beschreibung) {
    this.beschreibung = beschreibung;
  }

  public Boolean getAktiv() {
    return aktiv;
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

  public Test position(String position) {
    this.position = position;
    return this;
  }



   /**
   * Get position
   * @return position
  **/
  @ApiModelProperty(value = "")




  public Test aktiv(Boolean aktiv) {
    this.aktiv = aktiv;
    return this;
  }

   /**
   * Get aktiv
   * @return aktiv
  **/
  @ApiModelProperty(value = "")

  public Boolean isAktiv() {
    return aktiv;
  }

  public void setAktiv(Boolean aktiv) {
    this.aktiv = aktiv;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Test test = (Test) o;
    return Objects.equals(this.zeit, test.zeit) &&
        Objects.equals(this.emails, test.emails) &&
        Objects.equals(this.titel, test.titel) &&
        Objects.equals(this.id, test.id) &&
        Objects.equals(this.position, test.position) &&
        Objects.equals(this.aktiv, test.aktiv);
  }

  @Override
  public int hashCode() {
    return Objects.hash(zeit, emails, titel, id, position, aktiv);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Test {\n");
    
    sb.append("    zeit: ").append(toIndentedString(zeit)).append("\n");
    sb.append("    emails: ").append(toIndentedString(emails)).append("\n");
    sb.append("    titel: ").append(toIndentedString(titel)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    position: ").append(toIndentedString(position)).append("\n");
    sb.append("    aktiv: ").append(toIndentedString(aktiv)).append("\n");
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

