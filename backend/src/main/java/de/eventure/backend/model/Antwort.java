package de.eventure.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Email;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Antwort
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
public class Antwort   {
  @JsonProperty("titel")
  private String titel = null;

  @JsonProperty("text")
  private String text = null;

  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonProperty("id")
  private Long id = null;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "folgeMail", joinColumns = @JoinColumn(referencedColumnName = "id", name = "antwort_id"), inverseJoinColumns = @JoinColumn(name = "email_id"))
    @JsonProperty("folgeMail")
  private Email folgeMail = null;

  public Antwort titel(String titel) {
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

  public Antwort text(String text) {
    this.text = text;
    return this;
  }

   /**
   * Get text
   * @return text
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Antwort id(Long id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
   @ApiModelProperty(example = "23L", required = true, value = "")
   @NotNull

  @Valid

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Antwort folgeMail(Email folgeMail) {
    this.folgeMail = folgeMail;
    return this;
  }

   /**
   * Get folgeMail
   * @return folgeMail
  **/
  @ApiModelProperty(value = "")

  @Valid

  public Email getFolgeMail() {
    return folgeMail;
  }

  public void setFolgeMail(Email folgeMail) {
    this.folgeMail = folgeMail;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Antwort antwort = (Antwort) o;
    return Objects.equals(this.titel, antwort.titel) &&
        Objects.equals(this.text, antwort.text) &&
        Objects.equals(this.id, antwort.id) &&
        Objects.equals(this.folgeMail, antwort.folgeMail);
  }

  @Override
  public int hashCode() {
    return Objects.hash(titel, text, id, folgeMail);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Antwort {\n");
    
    sb.append("    titel: ").append(toIndentedString(titel)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    folgeMail: ").append(toIndentedString(folgeMail)).append("\n");
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

