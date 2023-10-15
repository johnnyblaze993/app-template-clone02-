package com.backend.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

import com.backend.entities.Digimon;
import com.backend.repositories.DigimonRepository;

import jakarta.inject.Inject;
import java.util.List;

@Controller("/digimon")
public class DigimonController {

    @Inject
    private DigimonRepository digimonRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<Digimon> getAllDigimon() {
        return (List<Digimon>) digimonRepository.findAll();
    }

    // More endpoints can be added as needed...

}