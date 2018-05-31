package de.adesso.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * TerminTyp
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Entity
public class TerminTyp   {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @JsonProperty("id")
  private long id;

  @JsonProperty("value")
  private String value;

  @JsonProperty("label")
  private String label = null;

  @JsonProperty("color")
  private String color = null;

  @JsonProperty("isTypePersonal")
  private Boolean isTypePersonal;

  @JsonProperty("isTypeSubject")
  private Boolean isTypeSubject;

  @JsonProperty("aktivVon")
  private String aktivVon = null;

  @JsonProperty("aktivBis")
  private String aktivBis = null;

  @JsonProperty("position")
  private int position = 0;



  public TerminTyp id(long id) {
    this.id = id;
    return this;
  }
  public String getAktivVon() {
    return aktivVon;
  }

  public void setAktivVon(String aktivVon) {
    this.aktivVon = aktivVon;
  }

  public String getAktivBis() {
    return aktivBis;
  }

  public void setAktivBis(String aktivBis) {
    this.aktivBis = aktivBis;
  }



  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }



  public Boolean getIsTypePersonal() {
    return this.isTypePersonal;
  }

  public void setIsTypePersonal(Boolean isTypePersonal) {
    this.isTypePersonal = isTypePersonal;
  }

  public Boolean getIsTypeSubject() {
    return this.isTypeSubject;
  }

  public void setIsTypeSubject(Boolean isTypeSubject) {
    this.isTypeSubject = isTypeSubject;
  }

  /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(example = "343578", required = true, value = "")
  @NotNull


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public TerminTyp label(String label) {
    this.label = label;
    return this;
  }

   /**
   * Get bezeichnung
   * @return bezeichnung
  **/
  @ApiModelProperty(example = "Wichtig", required = true, value = "")
  @NotNull


  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public TerminTyp color(String color) {
    this.color = color;
    return this;
  }

   /**
   * Get farbe
   * @return farbe
  **/
  @ApiModelProperty(example = "#454345", required = true, value = "")
  @NotNull


  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TerminTyp terminTyp = (TerminTyp) o;
    return Objects.equals(this.id, terminTyp.id) &&
        Objects.equals(this.label, terminTyp.label) &&
        Objects.equals(this.aktivVon, terminTyp.isTypePersonal) &&
        Objects.equals(this.aktivVon, terminTyp.isTypeSubject) &&
        Objects.equals(this.aktivVon, terminTyp.aktivVon) &&
        Objects.equals(this.aktivBis, terminTyp.aktivBis) &&
        Objects.equals(this.position, terminTyp.position) &&
        Objects.equals(this.color, terminTyp.color);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, label, color, isTypePersonal, isTypeSubject, aktivVon, aktivBis, position);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TerminTyp {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    bezeichnung: ").append(toIndentedString(label)).append("\n");
    sb.append("    farbe: ").append(toIndentedString(color)).append("\n");
    sb.append("    aktivVon: ").append(toIndentedString(aktivVon)).append("\n");
    sb.append("    aktivBis: ").append(toIndentedString(aktivBis)).append("\n");
    sb.append("    position: ").append(toIndentedString(position)).append("\n");
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
