package de.eventure.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.Bewerber;
import de.eventure.backend.model.Ergebnis;
import de.eventure.backend.model.Test;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Pruefung
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
public class Pruefung   {
  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "test", joinColumns = @JoinColumn(referencedColumnName = "id", name = "pruefung_id"), inverseJoinColumns = @JoinColumn(name = "test_id"))
  @JsonProperty("test")
  private Test test = null;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "bewerber", joinColumns = @JoinColumn(referencedColumnName = "id", name = "pruefung_id"), inverseJoinColumns = @JoinColumn(name = "bewerber_id"))
  @JsonProperty("bewerber")
  private Bewerber bewerber = null;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "ergebnis", joinColumns = @JoinColumn(referencedColumnName = "id", name = "pruefung_id"), inverseJoinColumns = @JoinColumn(name = "ergebnis_id"))
  @JsonProperty("Ergebnis")
  private Ergebnis ergebnis = null;

  @JsonProperty("status")
  private String status = null;

  @JsonProperty("id")
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private Long id = null;

  public Pruefung test(Test test) {
    this.test = test;
    return this;
  }

   /**
   * Get test
   * @return test
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull

  @Valid

  public Test getTest() {
    return test;
  }

  public void setTest(Test test) {
    this.test = test;
  }

  public Pruefung bewerber(Bewerber bewerber) {
    this.bewerber = bewerber;
    return this;
  }

   /**
   * Get bewerber
   * @return bewerber
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull

  @Valid

  public Bewerber getBewerber() {
    return bewerber;
  }

  public void setBewerber(Bewerber bewerber) {
    this.bewerber = bewerber;
  }

  public Pruefung ergebnis(Ergebnis ergebnis) {
    this.ergebnis = ergebnis;
    return this;
  }

   /**
   * Get ergebnis
   * @return ergebnis
  **/
  @ApiModelProperty(value = "")

  @Valid

  public Ergebnis getErgebnis() {
    return ergebnis;
  }

  public void setErgebnis(Ergebnis ergebnis) {
    this.ergebnis = ergebnis;
  }

  public Pruefung status(String status) {
    this.status = status;
    return this;
  }

   /**
   * Get status
   * @return status
  **/
  @ApiModelProperty(required = true, value = "")
  @NotNull


  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Pruefung id(Long id) {
    this.id = id;
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


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Pruefung pruefung = (Pruefung) o;
    return Objects.equals(this.test, pruefung.test) &&
        Objects.equals(this.bewerber, pruefung.bewerber) &&
        Objects.equals(this.ergebnis, pruefung.ergebnis) &&
        Objects.equals(this.status, pruefung.status) &&
        Objects.equals(this.id, pruefung.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(test, bewerber, ergebnis, status, id);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Pruefung {\n");
    
    sb.append("    test: ").append(toIndentedString(test)).append("\n");
    sb.append("    bewerber: ").append(toIndentedString(bewerber)).append("\n");
    sb.append("    ergebnis: ").append(toIndentedString(ergebnis)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
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

