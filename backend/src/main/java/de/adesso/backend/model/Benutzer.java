package de.adesso.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Id;
import javax.validation.Valid;
import javax.validation.constraints.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Benutzer
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")
@Entity
//@javax.persistence.Table(name = "benutzer")
//@Table(name = "benutzer")
public class Benutzer   {
  @JsonProperty("name")
  private String name = null;

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @JsonProperty("id")
  private long id;

  @JsonProperty("isAdmin")
  private Boolean isAdmin = null;

  @JsonProperty("vorname")
  private String vorname = null;

  public Benutzer name(String name) {
    this.name = name;
    return this;
  }

   /**
   * Get name
   * @return name
  **/
  @ApiModelProperty(example = "Nachname", value = "")


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Benutzer id(long id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(example = "346767", required = true, value = "")
  @NotNull


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Benutzer isAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
    return this;
  }

   /**
   * Get isAdmin
   * @return isAdmin
  **/
  @ApiModelProperty(example = "false", value = "")


  public Boolean isIsAdmin() {
    return isAdmin;
  }

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public Benutzer vorname(String vorname) {
    this.vorname = vorname;
    return this;
  }

   /**
   * Get vorname
   * @return vorname
  **/
  @ApiModelProperty(example = "Vorname", value = "")


  public String getVorname() {
    return vorname;
  }

  public void setVorname(String vorname) {
    this.vorname = vorname;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Benutzer benutzer = (Benutzer) o;
    return Objects.equals(this.name, benutzer.name) &&
        Objects.equals(this.id, benutzer.id) &&
        Objects.equals(this.isAdmin, benutzer.isAdmin) &&
        Objects.equals(this.vorname, benutzer.vorname);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, id, isAdmin, vorname);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Benutzer {\n");
    
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    isAdmin: ").append(toIndentedString(isAdmin)).append("\n");
    sb.append("    vorname: ").append(toIndentedString(vorname)).append("\n");
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

