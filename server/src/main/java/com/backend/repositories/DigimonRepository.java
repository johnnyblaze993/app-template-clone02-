package com.backend.repositories;

import com.backend.entities.Digimon;

// import io.micronaut.data.annotation.Id;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES) // Note: Specify your dialect here
public interface DigimonRepository extends CrudRepository<Digimon, Long> {

    // Additional custom queries can be added here if needed...

}