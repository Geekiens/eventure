package de.eventure.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Antwort;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Email
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

public class Email   {
  @JsonProperty("titel")
  private String titel = null;

  @JsonProperty("text")
  private String text = null;

  @JsonProperty("absender")
  private String absender = null;

  @JsonProperty("absendeDatum")
  private String absendeDatum = null;

  @JsonProperty("prioritaet")
  private String prioritaet = null;

  @JsonProperty("erscheintDirekt")
  private Boolean erscheintDirekt = null;

  @JsonProperty("erscheintNachMS")
  private Integer erscheintNachMS = null;

  @JsonProperty("antworten")
  @Valid
  private List<Antwort> antworten = null;

  @JsonProperty("id")
  private BigDecimal id = null;

  @JsonProperty("aktiv")
  private Boolean aktiv = null;

  public Email titel(String titel) {
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

  public Email text(String text) {
    this.text = text;
    return this;
  }

   /**
   * Get text
   * @return text
  **/
  @ApiModelProperty(value = "")


  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Email absender(String absender) {
    this.absender = absender;
    return this;
  }

   /**
   * Get absender
   * @return absender
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public String getAbsender() {
    return absender;
  }

  public void setAbsender(String absender) {
    this.absender = absender;
  }

  public Email absendeDatum(String absendeDatum) {
    this.absendeDatum = absendeDatum;
    return this;
  }

   /**
   * Get absendeDatum
   * @return absendeDatum
  **/
  @ApiModelProperty(value = "")


  public String getAbsendeDatum() {
    return absendeDatum;
  }

  public void setAbsendeDatum(String absendeDatum) {
    this.absendeDatum = absendeDatum;
  }

  public Email prioritaet(String prioritaet) {
    this.prioritaet = prioritaet;
    return this;
  }

   /**
   * Get prioritaet
   * @return prioritaet
  **/
  @ApiModelProperty(value = "")


  public String getPrioritaet() {
    return prioritaet;
  }

  public void setPrioritaet(String prioritaet) {
    this.prioritaet = prioritaet;
  }

  public Email erscheintDirekt(Boolean erscheintDirekt) {
    this.erscheintDirekt = erscheintDirekt;
    return this;
  }

   /**
   * Get erscheintDirekt
   * @return erscheintDirekt
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public Boolean isErscheintDirekt() {
    return erscheintDirekt;
  }

  public void setErscheintDirekt(Boolean erscheintDirekt) {
    this.erscheintDirekt = erscheintDirekt;
  }

  public Email erscheintNachMS(Integer erscheintNachMS) {
    this.erscheintNachMS = erscheintNachMS;
    return this;
  }

   /**
   * Get erscheintNachMS
   * @return erscheintNachMS
  **/
  @ApiModelProperty(value = "")


  public Integer getErscheintNachMS() {
    return erscheintNachMS;
  }

  public void setErscheintNachMS(Integer erscheintNachMS) {
    this.erscheintNachMS = erscheintNachMS;
  }

  public Email antworten(List<Antwort> antworten) {
    this.antworten = antworten;
    return this;
  }

  public Email addAntwortenItem(Antwort antwortenItem) {
    if (this.antworten == null) {
      this.antworten = new ArrayList<Antwort>();
    }
    this.antworten.add(antwortenItem);
    return this;
  }

   /**
   * Get antworten
   * @return antworten
  **/
  @ApiModelProperty(value = "")

  @Valid

  public List<Antwort> getAntworten() {
    return antworten;
  }

  public void setAntworten(List<Antwort> antworten) {
    this.antworten = antworten;
  }

  public Email id(BigDecimal id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(value = "")

  @Valid

  public BigDecimal getId() {
    return id;
  }

  public void setId(BigDecimal id) {
    this.id = id;
  }

  public Email aktiv(Boolean aktiv) {
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
    Email email = (Email) o;
    return Objects.equals(this.titel, email.titel) &&
        Objects.equals(this.text, email.text) &&
        Objects.equals(this.absender, email.absender) &&
        Objects.equals(this.absendeDatum, email.absendeDatum) &&
        Objects.equals(this.prioritaet, email.prioritaet) &&
        Objects.equals(this.erscheintDirekt, email.erscheintDirekt) &&
        Objects.equals(this.erscheintNachMS, email.erscheintNachMS) &&
        Objects.equals(this.antworten, email.antworten) &&
        Objects.equals(this.id, email.id) &&
        Objects.equals(this.aktiv, email.aktiv);
  }

  @Override
  public int hashCode() {
    return Objects.hash(titel, text, absender, absendeDatum, prioritaet, erscheintDirekt, erscheintNachMS, antworten, id, aktiv);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Email {\n");
    
    sb.append("    titel: ").append(toIndentedString(titel)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
    sb.append("    absender: ").append(toIndentedString(absender)).append("\n");
    sb.append("    absendeDatum: ").append(toIndentedString(absendeDatum)).append("\n");
    sb.append("    prioritaet: ").append(toIndentedString(prioritaet)).append("\n");
    sb.append("    erscheintDirekt: ").append(toIndentedString(erscheintDirekt)).append("\n");
    sb.append("    erscheintNachMS: ").append(toIndentedString(erscheintNachMS)).append("\n");
    sb.append("    antworten: ").append(toIndentedString(antworten)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
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
