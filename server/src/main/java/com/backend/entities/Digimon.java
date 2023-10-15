package com.backend.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity
public class Digimon {

    @Id
    private Long id;
    private String name;
    private String type;
    private Integer digimonNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDigimonNumber() {
        return digimonNumber;
    }

    public void setDigimonNumber(Integer digimonNumber) {
        this.digimonNumber = digimonNumber;
    }

    public Digimon() {
    }

    public Digimon(Long id, String name, String type, Integer digimonNumber) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.digimonNumber = digimonNumber;
    }

    // Getters and setters omitted for brevity...

}