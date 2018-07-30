package de.eventure.backend.model;

import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import de.eventure.backend.model.BewerberReaktion;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Ergebnis
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2018-05-31T18:36:00.556Z")

@Entity
public class Kalendereintrag {
    @JsonProperty("tag")
    private String tag = null;

    @JsonProperty("titel")
    private String titel = null;

    @JsonProperty("start")
    private String start = null;

    @JsonProperty("ende")
    private String ende = null;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @JsonProperty("id")
    private Long id = null;


    public Kalendereintrag kalendereintrag(String tag) {
        this.tag = tag;
        return this;
    }


    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnde() {
        return ende;
    }

    public void setEnde(String ende) {
        this.ende = ende;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Kalendereintrag that = (Kalendereintrag) o;
        return Objects.equals(tag, that.tag) &&
                Objects.equals(titel, that.titel) &&
                Objects.equals(start, that.start) &&
                Objects.equals(ende, that.ende) &&
                Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(tag, titel, start, ende, id);
    }

    @Override
    public String toString() {
        return "Kalendereintrag{" +
                "tag='" + tag + '\'' +
                ", titel='" + titel + '\'' +
                ", start='" + start + '\'' +
                ", ende='" + ende + '\'' +
                ", id=" + id +
                '}';
    }
}

