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
 * NotizTyp
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-02T11:27:47.656Z")

@Entity
public class NotizTyp   {
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

    public NotizTyp id(long id) {
        this.id = id;
        return this;
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

    public NotizTyp label(String label) {
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

    public NotizTyp color(String color) {
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
        NotizTyp notizTyp= (NotizTyp) o;
        return Objects.equals(this.id, notizTyp.id) &&
                Objects.equals(this.label, notizTyp.label) &&
                Objects.equals(this.color, notizTyp.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, label, color);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class NotizTyp {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    bezeichnung: ").append(toIndentedString(label)).append("\n");
        sb.append("    farbe: ").append(toIndentedString(color)).append("\n");
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

