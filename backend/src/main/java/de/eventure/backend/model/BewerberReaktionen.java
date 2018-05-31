package de.eventure.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Email;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * BewerberReaktionen
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

public class BewerberReaktionen   {
  @JsonProperty("email")
  private Email email = null;

  @JsonProperty("reaktionsArt")
  private String reaktionsArt = null;

  @JsonProperty("text")
  private String text = null;

  public BewerberReaktionen email(Email email) {
    this.email = email;
    return this;
  }

   /**
   * Get email
   * @return email
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull

  @Valid

  public Email getEmail() {
    return email;
  }

  public void setEmail(Email email) {
    this.email = email;
  }

  public BewerberReaktionen reaktionsArt(String reaktionsArt) {
    this.reaktionsArt = reaktionsArt;
    return this;
  }

   /**
   * Get reaktionsArt
   * @return reaktionsArt
  **/
  @ApiModelProperty(value = "")


  public String getReaktionsArt() {
    return reaktionsArt;
  }

  public void setReaktionsArt(String reaktionsArt) {
    this.reaktionsArt = reaktionsArt;
  }

  public BewerberReaktionen text(String text) {
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


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BewerberReaktionen bewerberReaktionen = (BewerberReaktionen) o;
    return Objects.equals(this.email, bewerberReaktionen.email) &&
        Objects.equals(this.reaktionsArt, bewerberReaktionen.reaktionsArt) &&
        Objects.equals(this.text, bewerberReaktionen.text);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, reaktionsArt, text);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BewerberReaktionen {\n");
    
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    reaktionsArt: ").append(toIndentedString(reaktionsArt)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
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

