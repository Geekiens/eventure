package de.adesso.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.threeten.bp.LocalDate;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * FaelligkeitsEintrag
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Entity
public class FaelligkeitsEintrag   {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonProperty("id")
  private long id;

  @JsonProperty("faelligAm")
  private LocalDate faelligAm = null;

  @JsonProperty("gesetztVon")
  private String gesetztVon = null;

  public FaelligkeitsEintrag faelligAm(LocalDate faelligAm) {
    this.faelligAm = faelligAm;
    return this;
  }

  public FaelligkeitsEintrag id(long id) {
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



   /**
   * Get faelligAm
   * @return faelligAm
  **/
  @ApiModelProperty(example = "2018-02-01", value = "")

  @Valid

  public LocalDate getFaelligAm() {
    return faelligAm;
  }

  public void setFaelligAm(LocalDate faelligAm) {
    this.faelligAm = faelligAm;
  }

  public FaelligkeitsEintrag gesetztVon(String gesetztVon) {
    this.gesetztVon = gesetztVon;
    return this;
  }

   /**
   * Get gesetztVon
   * @return gesetztVon
  **/
  @ApiModelProperty(example = "57834UserID", required = true, value = "")
  @NotNull


  public String getGesetztVon() {
    return gesetztVon;
  }

  public void setGesetztVon(String gesetztVon) {
    this.gesetztVon = gesetztVon;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FaelligkeitsEintrag faelligkeitsEintrag = (FaelligkeitsEintrag) o;
    return  Objects.equals(this.id, faelligkeitsEintrag.id) &&
            Objects.equals(this.faelligAm, faelligkeitsEintrag.faelligAm) &&
            Objects.equals(this.gesetztVon, faelligkeitsEintrag.gesetztVon);
  }



  @Override
  public int hashCode() {
    return Objects.hash(id, faelligAm, gesetztVon);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FaelligkeitsEintrag {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    faelligAm: ").append(toIndentedString(faelligAm)).append("\n");
    sb.append("    gesetztVon: ").append(toIndentedString(gesetztVon)).append("\n");
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

