package com.uadb.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.uadb.springboot.model.Meteo;
import java.util.Date;
import java.util.List;

public interface MeteoRepository extends JpaRepository<Meteo, String> {
    List<Meteo> findByDate(Date date);
    List<Meteo> findByRegion(String region);

}
